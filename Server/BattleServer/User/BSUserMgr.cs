using Core.Misc;
using System.Collections.Generic;
using Core.Net;

namespace BattleServer.User
{
	public class BSUserMgr
	{
		/// <summary>
		/// 网络ID到玩家实例的映射
		/// </summary>
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

		public bool SendToUser( ulong gcNID, Google.Protobuf.IMessage message )
		{
			BSUser user = this.GetUser( gcNID );
			if ( user == null )
				return false;
			return user.Send( message );
		}

		/// <summary>
		/// 创建玩家
		/// 在创建战场时调用
		/// </summary>
		public BSUser CreateUser( ulong gcNID, Battle.Battle battle )
		{
			BSUser user = new BSUser( gcNID, battle );
			this._gcNidToUser.Add( gcNID, user );
			Logger.Log( $"create user:{gcNID}" );
			return user;
		}

		public void DestroyUser( BSUser user )
		{
			this._gcNidToUser.Remove( user.gcNID );
			Logger.Log( $"destroy user:{user.gcNID}" );
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
			BSUser user = this.GetUser( gcNID );
			if ( user == null )
				return null;

			user.Online( sid );
			Logger.Info( $"user:{gcNID} online" );
			return user;
		}

		/// <summary>
		/// 下线指定玩家,由战场结束时调用
		/// </summary>
		public void Offline( BSUser user )
		{
			user.Offline();
			Logger.Info( $"user:{user.gcNID} offline" );
		}

		/// <summary>
		/// 断开指定玩家连接,由Session在连接关闭时调用
		/// </summary>
		internal void OnDisconnect( ulong gcNID )
		{
			BSUser user = this.GetUser( gcNID );
			System.Diagnostics.Debug.Assert( user != null, $"can not find user:{gcNID}" );
			this.Offline( user );
		}
	}
}