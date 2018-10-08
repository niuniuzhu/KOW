using CentralServer.User;
using Core.Misc;
using Shared;
using System.Collections.Generic;

namespace CentralServer.Match
{
	public class Room
	{
		private static uint _gid;

		public uint id;
		public readonly List<CUser> users = new List<CUser>();

		public Room()
		{
			if ( _gid == uint.MaxValue )
			{
				Logger.Warn( "maximum id of room, will begin from zero" );
				_gid = 0;
			}
			this.id = _gid++;
		}

		public ErrorCode AddUser( CUser user )
		{
			if ( this.users.Count >= Consts.ROOM_MAX_USER )
				return ErrorCode.MaximumUsers;
			if ( this.users.Contains( user ) )
				return ErrorCode.UserExists;
			this.users.Add( user );
			return ErrorCode.Success;
		}
	}
}