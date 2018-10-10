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

		public ErrorCode AddUser( ulong user )
		{
			if ( this._users.Count >= Consts.ROOM_MAX_USER )
				return ErrorCode.MaximumUsers;
			if ( this._users.Contains( user ) )
				return ErrorCode.UserExists;
			this._users.Add( user );
			return ErrorCode.Success;
		}

		public ulong GetUserAt( int index ) => this._users[index];

		public bool IsFull() => this._users.Count == Consts.ROOM_MAX_USER;

		public void Clear() => this._users.Clear();
	}
}