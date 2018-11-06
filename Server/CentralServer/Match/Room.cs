using Core.Misc;
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

		public readonly uint id;

		public int numPlayers => this._players.Count;

		/// <summary>
		/// 地图ID
		/// </summary>
		public int mapID;

		/// <summary>
		/// 地图最大玩家数
		/// </summary>
		public int maxPlayers;

		/// <summary>
		/// 获取房间是否满员
		/// </summary>
		public bool isFull => this._players.Count == this.maxPlayers;

		/// <summary>
		/// 房间是否没有玩家
		/// </summary>
		public bool isEmpty => this._players.Count == 0;

		private readonly List<RoomPlayer> _players = new List<RoomPlayer>();

		public Room()
		{
			System.Diagnostics.Debug.Assert( _gid < uint.MaxValue, "maximum id of room!!" );
			this.id = ++_gid;
		}

		public void Clear()
		{
			//必须在回收前主动移除所有玩家
			System.Diagnostics.Debug.Assert( this._players.Count == 0, "remove all players before destroy room." );
			this.mapID = 0;
			this.maxPlayers = 0;
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
	}
}