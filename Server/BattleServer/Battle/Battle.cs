#region imports
using BattleServer.Battle.Model;
using BattleServer.Battle.Snapshot;
using BattleServer.User;
using Core.FMath;
using Core.Misc;
using Shared.Battle;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
#endregion

namespace BattleServer.Battle
{
	public class Battle : IPoolObject, ISnapshotable
	{
		private static uint _gid;

		/// <summary>
		/// 战场ID
		/// </summary>
		public uint id { get; }
		/// <summary>
		/// 标志战场是否结束
		/// </summary>
		public bool finished { get; private set; }
		/// <summary>
		/// 帧率
		/// </summary>
		public int frameRate { get; private set; }
		/// <summary>
		/// 关键帧步长
		/// </summary>
		public int keyframeStep { get; private set; }
		/// <summary>
		/// 快照步长
		/// </summary>
		public int snapshotStep { get; private set; }
		/// <summary>
		/// 地图ID
		/// </summary>
		public int mapID { get; private set; }
		/// <summary>
		/// 随机种子
		/// </summary>
		public int rndSeed { get; private set; }
		/// <summary>
		/// 当前已运行帧数
		/// </summary>
		public int frame { get; private set; }
		/// <summary>
		/// 战场限时
		/// </summary>
		public int battleTime { get; private set; }
		/// <summary>
		/// 队伍的出生点
		/// </summary>
		public FVec2[] bornPoses { get; private set; }
		/// <summary>
		/// 队伍的出生朝向
		/// </summary>
		public FVec2[] bornDirs { get; private set; }

		/// <summary>
		/// 玩家数量
		/// </summary>
		public int numPlayers => this._players.Length;

		/// <summary>
		/// 实体数量
		/// </summary>
		public int numEntities => this._entities.Count;

		public BattleEntry battleEntry { get; private set; }

		public readonly BattleResult battleResult = new BattleResult();

		/// <summary>
		/// 所有玩家列表
		/// </summary>
		private Player[] _players;

		/// <summary>
		/// 所有实体列表
		/// </summary>
		private readonly List<Entity> _entities = new List<Entity>();

		/// <summary>
		/// 实体ID到实体的映射
		/// </summary>
		private readonly SortedDictionary<ulong, Entity> _idToEntity = new SortedDictionary<ulong, Entity>();

		/// <summary>
		/// 计时器
		/// </summary>
		private readonly Stopwatch _sw = new Stopwatch();

		/// <summary>
		/// 锁步器
		/// </summary>
		private readonly StepLocker _stepLocker = new StepLocker();

		/// <summary>
		/// 快照管理器
		/// </summary>
		private readonly SnapshotMgr _snapshotMgr = new SnapshotMgr();

		/// <summary>
		/// 帧行为管理器
		/// </summary>
		private readonly FrameActionMgr _frameActionMgr = new FrameActionMgr();

		/// <summary>
		/// 用于广播的临时SID表
		/// </summary>
		private readonly List<uint> _tempSIDs = new List<uint>();

		private long _lastUpdateTime;
		private Task _task;

		public Battle()
		{
			Debug.Assert( _gid < uint.MaxValue, "maximum id of waiting room!!" );
			this.id = ++_gid;
		}

		public void Clear()
		{
			//在End方法已经清理了
		}

		/// <summary>
		/// 初始化
		/// </summary>
		internal bool Init( BattleEntry battleEntry )
		{
			this.battleEntry = battleEntry;
			this.rndSeed = battleEntry.rndSeed;
			this.mapID = battleEntry.mapID;

			//加载战场配置
			if ( !this.LoadDefs() )
				return false;

			//创建玩家
			if ( !this.CreatePlayers( battleEntry.players ) )
				return false;

			this._snapshotMgr.Init( battleEntry.players.Length );
			//创建初始化快照
			//this.MakeInitSnapshot();
			//初始化帧行为管理器
			this._frameActionMgr.Init( this );
			//初始化锁步器
			this._stepLocker.Init( this, this.frameRate, this.keyframeStep );
			return true;
		}

		/// <summary>
		/// 战场开始
		/// </summary>
		internal void Start()
		{
			this._sw.Start();
			this._task = Task.Factory.StartNew( this.AsyncLoop, TaskCreationOptions.LongRunning );
		}

