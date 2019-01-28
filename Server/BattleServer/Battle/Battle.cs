#region imports
using BattleServer.Battle.Model;
using BattleServer.Battle.Snapshot;
using BattleServer.User;
using Core.FMath;
using Core.Misc;
using Shared.Battle;
using Shared.Net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
#endregion

namespace BattleServer.Battle
{
	public class Battle : IPoolObject
	{
		private static uint _gid;

		/// <summary>
		/// 战场ID
		/// </summary>
		public uint id { get; }
		/// <summary>
		/// 标记战场是否结束
		/// </summary>
		public bool finished { get; private set; }
		/// <summary>
		/// 标记战场主循环是否在运行
		/// </summary>
		public bool running { get; private set; }
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
		/// 禁区超时时间
		/// </summary>
		public int gladiatorTimeout { get; private set; }
		/// <summary>
		/// 禁区坐标
		/// </summary>
		public FVec2 gladiatorPos { get; private set; }
		/// <summary>
		/// 禁区半径
		/// </summary>
		public int gladiatorRadius { get; private set; }

		/// <summary>
		/// 玩家数量
		/// </summary>
		public int numChampions => this._champions.Count;

		/// <summary>
		/// 实体数量
		/// </summary>
		public int numEntities => this._champions.Count;

		public BattleEntry battleEntry { get; private set; }

		/// <summary>
		/// 所有实体列表
		/// </summary>
		private readonly List<Champion> _champions = new List<Champion>();

		/// <summary>
		/// 实体ID到实体的映射
		/// </summary>
		private readonly SortedDictionary<ulong, Champion> _idToChampion = new SortedDictionary<ulong, Champion>();

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
		/// 战场结束处理器
		/// </summary>
		private readonly BattleEndProcessor _battleEndProcessor = new BattleEndProcessor();

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
			int count = this._champions.Count;
			for ( int i = 0; i < count; i++ )
				this._champions[i].Dispose();
			this._champions.Clear();
			this._idToChampion.Clear();
			this._frameActionMgr.Clear();
			this._snapshotMgr.Clear();
			this._battleEndProcessor.Clear();
			this._tempSIDs.Clear();
		}

		/// <summary>
		/// 初始化
		/// </summary>
		internal void Init( BattleEntry battleEntry )
		{
			this.frame = 0;
			this._lastUpdateTime = 0;

			this.battleEntry = battleEntry;
			this.rndSeed = battleEntry.rndSeed;
			this.mapID = battleEntry.mapID;

			//加载战场配置
			this.LoadDefs();

			//create champions
			foreach ( var player in battleEntry.players )
			{
				Champion champion = new Champion( this );
				champion.rid = player.gcNID;
				champion.user = BS.instance.userMgr.GetUser( player.gcNID );
				this._champions.Add( champion );
				this._idToChampion[champion.rid] = champion;
			}

			this._snapshotMgr.Init( this );
			//初始化帧行为管理器
			this._frameActionMgr.Init( this );
			//初始化锁步器
			this._stepLocker.Init( this, this.frameRate, this.keyframeStep );
			//初始化战场结束处理器
			this._battleEndProcessor.Init( this );
		}

		/// <summary>
		/// 加载战场配置
		/// </summary>
		public void LoadDefs()
		{
			Hashtable mapDef = Defs.GetMap( this.mapID );
			this.frameRate = mapDef.GetInt( "frame_rate" );
			this.keyframeStep = mapDef.GetInt( "keyframe_step" );
			this.snapshotStep = mapDef.GetInt( "snapshot_step" );
			this.battleTime = mapDef.GetInt( "timeout" );
			this.gladiatorTimeout = mapDef.GetInt( "gladiator_timeout" );
			float[] arr = mapDef.GetFloatArray( "gladiator_pos" );
			this.gladiatorPos = new FVec2( Convert.ToSingle( arr[0] ), Convert.ToSingle( arr[1] ) );
			this.gladiatorRadius = mapDef.GetInt( "gladiator_radius" );
		}

		/// <summary>
		/// 战场开始
		/// </summary>
		internal void Start()
		{
			this.running = true;
			this.finished = false;
			this._task = Task.Factory.StartNew( this.AsyncLoop, TaskCreationOptions.LongRunning );
			this._sw.Start();
		}

