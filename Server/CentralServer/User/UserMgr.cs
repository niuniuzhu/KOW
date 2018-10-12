using Core.Misc;
using Google.Protobuf;
using Shared;
using System;
using System.Collections.Generic;

namespace CentralServer.User
{
	public class UserMgr
	{
		private readonly Dictionary<ulong, CUser> _gcNidToUser = new Dictionary<ulong, CUser>();
		private readonly List<CUser> _users = new List<CUser>();

		public ErrorCode SendToUser( ulong gcNID, IMessage msg )
		{
			if ( !this._gcNidToUser.TryGetValue( gcNID, out CUser user ) )
				return ErrorCode.InvalidGcNID;
			return user.Send( msg );
		}

		/// <summary>
		/// 玩家上线
		/// </summary>
		public ErrorCode UserOnline( ulong gcNID, uint ukey, uint gsNID, out CUser user )
		{
			user = new CUser( gcNID, ukey, gsNID );
			this._gcNidToUser[gcNID] = user;
			this._users.Add( user );
			Logger.Log( $"user:{gcNID} online" );
			return ErrorCode.Success;
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public ErrorCode UserOffline( ulong gcNID )
		{
			if ( !this._gcNidToUser.TryGetValue( gcNID, out CUser user ) )
				return ErrorCode.InvalidGcNID;
			this._gcNidToUser.Remove( gcNID );
			this._users.Remove( user );
			Logger.Log( $"user:{gcNID} offline" );
			return ErrorCode.Success;
		}

		public bool KickUser( ulong gcNID, Protos.CS2GS_KickGC.Types.EReason reason, Action<IMessage> rpcHandler )
		{
			var user = this.GetUser( gcNID );
			if ( user == null )
				return false;
			//通知gs玩家被踢下线
			var kickGc = ProtoCreator.Q_CS2GS_KickGC();
			kickGc.GcNID = gcNID;
			kickGc.Reason = reason;
			CS.instance.netSessionMgr.Send( user.gsNID, kickGc, rpcHandler );
			return true;
		}

		/// <summary>
		/// 踢走连接到指定gsNID的所有玩家
		/// </summary>
		public void KickUsers( uint gsNID )
		{
			int count = this._users.Count;
			for ( int i = 0; i < count; i++ )
			{
				CUser user = this._users[i];
				if ( user.gsNID != gsNID )
					continue;
				this._gcNidToUser.Remove( user.gcNID );
				this._users.RemoveAt( i );
				--i;
				--count;
			}
		}

		public bool HasUser( ulong gcNID )
		{
			return this._gcNidToUser.ContainsKey( gcNID );
		}

		public CUser GetUser( ulong gcNID )
		{
			this._gcNidToUser.TryGetValue( gcNID, out CUser user );
			return user;
		}
	}
}