using Core.Misc;
using Google.Protobuf;
using System.Collections.Generic;

namespace CentralServer.User
{
	public class CSUserMgr
	{
		private readonly Dictionary<uint, CSUser> _ukeyToUser = new Dictionary<uint, CSUser>();
		private readonly Dictionary<ulong, CSUser> _gcNIDToUser = new Dictionary<ulong, CSUser>();
		private readonly Dictionary<uint, List<CSUser>> _gsLIDToUser = new Dictionary<uint, List<CSUser>>();
		private readonly List<CSUser> _users = new List<CSUser>();

		public void SendToUser( ulong gcNID, IMessage msg )
		{
			if ( !this._gcNIDToUser.TryGetValue( gcNID, out CSUser user ) )
				return;
			user.Send( msg );
		}

		public bool HasUser( ulong gcNID ) => this._gcNIDToUser.ContainsKey( gcNID );

		public bool HasUser( uint ukey ) => this._ukeyToUser.ContainsKey( ukey );

		public CSUser GetUser( ulong gcNID )
		{
			this._gcNIDToUser.TryGetValue( gcNID, out CSUser user );
			return user;
		}

		public CSUser GetUser( uint ukey )
		{
			this._ukeyToUser.TryGetValue( ukey, out CSUser user );
			return user;
		}

		public CSUser CreateUser( uint ukey, ulong gcNID )
		{
			CSUser user = this.GetUser( ukey );
			if ( user == null )
			{
				user = new CSUser();
				this._ukeyToUser[ukey] = user;
				this._users.Add( user );
			}
			else
			{
				if ( user.isConnected )
				{
					//顶号

					Logger.Info( $"user:{user.gcNID} was covered" );

					//通知gs玩家被踢下线
					Protos.CS2GS_KickGC kickGc = ProtoCreator.Q_CS2GS_KickGC();
					kickGc.GcNID = user.gcNID;
					kickGc.Reason = Protos.CS2GS_KickGC.Types.EReason.DuplicateLogin;
					//把玩家下线
					user.Offline();
					//把玩家从房间中踢掉
					CS.instance.matcher.OnUserKicked( user );
					//通知GS踢掉GC
					CS.instance.netSessionMgr.Send( user.gsSID, kickGc, ret => { } );
				}
			}
			user.OnCreate( ukey, gcNID, TimeUtils.utcTime );
			this._gcNIDToUser[gcNID] = user;
			return user;
		}

		public void DestroyUser( CSUser user )
		{
			this._gcNIDToUser.Remove( user.gcNID );
			this._ukeyToUser.Remove( user.ukey );
			this._users.Remove( user );
			Logger.Log( $"destroy user:{user.gcNID}" );
		}

		/// <summary>
		/// 玩家上线
		/// </summary>
		public CSUser Online( ulong gcNID, uint sid, uint lid )
		{
			//先验证是否合法登陆
			CSUser user = this.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"illegal gcNID:{gcNID}" );
				return null;
			}

			user.Online( sid );
			this._gsLIDToUser.AddToList( lid, user );

			Logger.Info( $"user:{gcNID} online" );
			return user;
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public bool Offline( CSUser user )
		{
			this._gsLIDToUser.RemoveFromList( user.gsSID, user );
			//玩家下线
			user.Offline();
			//把玩家从房间中踢掉
			CS.instance.matcher.OnUserKicked( user );

			Logger.Info( $"user:{user.gcNID} offline" );
			return true;
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public void Offline( ulong gcNID )
		{
			CSUser user = this.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"can not find user:{gcNID}" );
				return;
			}
			this.Offline( user );
		}

		/// <summary>
		/// 断开指定玩家连接,由Session在连接关闭时调用
		/// </summary>
		public void KickUser( ulong gcNID )
		{
			//todo 需要通知GS踢掉玩家
		}

		/// <summary>
		/// 踢走连接到指定逻辑ID的GS的所有玩家
		/// </summary>
		public void KickUsersByGS( uint gsLID )
		{
			if ( !this._gsLIDToUser.TryGetValue( gsLID, out List<CSUser> users ) )
				return;
			int count = users.Count;
			for ( int i = 0; i < count; i++ )
			{
				CSUser user = users[i];
				//下线玩家
				this.Offline( user );
				//销毁玩家
				this.DestroyUser( user );
			}
		}

		public void OnHeartBeat( long dt )
		{
			long currTime = TimeUtils.utcTime;
			long expTime = CS.instance.config.sessionExpTime;
			int count = this._users.Count;
			for ( int i = 0; i < count; i++ )
			{
				CSUser user = this._users[i];
				if ( user.isConnected )
					continue;
				if ( currTime < user.loginTime + expTime )
					continue;
				//销毁玩家(这里跟DestoryUser方法一致)
				this._gcNIDToUser.Remove( user.gcNID );
				this._ukeyToUser.Remove( user.ukey );
				this._users.RemoveAt( i );
				--i;
				--count;
				Logger.Log( $"user:{user.gcNID} expired" );
			}
		}
	}
}