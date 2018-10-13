using CentralServer.User;
using Core.Misc;
using Shared;
using System.Collections.Generic;

namespace CentralServer.Match
{
	public class Room
	{
		private static uint _gid;

		public uint id { get; }

		public int numUsers => this._users.Count;

		private readonly List<ulong> _users = new List<ulong>();

		public Room()
		{
			if ( _gid == uint.MaxValue )
			{
				Logger.Warn( "maximum id of room, will begin from zero" );
				_gid = 0;
			}
			this.id = _gid++;
		}

		/// <summary>
		/// 加入新玩家
		/// </summary>
		public bool AddUser( ulong gcNID )
		{
			if ( this._users.Count >= Consts.ROOM_MAX_USER )
			{
				Logger.Warn( "user overflow" );
				return false;
			}
			if ( this._users.Contains( gcNID ) )
			{
				Logger.Warn( "user exist" );
				return false;
			}
			this._users.Add( gcNID );
			Logger.Log( $"user:{gcNID} join room:{this.id}" );
			return true;
		}

		/// <summary>
		/// 获取指定索引值的玩家ID
		/// </summary>
		public ulong GetUserAt( int index ) => this._users[index];

		/// <summary>
		/// 获取房间是否满员
		/// </summary>
		/// <returns></returns>
		public bool IsFull => this._users.Count == Consts.ROOM_MAX_USER;

		public bool IsEmpty => this._users.Count == 0;

		/// <summary>
		/// 移除玩家
		/// 注意这里不处理当所有玩家移除后归还房间,需要调用者自行处理
		/// </summary>
		public bool RemoveUser( ulong gcNID )
		{
			if ( !this._users.Contains( gcNID ) )
			{
				Logger.Warn( "user not exist" );
				return false;
			}
			CUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"can not find user:{gcNID}" );
				return false;
			}
			System.Diagnostics.Debug.Assert( user.room == this.id, $"user's roomID:{user.room} is not same as rommID:{this.id}" );
			user.inRoom = false;
			this._users.Remove( gcNID );
			Logger.Log( $"user:{gcNID} leave room:{this.id}" );
			return true;
		}

		/// <summary>
		/// 移除所有玩家
		/// 注意这里不处理归还房间,需要调用者自行处理
		/// </summary>
		public void RemoveAllUsers()
		{
			int count = this._users.Count;
			if ( count == 0 )
				return;
			for ( int i = 0; i < count; i++ )
			{
				ulong gcNID = this._users[i];
				CUser user = CS.instance.userMgr.GetUser( gcNID );
				if ( user == null )
				{
					Logger.Warn( $"can not find user:{gcNID}" );
					continue;
				}

				System.Diagnostics.Debug.Assert( user.room == this.id,
												 $"user's roomID:{user.room} is not same as rommID:{this.id}" );
				user.inRoom = false;
				Logger.Log( $"user:{gcNID} leave room:{this.id}" );
			}
			this._users.Clear();
		}
	}
}