﻿using CentralServer.User;
using Core.Misc;
using System.Collections.Generic;

namespace CentralServer.Rooms
{
	static class RoomPool
	{
		private static readonly ObjectPool<Room> POOL = new ObjectPool<Room>( 10 );

		internal static Room Pop( RoomManager manager )
		{
			var room = POOL.Pop();
			room.Init( manager );
			return room;
		}

		internal static void Push( Room room )
		{
			POOL.Push( room );
		}
	}

	public class RoomManager
	{
		private Dictionary<uint, Room> _idToRoom = new Dictionary<uint, Room>();
		private Dictionary<ulong, Room> _userToRoom = new Dictionary<ulong, Room>();
		private readonly Dictionary<ulong, BattleUser> _userIDToBattleUser = new Dictionary<ulong, BattleUser>();

		public bool Create( CSUser user, int numTeams, int numPlayerPerTeam, out uint roomID )
		{
			roomID = 0;

			//是否已在房间
			if ( this._userIDToBattleUser.ContainsKey( user.gcNID ) )
				return false;

			var room = RoomPool.Pop( this );
			room.Setup( numTeams, numPlayerPerTeam );

			BattleUser battleUser = new BattleUser( user.gcNID );
			if ( !room.AddUser( battleUser ) )
			{
				RoomPool.Push( room );
				return false;
			}
			this._userIDToBattleUser[user.gcNID] = battleUser;
			this._userToRoom[user.gcNID] = room;
			this._idToRoom[room.id] = room;
			this.CheckRoom( room );
			roomID = room.id;
			return true;
		}

		public bool Join( CSUser user, uint roomID )
		{
			if ( !this._idToRoom.TryGetValue( roomID, out Room room ) )
				return false;

			BattleUser battleUser = new BattleUser( user.gcNID );
			if ( !room.AddUser( battleUser ) )
				return false;

			this._userIDToBattleUser[user.gcNID] = battleUser;
			this._userToRoom[user.gcNID] = room;
			this.CheckRoom( room );
			return true;
		}

		public bool Leave( CSUser user )
		{
			if ( !this._userToRoom.TryGetValue( user.gcNID, out Room room ) )
				return false;
			if ( !this._userIDToBattleUser.TryGetValue( user.gcNID, out BattleUser battleUser ) )
				return false;
			if ( !room.RemoveUser( battleUser ) )
				return false;
			this._userIDToBattleUser.Remove( user.gcNID );
			this._userToRoom.Remove( user.gcNID );
			if ( room.isEmpty )
				RoomPool.Push( room );
			return true;
		}

		private void CheckRoom( Room room )
		{
			if ( !room.isFull )
				return;
			var battleUserInfo = room.GetBattleUserInfo();
			RoomPool.Push( room );

			CS.instance.battleEntry.BeginBattle( battleUserInfo.users, battleUserInfo.tUsers );
		}
	}
}
