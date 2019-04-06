using CentralServer.User;
using Core.Misc;
using System;
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
		private Dictionary<CSUser, Room> _userToRoom = new Dictionary<CSUser, Room>();

		public bool Create( CSUser user, int numTeams, int numPlayerPerTeam )
		{
			//是否已在房间
			if ( this._userToRoom.ContainsKey( user ) )
				return false;

			var room = RoomPool.Pop( this );
			room.Setup( numTeams, numPlayerPerTeam );
			room.AddUser( user );
			this._userToRoom[user] = room;
			this.CheckRoom( room );
			return true;
		}

		public bool Join( CSUser user, CSUser userInRoom )
		{
			if ( !this._userToRoom.TryGetValue( userInRoom, out Room room ) )
				return false;
			if ( !room.AddUser( user ) )
				return false;
			this._userToRoom[user] = room;
			this.CheckRoom( room );
			return true;
		}

		public bool Leave( CSUser user )
		{
			if ( !this._userToRoom.TryGetValue( user, out Room room ) )
				return false;
			if ( !room.RemoveUser( user ) )
				return false;
			this._userToRoom.Remove( user );
			if ( room.isEmpty )
				RoomPool.Push( room );
			return true;
		}

		private void CheckRoom( Room room )
		{
			if ( !room.isFull )
				return;
		}
	}
}