		/// <summary>
		/// 中断战场
		/// </summary>
		internal void Stop()
		{
			if ( !this.running )
				return;
			this.running = false;
			this._task.Wait();
			this._task = null;
			this._sw.Stop();
			this._sw.Reset();
			this._stepLocker.Clear();
		}

		/// <summary>
		/// 战场主循环
		/// 此函数为异步调用函数
		/// </summary>
		private void AsyncLoop()
		{
			while ( this.running )
			{
				long elasped = this._sw.ElapsedMilliseconds;
				long dt = elasped - this._lastUpdateTime;
				this._stepLocker.Update( elasped );
				this._lastUpdateTime = elasped;
				Thread.Sleep( 1 );
			}
		}

		/// <summary>
		/// 关键帧调用
		/// </summary>
		/// <param name="frame">当前帧数</param>
		/// <param name="elasped">总流逝时间</param>
		/// <param name="dt">流逝时间</param>
		internal void OnKeyframe( int frame, long elasped, int dt )
		{
			//检查是否有玩家提交了结束请求
			if ( this._battleEndProcessor.hasRecord )
			{
				//检查并处理该请求
				//该方法会设置一个超时时间,时间内将等待所有玩家提交请求
				Google.Protobuf.ByteString data = this._battleEndProcessor.Process( frame, dt );
				if ( data != null )//有效的结束请求
				{
					//解码快照,把结束状态保存到内存
					this.DecodeSnapshot( data );
					//处理战场结果
					this.ProcessResult();
					//标记为结束
					this.finished = true;
				}
			}
			this._frameActionMgr.Save( frame );
			//把玩家的操作指令广播到所有玩家
			Protos.BS2GC_FrameAction action = ProtoCreator.Q_BS2GC_FrameAction();
			action.Frame = frame;
			action.Action = this._frameActionMgr.latestHistory;
			this.Broadcast( action );

			if ( elasped >= this.battleTime && !this.finished )
			{
				//标记为结束
				this.finished = true;
			}
		}

		/// <summary>
		/// 逻辑更新
		/// </summary>
		/// <param name="frame">当前帧数</param>
		/// <param name="elasped">总流逝时间</param>
		/// <param name="dt">流逝时间</param>
		internal void UpdateLogic( int frame, long elasped, int dt )
		{
			this.frame = frame;
		}

		/// <summary>
		/// 获取指定帧数下的战场快照
		/// </summary>
		/// <param name="frame">指定帧数下的快速,-1表示最近的快照</param>
		internal FrameSnapshot GetSnapshot( int frame ) => this._snapshotMgr.Get( frame );

		/// <summary>
		/// 数据不同步的回调函数
		/// </summary>
		/// <param name="gcNID">不同步的玩家ID</param>
		/// <param name="frame">不同步的帧</param>
		/// <param name="data1">正常数据</param>
		/// <param name="data2">异常数据</param>
		internal void OnOutOfSync( ulong gcNID, int frame, Google.Protobuf.ByteString data1, Google.Protobuf.ByteString data2 )
		{
			BSUser user = BS.instance.userMgr.GetUser( gcNID );

			//发送不同步的数据
			Protos.BS2GC_OutOfSync outOfSync = ProtoCreator.Q_BS2GC_OutOfSync();
			outOfSync.Frame = frame;
			outOfSync.Data1 = data1;
			outOfSync.Data2 = data2;
			BS.instance.netSessionMgr.Send( user.gcSID, outOfSync );

			//通知CS玩家离开战场
			Protos.BS2CS_KickUser kickUser = ProtoCreator.Q_BS2CS_KickUser();
			kickUser.GcNID = gcNID;
			kickUser.Reason = Protos.BS2CS_KickUser.Types.Reason.OutOfSync;
			BS.instance.netSessionMgr.Send( SessionType.ServerB2CS, kickUser );

			//断开玩家连接
			BS.instance.netSessionMgr.CloseSession( user.gcSID, "different snapshot crc32 value" );
		}

