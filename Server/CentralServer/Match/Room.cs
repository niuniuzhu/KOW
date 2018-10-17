using CentralServer.User;
using Core.Misc;
using Shared;
using System.Collections.Generic;

namespace CentralServer.Match
{
	public class Room : IPoolObject
	{
		private static uint _gid;

		public uint id { get; }

		public int mapID { get; }

		public int numPlayer => this._players.Count;

		/// <summary>
		/// 获取房间是否满员
		/// </summary>
		public bool isFull => this._players.Count == Consts.ROOM_MAX_PLAYERS;

		/// <summary>
		/// 房间是否没有玩家
		/// </summary>
		public bool isEmpty => this._players.Count == 0;

		public bool timeout => this._time >= Consts.ROOM_TIME_OUT;
		public long timeToNitifyPlayerInfos { private set; get; }

		private readonly List<PlayerInfo> _players = new List<PlayerInfo>();
		private long _time;

		public Room()
		{
			if ( _gid == uint.MaxValue )
			{
				Logger.Warn( "maximum id of room, will begin from zero" );
				_gid = 0;
			}
			this.id = _gid++;
		}

		public void Clear()
		{
			this.RemoveAllPlayers();
			this._time = 0;
			this.timeToNitifyPlayerInfos = 0;
		}

		/// <summary>
		/// 加入新玩家
		/// </summary>
		public bool AddPlayer( PlayerInfo player )
		{
			if ( this._players.Count >= Consts.ROOM_MAX_PLAYERS )
			{
				Logger.Warn( "room overflow" );
				return false;
			}
			if ( this.HasPlayer( player ) )
			{
				Logger.Error( $"player:{player} exist" );
				return false;
			}
			this._players.Add( player );
			Logger.Log( $"player:{player} join room:{this.id}" );
			return true;
		}

		/// <summary>
		/// 移除指定id的玩家
		/// 注意这里不处理当所有玩家移除后归还房间,需要调用者自行处理
		/// </summary>
		public bool RemovePlayer( ulong gcNID )
		{
			PlayerInfo player = this.GetPlayer( gcNID );
			if ( player == null )
			{
				Logger.Error( $"player:{gcNID} not exist" );
				return false;
			}
			CUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Error( $"can not find user:{gcNID}" );
				return false;
			}
			System.Diagnostics.Debug.Assert( user.room == this.id, $"user's roomID:{user.room} is not same as rommID:{this.id}" );
			user.inRoom = false;
			this._players.Remove( player );
			Logger.Log( $"player:{player} leave room:{this.id}" );
			return true;
		}

		/// <summary>
		/// 移除玩家
		/// 注意这里不处理当所有玩家移除后归还房间,需要调用者自行处理
		/// </summary>
		public bool RemovePlayer( PlayerInfo player ) => this.RemovePlayer( player.gcNID );

		/// <summary>
		/// 移除所有玩家(内部调用,通常是房间被销毁时)
		/// 注意这里不处理归还房间,需要调用者自行处理
		/// </summary>
		private void RemoveAllPlayers()
		{
			int count = this._players.Count;
			if ( count == 0 )
				return;
			for ( int i = 0; i < count; i++ )
			{
				PlayerInfo player = this._players[i];
				CUser user = CS.instance.userMgr.GetUser( player.gcNID );
				if ( user == null )
				{
					Logger.Error( $"can not find user:{player.gcNID}" );
					continue;
				}

				System.Diagnostics.Debug.Assert( user.room == this.id,
												 $"user's roomID:{user.room} is not same as rommID:{this.id}" );
				user.inRoom = false;
				Logger.Log( $"player:{player} leave room:{this.id}" );
			}
			this._players.Clear();
		}

		/// <summary>
		/// 获取指定索引值的玩家
		/// </summary>
		public PlayerInfo GetPlayerAt( int index ) => this._players[index];

		/// <summary>
		/// 获取指定id的玩家
		/// </summary>
		public PlayerInfo GetPlayer( ulong gcNID )
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
		/// 获取指定玩家
		/// </summary>
		public PlayerInfo GetPlayer( PlayerInfo player ) => this.GetPlayer( player.gcNID );

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
		/// 检查是否存在指定玩家
		/// </summary>
		public bool HasPlayer( PlayerInfo player ) => this.HasPlayer( player.gcNID );

		/// <summary>
		/// 更新玩家信息
		/// </summary>
		public void UpdatePlayerProgress( ulong gcNID, int progress )
		{
			PlayerInfo player = this.GetPlayer( gcNID );
			if ( player == null )
			{
				Logger.Error( $"player:{gcNID} not exist" );
				return;
			}
			player.progress = progress;
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

			//只要满员就开始计时,即使过程中丢失玩家也照样开始游戏
			if ( this.isFull )
				this._time += dt;
		}

		public void FillProtoPlayerInfo( Google.Protobuf.Collections.RepeatedField<Protos.Room_PlayerInfo> repeatedField )
		{
			int count = this._players.Count;
			for ( int i = 0; i < count; i++ )
			{
				PlayerInfo player = this._players[i];
				Protos.Room_PlayerInfo pi = new Protos.Room_PlayerInfo();
				pi.GcNID = player.gcNID;
				pi.Name = CS.instance.userMgr.GetUser( player.gcNID ).name;
				pi.ActorID = player.actorID;
				pi.Progress = player.progress;
				repeatedField.Add( pi );
			}
		}
	}
}