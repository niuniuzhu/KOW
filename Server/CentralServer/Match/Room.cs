using Core.Misc;
using Shared;
using System.Collections.Generic;

namespace CentralServer.Match
{
	/// <summary>
	/// 房间类
	/// 该类未内部类,由Matcher类代理,大部分方法的参数不进行合法性检测
	/// </summary>
	public class Room : IPoolObject
	{
		private static uint _gid;

		public uint id { get; }

		public int mapID { get; }

		public int numPlayers => this._players.Count;

		public int maxPlayers => Consts.ROOM_MAX_PLAYERS;

		/// <summary>
		/// 获取房间是否满员
		/// </summary>
		public bool isFull => this._players.Count == Consts.ROOM_MAX_PLAYERS;

		/// <summary>
		/// 房间是否没有玩家
		/// </summary>
		public bool isEmpty => this._players.Count == 0;

		/// <summary>
		/// 房间是否超时
		/// 无论玩家在载入过程中是否丢失,只要超时就会进入战场,玩家以后可以断线重连的方式进入战场
		/// </summary>
		public bool timeout => this._time >= Consts.ROOM_TIME_OUT;

		/// <summary>
		/// 是否到达同步玩家信息的时间
		/// </summary>
		public long timeToNitifyPlayerInfos { private set; get; }

		/// <summary>
		/// 是否满员后开始等待玩家载入战场
		/// </summary>
		public bool started;

		private readonly List<RoomPlayer> _players = new List<RoomPlayer>();
		private long _time;

		public Room()
		{
			System.Diagnostics.Debug.Assert( _gid < uint.MaxValue, "maximum id of room!!" );
			this.id = ++_gid;
		}

		public void Clear()
		{
			System.Diagnostics.Debug.Assert( this._players.Count == 0, "remove all players before destroy room." );
			this._time = 0;
			this.timeToNitifyPlayerInfos = 0;
			this.started = false;
		}

		public bool CanAddPlayer( RoomPlayer player ) => this._players.Count < this.maxPlayers && !this.HasPlayer( player.gcNID );

		/// <summary>
		/// 加入新玩家
		/// 该方法不检查参数合法性
		/// </summary>
		public void AddPlayer( RoomPlayer player ) => this._players.Add( player );

		/// <summary>
		/// 移除玩家
		/// 该方法不检查参数合法性
		/// </summary>
		public bool RemovePlayer( RoomPlayer player ) => this._players.Remove( player );

		/// <summary>
		/// 移除指定索引玩家
		/// </summary>
		public void RemovePlayerAt( int index ) => this._players.RemoveAt( index );

		/// <summary>
		/// 获取指定索引值的玩家
		/// </summary>
		public RoomPlayer GetPlayerAt( int index ) => this._players[index];

		/// <summary>
		/// 获取指定id的玩家
		/// </summary>
		public RoomPlayer GetPlayer( ulong gcNID )
		{
			int count = this._players.Count;
			for ( int i = 0; i < count; i++ )
			{
				if ( this._players[i].gcNID == gcNID )
					return this._players[i];
			}
			return null;
		}

		/// <summary>
		/// 检查是否存在指定id的玩家
		/// </summary>
		public bool HasPlayer( ulong gcNID )
		{
			int count = this._players.Count;
			for ( int i = 0; i < count; i++ )
			{
				if ( this._players[i].gcNID == gcNID )
					return true;
			}
			return false;
		}

		/// <summary>
		/// 检查房间是否所有玩家准备完成
		/// </summary>
		public bool CheckAllPlayerReady()
		{
			int count = this._players.Count;
			for ( int i = 0; i < count; i++ )
			{
				if ( this._players[i].progress < 100 )
					return false;
			}
			return true;
		}

		public void Update( long dt )
		{
			this.timeToNitifyPlayerInfos += dt;
			if ( this.timeToNitifyPlayerInfos >= Consts.NOTIFY_PLAYERINFO_INTERVAL )
				this.timeToNitifyPlayerInfos = 0;

			//只要满员就开始计时,即使玩家载入过程中丢失也照样开始游戏
			if ( this.started )
				this._time += dt;
		}
	}
}