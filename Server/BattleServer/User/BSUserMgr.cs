using Core.Misc;
using System.Collections.Generic;
using Core.Net;

namespace BattleServer.User
{
	public class BSUserMgr
	{
		private readonly Dictionary<ulong, BSUser> _gcNidToUser = new Dictionary<ulong, BSUser>();

		/// <summary>
		/// 检查是否存在指定网络ID的玩家
		/// </summary>
		public bool HasUser( ulong gcNID ) => this._gcNidToUser.ContainsKey( gcNID );

		/// <summary>
		/// 获取指定网络ID的玩家
		/// </summary>
		public BSUser GetUser( ulong gcNID )
		{
			this._gcNidToUser.TryGetValue( gcNID, out BSUser user );
			return user;
		}

		/// <summary>
		/// 玩家上线,客户端请求登录时调用
		/// </summary>
		/// <param name="gcNID">网络ID</param>
		/// <param name="sid">Session ID</param>
		/// <returns>返回玩家实例</returns>
		public BSUser Online( ulong gcNID, uint sid )
		{
			//检查玩家是否在战场
			if ( !BS.instance.battleManager.IsInBattle( gcNID ) )
				return null;

			//检查玩家是否还在内存中
			BSUser user = this.GetUser( gcNID );
			if ( user == null )
			{
				user = new BSUser( gcNID );
				this._gcNidToUser.Add( gcNID, user );
			}
			//更新sessionID
			user.gcSID = sid;
			//更新连接标记
			user.isConnected = true;

			BS.instance.battleManager.OnUserConnected( user );

			Logger.Info( $"user:{gcNID} online" );
			return user;
		}

		/// <summary>
		/// 下线指定玩家,由战场结束时调用
		/// </summary>
		public void Offline( BSUser user )
		{
			if ( user == null )
				return;
			if ( user.isConnected )
			{
				BS.instance.netSessionMgr.GetSession( user.gcSID, out INetSession session );
				session.DelayClose( 500, "offline" );
			}
			this.Disconnect( user );
			this._gcNidToUser.Remove( user.gcNID );
			Logger.Info( $"user:{user.gcNID} offline" );
		}

		/// <summary>
		/// 下线指定玩家,由战场结束时调用
		/// </summary>
		public void Offline( ulong gcNID )
		{
			BSUser user = this.GetUser( gcNID );
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
		public void Disconnect( BSUser user )
		{
			BS.instance.battleManager.OnUserDisconnected( user );
			user.isConnected = false;
			user.gcSID = 0;
		}

		/// <summary>
		/// 断开指定玩家连接,由Session在连接关闭时调用
		/// </summary>
		public void Disconnect( ulong gcNID )
		{
			BSUser user = this.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"can not find user:{gcNID}" );
				return;
			}
			this.Disconnect( user );
		}
	}
}