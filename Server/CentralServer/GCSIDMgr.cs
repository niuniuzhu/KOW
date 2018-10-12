using Core.Misc;
using Google.Protobuf;
using Shared;
using System.Collections.Generic;

namespace CentralServer
{
	public class GCSIDMgr
	{
		private readonly Dictionary<ulong, uint> _gcNIDToUKey = new Dictionary<ulong, uint>();
		private readonly List<ulong> _gcNIDs = new List<ulong>();
		private readonly HashSet<uint> _ukeys = new HashSet<uint>();
		private readonly List<long> _loginTime = new List<long>();

		public uint GetUKey( ulong gcNID ) => this._gcNIDToUKey[gcNID];

		public ErrorCode OnLSLoginSuccess( ulong gcNID, uint ukey )
		{
			ErrorCode errorCode = ErrorCode.Success;
			if ( this._gcNIDToUKey.ContainsKey( gcNID ) )
			{
				Logger.Warn( $"duplicate gcNID:{gcNID}" );
				return ErrorCode.Failed;
			}

			//处理顶号
			if ( this._ukeys.Contains( ukey ) )
			{
				System.Diagnostics.Debug.Assert(
					CS.instance.userMgr.KickUser( gcNID, Protos.CS2GS_KickGC.Types.EReason.DuplicateLogin,
						OnKickUserRet ), $"kick user:{gcNID} failed" );
			}
			else
				HandleLogin();//直接登录

			//gs处理踢出客户端后的回调
			void OnKickUserRet( IMessage message )
			{
				Protos.GS2CS_KickGCRet kickGCRet = ( Protos.GS2CS_KickGCRet ) message;
				if ( kickGCRet.Result != Protos.Global.Types.ECommon.Success )
				{
					Logger.Warn( $"kick user:{gcNID} failed" );
					errorCode = ErrorCode.LoginFailed;
				}
				else
				{
					System.Diagnostics.Debug.Assert( CS.instance.userMgr.UserOffline( gcNID ) == ErrorCode.Success, $"user:{gcNID} offline failed" );
					System.Diagnostics.Debug.Assert( this.Remove( gcNID ), $"remove user:{gcNID} failed" );
					HandleLogin();
				}
			}

			void HandleLogin()
			{
				System.Diagnostics.Debug.Assert( this._gcNIDToUKey.TryAdd( gcNID, ukey ),
					$"user:{gcNID} already login" );
				this._ukeys.Add( ukey );
				this._gcNIDs.Add( gcNID );
				this._loginTime.Add( TimeUtils.utcTime );
			}

			return errorCode;
		}

		public bool Remove( ulong gcNID )
		{
			System.Diagnostics.Debug.Assert( this._gcNIDToUKey.TryGetValue( gcNID, out uint ukey ), $"invalid user:{gcNID}" );
			this._gcNIDToUKey.Remove( gcNID );
			this._ukeys.Remove( ukey );
			int pos = this._gcNIDs.IndexOf( gcNID );
			this._gcNIDs.RemoveAt( pos );
			this._loginTime.RemoveAt( pos );
			return true;
		}

		public bool Check( ulong gcNID ) => this._gcNIDToUKey.ContainsKey( gcNID );

		public void Update()
		{
			//移除超时的session
			long currTime = TimeUtils.utcTime;
			long expTime = CS.instance.config.sessionExpTime;
			int count = this._loginTime.Count;
			for ( int i = 0; i < count; i++ )
			{
				if ( currTime < this._loginTime[i] + expTime )
					continue;
				ulong gcNID = this._gcNIDs[i];
				System.Diagnostics.Debug.Assert( this._gcNIDToUKey.TryGetValue( gcNID, out uint ukey ), $"invalid user:{gcNID}" );
				this._gcNIDToUKey.Remove( gcNID );
				this._ukeys.Remove( ukey );
				this._gcNIDs.RemoveAt( i );
				this._loginTime.RemoveAt( i );
				--i;
				--count;
			}
		}
	}
}