using Core.Misc;
using Google.Protobuf;
using System.Collections.Generic;
using CentralServer.Net;

namespace CentralServer.User
{
	public class CSUserMgr
	{
		private readonly Dictionary<ulong, CSUser> _gcNidToUser = new Dictionary<ulong, CSUser>();
		private readonly Dictionary<uint, CSUser> _ukeyToUser = new Dictionary<uint, CSUser>();
		private readonly Dictionary<GateSession, List<CSUser>> _gsToUser = new Dictionary<GateSession, List<CSUser>>();
		private readonly List<CSUser> _users = new List<CSUser>();

		public void SendToUser( ulong gcNID, IMessage msg )
		{
			if ( !this._gcNidToUser.TryGetValue( gcNID, out CSUser user ) )
				return;
			user.Send( msg );
		}

		public bool HasUser( ulong gcNID ) => this._gcNidToUser.ContainsKey( gcNID );

		public bool HasUser( uint ukey ) => this._ukeyToUser.ContainsKey( ukey );

		public CSUser GetUser( ulong gcNID )
		{
			this._gcNidToUser.TryGetValue( gcNID, out CSUser user );
			return user;
		}

		public CSUser GetUser( uint ukey )
		{
			this._ukeyToUser.TryGetValue( ukey, out CSUser user );
			return user;
		}

		/// <summary>
		/// 玩家上线
		/// </summary>
		public CSUser Online( ulong gcNID, GateSession gsSession )
		{
			//先验证是否合法登陆
			if ( !CS.instance.certificate.Check( gcNID ) )
			{
				Logger.Warn( $"illegal gcNID:{gcNID}" );
				return null;
			}

			uint ukey = CS.instance.certificate.GetUKey( gcNID );
			//移除登陆凭证
			CS.instance.certificate.Remove( gcNID );

			bool isNew = false;
			//检查玩家是否还在内存中
			CSUser user = this.GetUser( ukey );
			if ( user != null )
			{
				//检查玩家是否已连线
				if ( user.IsConnected )
				{
					//顶号

					//让前玩家下线
					this.Offline( user.gcNID );

					Logger.Info( $"user:{user.gcNID} was covered" );

					//通知gc玩家被踢下线
					Protos.CS2GS_KickGC kickGc = ProtoCreator.Q_CS2GS_KickGC();
					kickGc.GcNID = user.gcNID;
					kickGc.Reason = Protos.CS2GS_KickGC.Types.EReason.DuplicateLogin;
					user.Send( kickGc, msg => { } );
				}
			}
			else
			{
				//新玩家上线
				user = new CSUser( gcNID, ukey );
				this._ukeyToUser[ukey] = user;
				this._users.Add( user );
				isNew = true;
			}
			//更新所属session
			user.gsSession = gsSession;
			this._gsToUser.AddToList( gsSession, user );
			//设置为已连线
			user.IsConnected = true;
			//更新网络ID
			this._gcNidToUser[gcNID] = user;

			Logger.Info( isNew ? $"user:{gcNID} online" : $"user:{gcNID} reconnect" );
			return user;
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		private void Offline( CSUser user )
		{
			this._gsToUser.RemoveFromList( user.gsSession, user );
			user.IsConnected = false;
			user.gsSession = null;

			//判断是否需要下线
			if ( user.KeepOnline() )
			{
				Logger.Info( $"user:{user.gcNID} lost, but keep online" );
				return;
			}

			//从房间内移除
			CS.instance.matcher.OnUserKicked( user );

			this._gcNidToUser.Remove( user.gcNID );
			this._ukeyToUser.Remove( user.ukey );
			this._users.Remove( user );

			Logger.Info( $"user:{user.gcNID} offline" );
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
		/// 踢走连接到指定gsSsession所有玩家
		/// </summary>
		public void KickUsers( GateSession gsSession )
		{
			if ( !this._gsToUser.TryGetValue( gsSession, out List<CSUser> users ) )
				return;
			int count = users.Count;
			for ( int i = 0; i < count; i++ )
			{
				CSUser user = users[i];
				this.Offline( user );//该方法会清空_gsToUser,不需要额外处理
			}
		}
	}
}