		/// <summary>
		/// 加载战场配置
		/// </summary>
		public bool LoadDefs()
		{
			Hashtable mapDef = Defs.GetMap( this.mapID );
			if ( mapDef == null )
			{
				Logger.Error( $"invalid mapID:{this.mapID}" );
				return false;
			}
			try
			{
				this.frameRate = mapDef.GetInt( "frame_rate" );
				this.keyframeStep = mapDef.GetInt( "keyframe_step" );
				this.snapshotStep = mapDef.GetInt( "snapshot_step" );
				this.battleTime = mapDef.GetInt( "timeout" );

				ArrayList arr = ( ArrayList )mapDef["born_pos"];
				int count = arr.Count;
				this.bornPoses = new FVec2[count];
				for ( int i = 0; i < count; i++ )
				{
					ArrayList pi = ( ArrayList )arr[i];
					this.bornPoses[i] = new FVec2( Convert.ToInt32( pi[0] ), Convert.ToInt32( pi[1] ) );
				}

				arr = ( ArrayList )mapDef["born_dir"];
				count = arr.Count;
				this.bornDirs = new FVec2[count];
				for ( int i = 0; i < count; i++ )
				{
					ArrayList pi = ( ArrayList )arr[i];
					this.bornDirs[i] = new FVec2( Convert.ToInt32( pi[0] ), Convert.ToInt32( pi[1] ) );
				}
			}
			catch ( Exception e )
			{
				Logger.Error( $"battle:{this.mapID} load def error:{e}" );
				return false;
			}
			return true;
		}

		/// <summary>
		/// 清理战场
		/// </summary>
		internal void End()
		{
			if ( this._task != null )
			{
				this._task.Wait();
				this._task = null;
			}
			this.finished = false;
			this.battleResult.Clear();
			this.frame = 0;
			int count = this._entities.Count;
			for ( int i = 0; i < count; i++ )
				this._entities[i].Dispose();
			this._players = null;
			this._entities.Clear();
			this._idToEntity.Clear();
			this._frameActionMgr.Clear();
			this._snapshotMgr.Clear();
			this._tempSIDs.Clear();
			this._lastUpdateTime = 0;
			this._stepLocker.Clear();
			this._sw.Stop();
			this._sw.Reset();
		}

		/// <summary>
		/// 中断战场
		/// </summary>
		internal void Interrupt()
		{
			if ( this.finished )
				return;
			this.finished = true;
			this.battleResult.finishState = BattleResult.FinishState.Interrupt;
		}

		/// <summary>
		/// 创建玩家
		/// </summary>
		private bool CreatePlayers( BattleEntry.Player[] battleEntryPlayers )
		{
			int count = battleEntryPlayers.Length;
			this._players = new Player[count];
			for ( int i = 0; i < count; i++ )
			{
				Player player = new Player();
				if ( !player.Init( battleEntryPlayers[i] ) )
					return false;

				if ( player.team >= this.bornPoses.Length ||
					 player.team >= this.bornDirs.Length )
				{
					Logger.Error( $"invalid team:{player.team}, player:{player.id}" );
					return false;
				}

				player.position = this.bornPoses[player.team];
				player.direction = this.bornDirs[player.team];

				this._players[i] = player;
				this._entities.Add( player );
				this._idToEntity[player.id] = player;
			}
			return true;
		}

		/// <summary>
		/// 获取指定id实体
		/// </summary>
		public Entity GetEntity( ulong id )
		{
			this._idToEntity.TryGetValue( id, out Entity entity );
			return entity;
		}

		/// <summary>
		/// 是否存在指定id实体
		/// </summary>
		public bool HasEntity( ulong id ) => this._idToEntity.ContainsKey( id );

		/// <summary>
		/// 获取指定索引的玩家
		/// 该函数是线程安全的
		/// </summary>
		public Player GetPlayerAt( int index )
		{
			if ( index < 0 || index >= this._players.Length )
				return null;
			return this._players[index];
		}

		/// <summary>
		/// 以字符串形式列出所有实体信息
		/// </summary>
		public string ListEntities()
		{
			StringBuilder sb = new StringBuilder();
			foreach ( Entity entity in this._entities )
				sb.AppendLine( entity.ToString() );
			return sb.ToString();
		}

