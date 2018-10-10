using Core.Misc;
using Shared;
using System.Collections.Generic;
using Google.Protobuf;

namespace CentralServer.User
{
	public class UserMgr
	{
		public readonly Dictionary<ulong, CUser> gcNIDToUser = new Dictionary<ulong, CUser>();
		public readonly List<CUser> users = new List<CUser>();

		public ErrorCode SendToUser( ulong gcNID, IMessage msg )
		{
			if ( !this.gcNIDToUser.TryGetValue( gcNID, out CUser user ) )
				return ErrorCode.InvalidGcNID;
			return user.Send( msg );
		}

		/// <summary>
		/// 玩家上线
		/// </summary>
		public ErrorCode UserOnline( ulong gcNID, uint ukey, uint gsNID, out CUser user )
		{
			user = new CUser( gcNID, ukey, gsNID );
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
			if ( !this.gcNIDToUser.TryGetValue( gcNID, out CUser user ) )
				return ErrorCode.InvalidGcNID;
			this.gcNIDToUser.Remove( gcNID );
			this.users.Remove( user );
			Logger.Log( $"user:{gcNID} offline" );
			return ErrorCode.Success;
		}

		public void KickUser( CUser user )
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
				CUser user = this.users[i];
				if ( user.gsNID != gsNID )
					continue;
				this.gcNIDToUser.Remove( user.gcNID );
				this.users.RemoveAt( i );
				--i;
				--count;
			}
		}

		public bool HasUser( ulong gcNID )
		{
			return this.gcNIDToUser.ContainsKey( gcNID );
		}

		public CUser GetUser( ulong gcNID )
		{
			this.gcNIDToUser.TryGetValue( gcNID, out CUser user );
			return user;
		}
	}
}