		/// <summary>
		/// 处理战场结果
		/// </summary>
		private void ProcessResult()
		{
			//胜利检查
			bool team0Win = false;
			bool team1Win = false;
			//检查禁区情况
			int count = this.numChampions;
			for ( int i = 0; i < count; i++ )
			{
				Champion champion = this.GetChampionAt( i );
				if ( champion.gladiatorTime >= this.gladiatorTimeout )
				{
					if ( champion.team == 0 )
						team0Win = true;
					else
						team1Win = true;
				}
			}
			//如果以上检测没有胜利队伍
			if ( !team0Win &&
				 !team1Win &&
				 this._champions.Count > 1 )
			{
				//检查全员死亡
				team0Win = true;
				team1Win = true;

				for ( int i = 0; i < count; i++ )
				{
					Champion champion = this.GetChampionAt( i );
					if ( champion.team == 0 &&
						 !champion.isDead )
						team1Win = false;
					if ( champion.team == 1 &&
						 !champion.isDead )
						team0Win = false;
				}
			}
			//标记胜利玩家
			for ( int i = 0; i < count; i++ )
			{
				Champion champion = this.GetChampionAt( i );
				if ( ( team0Win && champion.team == 0 ) ||
					 ( team1Win && champion.team == 1 ) )
				{
					champion.win = true;
					//todo 其他记录
				}
			}
		}

		/// <summary>
		/// 广播消息到所有玩家
		/// 该函数在战场线程调用,线程不安全,但由于没有写操作,暂时不加锁
		/// </summary>
		private void Broadcast( Google.Protobuf.IMessage message )
		{
			int count = this.numChampions;
			for ( int i = 0; i < count; i++ )
			{
				BSUser user = this.GetChampionAt( i ).user;
				//未连接的不广播
				if ( user == null || !user.isOnline )
					continue;
				this._tempSIDs.Add( user.gcSID );
			}
			BS.instance.netSessionMgr.Broadcast( this._tempSIDs, message );
			this._tempSIDs.Clear();
		}

		private void DecodeSnapshot( Google.Protobuf.ByteString data )
		{
			Google.Protobuf.CodedInputStream reader = new Google.Protobuf.CodedInputStream( data.ToByteArray() );
			reader.ReadInt32();//frame
			reader.ReadBool();//marktoend
			reader.ReadDouble();//seed

			int count = reader.ReadInt32();//champions
			for ( int i = 0; i < count; i++ )
			{
				ulong rid = reader.ReadUInt64();
				Champion champion = this.GetChampion( rid );
				champion.DecodeSnapshot( rid, false, reader );
			}
		}

		/// <summary>
		/// 获取指定id实体
		/// </summary>
		public Champion GetChampion( ulong id )
		{
			this._idToChampion.TryGetValue( id, out Champion champion );
			return champion;
		}

		/// <summary>
		/// 获取指定索引的玩家
		/// 该函数是线程安全的
		/// </summary>
		public Champion GetChampionAt( int index )
		{
			if ( index < 0 || index >= this._champions.Count )
				return null;
			return this._champions[index];
		}

		/// <summary>
		/// 以字符串形式列出所有实体信息
		/// </summary>
		public string ListChampions()
		{
			StringBuilder sb = new StringBuilder();
			foreach ( Champion champion in this._champions )
				sb.AppendLine( champion.ToString() );
			return sb.ToString();
		}

		public string Dump()
		{
			string str = string.Empty;
			str += $"frame:{this.frame}\n";
			foreach ( Champion champion in this._champions )
				str += champion.Dump();
			return str;
		}

		/// <summary>
		/// 处理玩家提交的帧行为
		/// </summary>
		internal void HandleFrameAction( ulong gcNID, Protos.GC2BS_FrameAction message ) => this._frameActionMgr.HandleFrameAction( gcNID, message );

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
		internal void HandleCommitSnapshot( ulong gcNID, int frame, Google.Protobuf.ByteString data )
		{
			if ( this._snapshotMgr.Commit( frame, gcNID, data ) )
				this.DecodeSnapshot( data );
		}

		/// <summary>
		/// 处理战场结束
		/// </summary>
		public void HandleBattleEnd( ulong gcNID, Protos.GC2BS_EndBattle endBattle ) => this._battleEndProcessor.Add( gcNID, endBattle );
	}
}