		/// <summary>
		/// 战场主循环
		/// 此函数为异步调用函数
		/// </summary>
		private void AsyncLoop()
		{
			while ( !this.finished )
			{
				long now = this._sw.ElapsedMilliseconds;
				long dt = now - this._lastUpdateTime;
				this._stepLocker.Update( dt );
				this._lastUpdateTime = now;
				Thread.Sleep( 1 );
				if ( now >= this.battleTime )
				{
					this.finished = true;
					this.battleResult.finishState = BattleResult.FinishState.Normal;
					break;
				}
			}
		}

		/// <summary>
		/// 广播消息到所有玩家
		/// 该函数在战场线程调用,是线程不安全的,但由于几乎没有写操作,暂时不加锁
		/// </summary>
		internal void Broadcast( Google.Protobuf.IMessage message )
		{
			int count = this.numPlayers;
			for ( int i = 0; i < count; i++ )
			{
				BSUser user = this.GetPlayerAt( i ).user;
				//未连接的不广播
				if ( !user.isOnline )
					continue;
				this._tempSIDs.Add( user.gcSID );
			}
			BS.instance.netSessionMgr.Broadcast( this._tempSIDs, message );
			this._tempSIDs.Clear();
		}

		/// <summary>
		/// 关键帧调用
		/// </summary>
		/// <param name="frame">当前帧数</param>
		/// <param name="dt">流逝时间</param>
		internal void OnKeyframe( int frame, int dt )
		{
			this._frameActionMgr.Save( frame );
			//把玩家的操作指令广播到所有玩家
			Protos.BS2GC_FrameAction action = ProtoCreator.Q_BS2GC_FrameAction();
			action.Frame = frame;
			action.Action = this._frameActionMgr.latestHistory;
			this.Broadcast( action );
		}

		/// <summary>
		/// 逻辑更新
		/// </summary>
		/// <param name="frame">当前帧数</param>
		/// <param name="dt">流逝时间</param>
		internal void UpdateLogic( int frame, int dt )
		{
			this.frame = frame;
		}

		/// <summary>
		/// 获取指定帧数下的战场快照
		/// </summary>
		/// <param name="frame">指定帧数下的快速,-1表示最近的快照</param>
		internal FrameSnapshot GetSnapshot( int frame = -1 ) => this._snapshotMgr.Get( frame );

		/// <summary>
		/// 制作初始化快照
		/// </summary>
		private void MakeInitSnapshot()
		{
			using ( MemoryStream ms = new MemoryStream() )
			{
				Google.Protobuf.CodedOutputStream writer = new Google.Protobuf.CodedOutputStream( ms );
				this.EncodeSnapshot( writer );
				writer.Flush();
				Google.Protobuf.ByteString data = Google.Protobuf.ByteString.CopyFrom( ms.GetBuffer(), 0, ( int )ms.Length );
				FrameSnapshot snapshot = new FrameSnapshot
				{
					frame = this.frame,
					data = data
				};
				this._snapshotMgr.Set( snapshot );
			}
		}

		/// <summary>
		/// 制作快照
		/// </summary>
		public void EncodeSnapshot( Google.Protobuf.CodedOutputStream writer )
		{
			writer.WriteInt32( this.frame );
			int count = this._idToEntity.Count;
			writer.WriteInt32( count );
			foreach ( KeyValuePair<ulong, Entity> kv in this._idToEntity )
				kv.Value.EncodeSnapshot( writer );
		}

		/// <summary>
		/// 处理玩家提交的帧行为
		/// </summary>
		internal void HandleFrameAction( ulong gcNID, Protos.GC2BS_FrameAction message ) => this._frameActionMgr.MergeFromProto( gcNID, message );

		/// <summary>
		/// 处理玩家请求帧行为的历史数据
		/// </summary>
		/// <param name="from">起始帧</param>
		/// <param name="to">结束帧</param>
		/// <param name="ret">需要填充的消息</param>
		internal void HandleRequestFrameActions( int from, int to, Protos.BS2GC_RequestFrameActionsRet ret ) =>
			this._frameActionMgr.FillHistoryToMessage( from, to, ret );

		/// <summary>
		/// 处理玩家提交快照数据
		/// </summary>
		/// <param name="gcNID">玩家ID</param>
		/// <param name="frame">快照的所在的帧数</param>
		/// <param name="data">快照数据</param>
		internal void HandleCommitSnapshot( ulong gcNID, int frame, Google.Protobuf.ByteString data ) =>
			this._snapshotMgr.Commit( gcNID, frame, data );
	}
}