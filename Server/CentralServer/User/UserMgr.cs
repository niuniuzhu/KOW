using Core.Misc;
using Google.Protobuf;
using Shared;
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
		public ErrorCode UserOnline( ulong gcNID, uint gsNID, out CUser user )
		{
			user = null;

			//先验证是否合法登陆
			if ( !CS.instance.gcNIDMgr.Check( gcNID ) )
				return ErrorCode.InvalidGcNID;
			uint ukey = CS.instance.gcNIDMgr.GetUKey( gcNID );
			//移除登陆凭证
			CS.instance.gcNIDMgr.Remove( gcNID );

			//处理顶号
			if ( this.HasUser( gcNID ) )
			{
				//由于gs和cs的客户端数据不同步,所以只需要各自管理就可以
				//这里无需等待回调就马上移除客户端数据
				System.Diagnostics.Debug.Assert(
					this.KickUser( gcNID, Protos.CS2GS_KickGC.Types.EReason.DuplicateLogin ),
					$"kick user:{gcNID} failed" );
			}

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

		public bool KickUser( ulong gcNID, Protos.CS2GS_KickGC.Types.EReason reason )
		{
			var user = this.GetUser( gcNID );
			if ( user == null )
				return false;

			//玩家下线
			this.UserOffline( gcNID );

			//通知gs玩家被踢下线
			Protos.CS2GS_KickGC kickGc = ProtoCreator.Q_CS2GS_KickGC();
			kickGc.GcNID = gcNID;
			kickGc.Reason = reason;
			user.Send( kickGc );
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