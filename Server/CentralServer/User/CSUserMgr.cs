using Core.Misc;
using Google.Protobuf;
using System.Collections.Generic;
using CentralServer.Net;

namespace CentralServer.User
{
	public class CSUserMgr
	{
		private readonly Dictionary<uint, CSUser> _ukeyToUser = new Dictionary<uint, CSUser>();
		private readonly Dictionary<ulong, CSUser> _gcNidToUser = new Dictionary<ulong, CSUser>();
		private readonly Dictionary<uint, List<CSUser>> _gsToUser = new Dictionary<uint, List<CSUser>>();
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

			//检查玩家是否还在内存中
			CSUser user = this.GetUser( ukey );
			if ( user != null )
			{
				//检查玩家是否已连接
				if ( user.isConnected )
				{
					//顶号

					Logger.Info( $"user:{user.gcNID} was covered" );

					//通知gc玩家被踢下线
					Protos.CS2GS_KickGC kickGc = ProtoCreator.Q_CS2GS_KickGC();
					kickGc.GcNID = user.gcNID;
					kickGc.Reason = Protos.CS2GS_KickGC.Types.EReason.DuplicateLogin;
					gsSession.Send( kickGc, msg =>
					{
						//让前玩家下线,这里可能无法下线
						bool result = this.Offline( user );
						user = CreateUser( result ? null : user );
					} );
				}
				else
				{
					//玩家未连接,但在线
					user = CreateUser( user );
				}
			}
			else
				user = CreateUser( null );

			return user;

			CSUser CreateUser( CSUser inputUser )
			{
				bool isNew = false;
				if ( inputUser == null )
				{
					//新玩家上线
					inputUser = new CSUser( ukey );
					this._ukeyToUser[ukey] = inputUser;
					this._users.Add( inputUser );
					isNew = true;
				}
				//更新网络ID
				inputUser.gcNID = gcNID;
				//更新所属session
				inputUser.gsSID = gsSession.id;
				this._gsToUser.AddToList( gsSession.id, inputUser );
				//设置为已连线
				inputUser.isConnected = true;
				//更新网络ID
				this._gcNidToUser[gcNID] = inputUser;

				Logger.Info( isNew ? $"user:{gcNID} online" : $"user:{gcNID} reconnect" );
				return inputUser;
			}
		}

		/// <summary>
		/// 玩家下线
		/// </summary>
		public bool Offline( CSUser user )
		{
			this._gsToUser.RemoveFromList( user.gsSID, user );
			user.isConnected = false;
			user.gsSID = 0;

			//从房间内移除
			CS.instance.matcher.OnUserKicked( user );

			//判断是否需要下线
			if ( user.KeepOnline() )
			{
				Logger.Info( $"user:{user.gcNID} lost, but keep online" );
				return false;
			}

			this._gcNidToUser.Remove( user.gcNID );
			this._ukeyToUser.Remove( user.ukey );
			this._users.Remove( user );

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
		/// 踢走连接到指定gsSsession所有玩家
		/// </summary>
		public void KickUsers( uint gsSID )
		{
			if ( !this._gsToUser.TryGetValue( gsSID, out List<CSUser> users ) )
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