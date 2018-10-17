using Core.Misc;
using Google.Protobuf;
using Shared;
using System.Collections.Generic;

namespace CentralServer.User
{
	public class UserMgr
	{
		private readonly Dictionary<ulong, CUser> _gcNidToUser = new Dictionary<ulong, CUser>();
		private readonly Dictionary<uint, CUser> _ukeyToUser = new Dictionary<uint, CUser>();
		private readonly List<CUser> _users = new List<CUser>();

		public ErrorCode SendToUser( ulong gcNID, IMessage msg )
		{
			if ( !this._gcNidToUser.TryGetValue( gcNID, out CUser user ) )
				return ErrorCode.InvalidGcNID;
			msg.MTrans( Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
			return user.Send( msg );
		}

		/// <summary>
		/// 玩家上线
		/// </summary>
		public bool UserOnline( ulong gcNID, uint gsNID, out CUser user )
		{
			user = null;

			//先验证是否合法登陆
			if ( !CS.instance.gcNIDMgr.Check( gcNID ) )
			{
				Logger.Warn( $"illegal gcNID:{gcNID}" );
				return false;
			}

			uint ukey = CS.instance.gcNIDMgr.GetUKey( gcNID );
			//移除登陆凭证
			CS.instance.gcNIDMgr.Remove( gcNID );

			CUser lastUser = this.GetUser( ukey );
			//处理顶号
			if ( lastUser != null )
			{
				//由于gs和cs的客户端数据不同步,所以只需要各自管理就可以
				//这里无需等待回调就马上移除客户端数据
				this.KickUser( lastUser, Protos.CS2GS_KickGC.Types.EReason.DuplicateLogin );
			}

			user = new CUser( gcNID, ukey, gsNID );
			this._gcNidToUser[gcNID] = user;
			this._ukeyToUser[ukey] = user;
			this._users.Add( user );
			Logger.Info( $"user:{gcNID} online" );
			return true;
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public bool UserOffline( ulong gcNID )
		{
			if ( !this._gcNidToUser.TryGetValue( gcNID, out CUser user ) )
			{
				Logger.Warn( $"can not find user:{gcNID}" );
				return false; 
			}
			this._gcNidToUser.Remove( gcNID );
			this._ukeyToUser.Remove( user.ukey );
			this._users.Remove( user );
			Logger.Info( $"user:{gcNID} offline" );
			return true;
		}

		private void KickUser( CUser user, Protos.CS2GS_KickGC.Types.EReason reason )
		{
			CS.instance.OnUserKicked( user.gcNID );
			//通知gs玩家被踢下线
			Protos.CS2GS_KickGC kickGc = ProtoCreator.Q_CS2GS_KickGC();
			kickGc.GcNID = user.gcNID;
			kickGc.Reason = reason;
			user.Send( kickGc, msg => { } );
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
				this._ukeyToUser.Remove( user.ukey );
				this._users.RemoveAt( i );
				--i;
				--count;
			}
		}

		public bool HasUser( ulong gcNID ) => this._gcNidToUser.ContainsKey( gcNID );

		public bool HasUser( uint ukey ) => this._ukeyToUser.ContainsKey( ukey );

		public CUser GetUser( ulong gcNID )
		{
			this._gcNidToUser.TryGetValue( gcNID, out CUser user );
			return user;
		}

		public CUser GetUser( uint ukey )
		{
			this._ukeyToUser.TryGetValue( ukey, out CUser user );
			return user;
		}

		internal bool OnUserKicked( ulong gcNID ) => this.UserOffline( gcNID );
	}
}