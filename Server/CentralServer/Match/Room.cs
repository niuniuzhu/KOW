using Core.Misc;
using System.Collections.Generic;
using CentralServer.User;

namespace CentralServer.Match
{
	/// <summary>
	/// 房间类
	/// 该类未内部类,由Matcher类代理,大部分方法的参数不进行合法性检测
	/// </summary>
	public class Room : IPoolObject
	{
		private static uint _gid;

		/// <summary>
		/// 房间ID
		/// </summary>
		public readonly uint id;

		/// <summary>
		/// 地图ID
		/// </summary>
		public int mapID;

		/// <summary>
		/// 地图最大玩家数
		/// </summary>
		public int maxPlayers;

		/// <summary>
		/// 玩家数量
		/// </summary>
		public int numPlayers => this._players.Count;

		/// <summary>
		/// 获取房间是否满员
		/// </summary>
		public bool isFull => this._players.Count == this.maxPlayers;

		/// <summary>
		/// 房间是否没有玩家
		/// </summary>
		public bool isEmpty => this._players.Count == 0;

		/// <summary>
		/// 玩家列表
		/// </summary>
		private readonly List<RoomPlayer> _players = new List<RoomPlayer>();

		public Room()
		{
			System.Diagnostics.Debug.Assert( _gid < uint.MaxValue, "maximum id of room!!" );
			this.id = ++_gid;
		}

		/// <summary>
		/// 适用于克隆体的构造函数
		/// </summary>
		private Room( uint id )
		{
			this.id = id;
		}

		public void Clear()
		{
			//必须在回收前主动移除所有玩家
			System.Diagnostics.Debug.Assert( this._players.Count == 0, "remove all players before destroy room." );
			this.mapID = 0;
			this.maxPlayers = 0;
		}

		/// <summary>
		/// 创建一个克隆体
		/// </summary>
		/// <returns></returns>
		public Room Clone()
		{
			Room cloned = new Room( this.id );
			cloned.mapID = this.mapID;
			cloned.maxPlayers = this.maxPlayers;
			cloned._players.AddRange( this._players );
			return cloned;
		}

		public bool CanAddUser( ulong gcNID ) => this._players.Count < this.maxPlayers && !this.HasUser( gcNID );

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
		public RoomPlayer GetPlayer( CSUser user )
		{
			int count = this._players.Count;
			for ( int i = 0; i < count; i++ )
			{
				if ( this._players[i].user == user )
					return this._players[i];
			}
			return null;
		}

		/// <summary>
		/// 检查是否存在指定id的玩家
		/// </summary>
		public bool HasUser( ulong gcNID )
		{
			int count = this._players.Count;
			for ( int i = 0; i < count; i++ )
			{
				if ( this._players[i].user.gcNID == gcNID )
					return true;
			}
			return false;
		}
	}
}