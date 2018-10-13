using Core.Misc;
using Shared;
using System.Collections.Generic;

namespace CentralServer
{
	class CSID
	{
		public ulong gcNID;
		public uint ukey;
		public long loginTime;
		public bool isOnline;

		public CSID( ulong gcNID, uint ukey, long loginTime, bool isOnline )
		{
			this.gcNID = gcNID;
			this.ukey = ukey;
			this.loginTime = loginTime;
			this.isOnline = isOnline;
		}
	}

	public class GCSIDMgr
	{
		private const int NUM_EXPIRE_CHECK_PER_UPDATE = 100;//每次心跳检测的客户端登陆超时数量

		private readonly Dictionary<ulong, CSID> _gcNIDs = new Dictionary<ulong, CSID>();
		private readonly Dictionary<uint, CSID> _gcUKeys = new Dictionary<uint, CSID>();
		private readonly List<CSID> _notOnline = new List<CSID>();

		public uint GetUKey( ulong gcNID ) => this._gcNIDs[gcNID].ukey;

		public ulong GetGCNID( uint ukey ) => this._gcUKeys[ukey].gcNID;

		public bool Check( ulong gcNID ) => this._gcNIDs.ContainsKey( gcNID );

		public bool Check( uint ukey ) => this._gcUKeys.ContainsKey( ukey );

		private int _lastCheckCount;

		public ErrorCode OnLSLoginSuccess( ulong gcNID, uint ukey )
		{
			ErrorCode errorCode = ErrorCode.Success;
			if ( this._gcNIDs.ContainsKey( gcNID ) )
			{
				Logger.Warn( $"duplicate gcNID:{gcNID}" );
				return ErrorCode.DuplicateGCNID;
			}
			//处理顶号
			if ( this._gcUKeys.ContainsKey( ukey ) )
			{
				//由于gs和cs的客户端数据不同步,所以只需要各自管理就可以
				//这里无需等待回调就马上移除客户端数据
				System.Diagnostics.Debug.Assert(
					CS.instance.userMgr.KickUser( gcNID, Protos.CS2GS_KickGC.Types.EReason.DuplicateLogin ),
					$"kick user:{gcNID} failed" );
				//玩家下线
				CS.instance.userMgr.UserOffline( gcNID );
				//移除客户端数据
				this.Remove( gcNID );
			}
			CSID csid = new CSID( gcNID, ukey, TimeUtils.utcTime, false );
			this._gcNIDs[gcNID] = csid;
			this._gcUKeys[ukey] = csid;
			this._notOnline.Add( csid );
			return errorCode;
		}

		public bool Remove( ulong gcNID )
		{
			if ( !this._gcNIDs.TryGetValue( gcNID, out CSID csid ) )
				return false;
			this._gcNIDs.Remove( gcNID );
			this._gcUKeys.Remove( csid.ukey );
			this._notOnline.Remove( csid );
			return true;
		}

		public void Update()
		{
			//移除超时的session
			long currTime = TimeUtils.utcTime;
			long expTime = CS.instance.config.sessionExpTime;
			foreach ( KeyValuePair<ulong, CSID> kv in this._gcNIDs )
			{
				
			}
			int count = this._loginTime.Count;
			for ( int i = 0; i < count; i++ )
			{
				if ( currTime < this._loginTime[i] + expTime )
					continue;
				ulong gcNID = this._gcUKeys[i];
				System.Diagnostics.Debug.Assert( this._gcNIDs.TryGetValue( gcNID, out uint ukey ), $"invalid user:{gcNID}" );
				this._gcNIDs.Remove( gcNID );
				this._ukeys.Remove( ukey );
				this._gcUKeys.RemoveAt( i );
				this._loginTime.RemoveAt( i );
				--i;
				--count;
			}
		}
	}
}