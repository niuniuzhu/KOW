using Core.Misc;
using System.Collections.Generic;
using System.Linq;

namespace CentralServer.User
{
	public class CSUserMgr
	{
		/// <summary>
		/// ukey到玩家的映射
		/// </summary>
		private readonly Dictionary<uint, CSUser> _ukeyToUser = new Dictionary<uint, CSUser>();
		/// <summary>
		/// 网络ID到玩家的映射
		/// </summary>
		private readonly Dictionary<ulong, CSUser> _gcNIDToUser = new Dictionary<ulong, CSUser>();
		/// <summary>
		/// 认证玩家列表
		/// 由LS提交的登陆凭证,用于验证客户端登陆CS
		/// </summary>
		private readonly List<CSUser> _authUsers = new List<CSUser>();
		/// <summary>
		/// 玩家数量
		/// </summary>
		public int count => this._ukeyToUser.Count;

		public bool HasUser( ulong gcNID ) => this._gcNIDToUser.ContainsKey( gcNID );

		public bool HasUser( uint ukey ) => this._ukeyToUser.ContainsKey( ukey );

		/// <summary>
		/// 获取指定网络ID的玩家
		/// </summary>
		public CSUser GetUser( ulong gcNID )
		{
			this._gcNIDToUser.TryGetValue( gcNID, out CSUser user );
			return user;
		}

		/// <summary>
		/// 获取指定ukey的玩家
		/// </summary>
		public CSUser GetUser( uint ukey )
		{
			this._ukeyToUser.TryGetValue( ukey, out CSUser user );
			return user;
		}

		/// <summary>
		/// 获取指定ukey的玩家
		/// </summary>
		public CSUser GetUserByUKey( uint ukey ) => this.GetUser( ukey );

		/// <summary>
		/// 获取指定网络ID的玩家
		/// </summary>
		public CSUser GetUserByGcNID( ulong gcNID ) => this.GetUser( gcNID );

		/// <summary>
		/// 创建玩家登陆凭证
		/// </summary>
		public CSUser CreateUser( uint ukey, ulong gcNID )
		{
			CSUser user = this.GetUser( ukey );
			if ( user == null )
			{
				user = new CSUser();
				this._ukeyToUser[ukey] = user;
				this._authUsers.Add( user );
			}
			else
			{
				//处理顶号
				if ( user.isConnected )
					this.KickUser( user, ( int )Protos.CS2GS_KickGC.Types.EReason.DuplicateLogin );
			}
			user.OnCreate( ukey, gcNID, TimeUtils.utcTime );
			this._gcNIDToUser[gcNID] = user;
			Logger.Info( $"user:{user.gcNID} was created" );
			return user;
		}

		/// <summary>
		/// 注销玩家
		/// </summary>
		public void DestroyUser( CSUser user )
		{
			System.Diagnostics.Debug.Assert( !user.isConnected, $"user:{user.gcNID} still online" );
			//如果玩家在战场则不销毁,留待战场结束再判断是否在线,不在线再行销毁
			if ( user.isInBattle )
				return;
			this._gcNIDToUser.Remove( user.gcNID );
			this._ukeyToUser.Remove( user.ukey );
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
				return null;

			user.Online( sid, lid );
			this._authUsers.Remove( user );

			Logger.Info( $"user:{gcNID}({lid}) online" );
			return user;
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public void Offline( CSUser user )
		{
			Logger.Info( $"user:{user.gcNID}({user.gsLID}) offline" );
			//玩家下线
			user.Offline();
			//把玩家从房间中踢掉
			CS.instance.matcher.OnUserKicked( user );
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public bool Offline( ulong gcNID )
		{
			CSUser user = this.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"can not find user:{gcNID}" );
				return false;
			}
			this.Offline( user );
			return true;
		}

		/// <summary>
		/// 断开指定玩家连接,由Session在连接关闭时调用
		/// </summary>
		public bool KickUser( ulong gcNID, int reason )
		{
			CSUser user = this.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"can not find user:{gcNID}" );
				return false;
			}
			this.KickUser( user, reason );
			return true;
		}

		public void KickUser( CSUser user, int reason )
		{
			//通知gs玩家被踢下线
			Protos.CS2GS_KickGC kickGc = ProtoCreator.Q_CS2GS_KickGC();
			kickGc.GcNID = user.gcNID;
			kickGc.Reason = ( Protos.CS2GS_KickGC.Types.EReason )reason;
			//通知GS踢掉GC
			CS.instance.netSessionMgr.Send( user.gsSID, kickGc, ret => { } );
			this.Offline( user );
		}

		/// <summary>
		/// 踢走连接到指定逻辑ID的GS的所有玩家
		/// 当GS丢失连接时调用
		/// </summary>
		public void OnGSDisconnect( uint gsLID )
		{
			CSUser[] users = this._gcNIDToUser.Values.ToArray();
			int count = users.Length;
			for ( int i = 0; i < count; i++ )
			{
				CSUser user = users[i];
				if ( user.gsLID != gsLID )
					continue;
				//下线玩家
				this.Offline( user );
				//注销玩家
				this.DestroyUser( user );
			}
		}

		/// <summary>
		/// 心跳回调
		/// </summary>
		internal void OnHeartBeat( long dt )
		{
			long currTime = TimeUtils.utcTime;
			long expTime = CS.instance.config.sessionExpTime;
			int count = this._authUsers.Count;
			for ( int i = 0; i < count; i++ )
			{
				CSUser user = this._authUsers[i];
				if ( currTime < user.loginTime + expTime )
					continue;
				//销毁玩家,DestroyUser逻辑一致
				this._gcNIDToUser.Remove( user.gcNID );
				this._ukeyToUser.Remove( user.ukey );
				this._authUsers.RemoveAt( i );
				--i;
				--count;
				Logger.Log( $"user:{user.gcNID} expired" );
			}
		}
	}
}