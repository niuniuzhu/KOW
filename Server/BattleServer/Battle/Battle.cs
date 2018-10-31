﻿using System;
using System.Collections;
using BattleServer.Battle.Model;
using BattleServer.Battle.Snapshot;
using BattleServer.User;
using Core.Misc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Core.FMath;
using Shared.Battle;

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
		public int frame => this._frame;
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

		private Player[] _players;
		private readonly List<Entity> _entities = new List<Entity>();
		private readonly Dictionary<ulong, Entity> _idToEntity = new Dictionary<ulong, Entity>();

		private readonly Stopwatch _sw = new Stopwatch();
		private readonly StepLocker _stepLocker = new StepLocker();
		private readonly SnapshotMgr _snapshotMgr = new SnapshotMgr();
		private readonly List<uint> _tempSIDs = new List<uint>();
		private int _frame;
		private long _lastUpdateTime;

		public Battle()
		{
			Debug.Assert( _gid < uint.MaxValue, "maximum id of waiting room!!" );
			this.id = _gid++;
		}

		public void Clear()
		{
			this.finished = false;
			this._stepLocker.Reset();
			this._sw.Stop();
			this._sw.Reset();
			this._lastUpdateTime = 0;
		}

		/// <summary>
		/// 初始化
		/// </summary>
		public bool Init( BattleEntry battleEntry )
		{
			this.rndSeed = battleEntry.rndSeed;
			this.mapID = battleEntry.mapID;

			if ( !this.LoadDefs() )
				return false;

			if ( !this.CreatePlayers( battleEntry.players ) )
				return false;

			this.MakeInitSnapshot();

			this._stepLocker.Init( this, this.frameRate, this.keyframeStep );
			this._sw.Start();
			Task.Factory.StartNew( this.AsyncLoop, TaskCreationOptions.LongRunning );
			return true;
		}

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
				this.battleTime = mapDef.GetInt( "timeout" );

				ArrayList arr = ( ArrayList ) mapDef["born_pos"];
				int count = arr.Count;
				this.bornPoses = new FVec2[count];
				for ( int i = 0; i < count; i++ )
				{
					ArrayList pi = ( ArrayList ) arr[i];
					this.bornPoses[i] = new FVec2( Convert.ToInt32( pi[0] ), Convert.ToInt32( pi[1] ) );
				}

				arr = ( ArrayList ) mapDef["born_dir"];
				count = arr.Count;
				this.bornDirs = new FVec2[count];
				for ( int i = 0; i < count; i++ )
				{
					ArrayList pi = ( ArrayList ) arr[i];
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
		/// </summary>
		public Player GetPlayerAt( int index ) => this._players[index];

		/// <summary>
		/// 战场主循环
		/// 此函数为异步调用函数
		/// </summary>
		private void AsyncLoop()
		{
			while ( true )
			{
				long elapsed = this._sw.ElapsedMilliseconds - this._lastUpdateTime;

				this._stepLocker.Update( elapsed );

				this._lastUpdateTime = this._sw.ElapsedMilliseconds;

				Thread.Sleep( 1 );

				if ( this._sw.ElapsedMilliseconds >= this.battleTime )
				{
					this.finished = true;
					break;
				}
			}
		}

		/// <summary>
		/// 广播消息
		/// </summary>
		/// <param name="message">消息</param>
		/// <param name="gcNIDExcept">剔除gcNID</param>
		public void Broadcast( Google.Protobuf.IMessage message, ulong gcNIDExcept = 0 )
		{
			int count = this._players.Length;
			for ( int i = 0; i < count; i++ )
			{
				BSUser user = this._players[i].user;
				//未连接的不广播
				if ( user == null || !user.isConnected || gcNIDExcept != 0 && gcNIDExcept == user.gcNID )
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
		public void OnKeyframe( int frame, int dt )
		{
		}

		/// <summary>
		/// 逻辑更新
		/// </summary>
		/// <param name="frame">当前帧数</param>
		/// <param name="dt">流逝时间</param>
		public void UpdateLogic( int frame, int dt )
		{
			Interlocked.Increment( ref this._frame );
		}

		/// <summary>
		/// 获取指定帧数下的战场快照
		/// </summary>
		/// <param name="frame">指定帧数下的快速,-1表示最近的快照</param>
		public FrameSnapshot GetSnapshot( int frame = -1 ) => this._snapshotMgr.GetSnapshot( frame );

		/// <summary>
		/// 制作一份初始化快照
		/// </summary>
		private void MakeInitSnapshot()
		{
			BattleSnapshot snapshot = BattleSnapshot.Create();
			snapshot.frame = 0;
			snapshot.time = 0;
		}

		/// <summary>
		/// 根据提供的数据制作一份快照
		/// </summary>
		public ISnapshotObject MakeSnapshot( object data )
		{
			BattleSnapshot snapshot = BattleSnapshot.Create();
			return snapshot;
		}
	}
}