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

		public bool CanOnline( ulong gcNID )
		{
			//检查客户端是否在等待房间
			if ( BS.instance.waitingRoomMgr.CheckClient( gcNID ) )
			{
				//在等待房间加入客户端
				BS.instance.waitingRoomMgr.OnGCLogin( gcNID );
				return true;
			}
			//检查客户端是否在战场
			if ( BS.instance.battleManager.CheckClient( gcNID ) )
			{
				return true;
			}
			return false;
		}

		/// <summary>
		/// 玩家上线,客户端请求登录时调用
		/// </summary>
		/// <param name="gcNID">网络ID</param>
		/// <param name="sid">Session ID</param>
		/// <returns>返回玩家实例</returns>
		public BSUser Online( ulong gcNID, uint sid )
		{
			//这里不进行合法性检测,调用前确保能上线

			//检查玩家是否还在内存中
			BSUser user = this.GetUser( gcNID );
			if ( user == null )
			{
				user = new BSUser();
				this._gcNidToUser.Add( gcNID, user );
			}
			//更新网络ID
			user.gcSID = sid;
			//更新连接标记
			user.isConnected = true;
			Logger.Info( $"user:{gcNID} online" );
			return user;
		}

		/// <summary>
		/// 下线指定玩家,由战场结束时调用
		/// </summary>
		public void Offline( BSUser user )
		{
			this.Disconnect( user );
			this._gcNidToUser.Remove( user.gcNID );
			if ( user.isConnected )
			{
				BS.instance.netSessionMgr.GetSession( user.gcSID, out INetSession session );
				session.DelayClose( 500, "offline" );
			}
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