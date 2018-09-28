using Core.Misc;
using Shared;
using System.Collections.Generic;

namespace CentralServer.User
{
	public class UserMgr
	{
		public readonly Dictionary<ulong, User> gcNIDToUser = new Dictionary<ulong, User>();
		public readonly List<User> users = new List<User>();

		/// <summary>
		/// 玩家上线
		/// </summary>
		public ErrorCode UserOnline( ulong gcNID, uint ukey, uint gsNID, out User user )
		{
			user = new User( gcNID, ukey, gsNID );
			this.gcNIDToUser[gcNID] = user;
			this.users.Add( user );
			Logger.Log( $"user:{gcNID} online" );
			return ErrorCode.Success;
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public ErrorCode UserOffline( ulong gcNID )
		{
			if ( !this.gcNIDToUser.TryGetValue( gcNID, out User user ) )
				return ErrorCode.InvalidGcNID;
			this.gcNIDToUser.Remove( gcNID );
			this.users.Remove( user );
			Logger.Log( $"user:{gcNID} offline" );
			return ErrorCode.Success;
		}

		public void KickUser( User user )
		{
			this.UserOffline( user.gcNID );
			//todo send to client and cs
		}

		/// <summary>
		/// 踢走连接到指定gsNID的所有玩家
		/// </summary>
		public void KickUsers( uint gsNID )
		{
			int count = this.users.Count;
			for ( int i = 0; i < count; i++ )
			{
				User user = this.users[i];
				if ( user.gsNID != gsNID )
					continue;
				this.gcNIDToUser.Remove( user.gcNID );
				this.users.RemoveAt( i );
				--i;
				--count;
			}
		}
	}
}