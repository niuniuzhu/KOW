using Core.Misc;
using Shared;
using System.Collections.Generic;

namespace CentralServer
{
	class CSID
	{
		public readonly ulong gcNID;
		public readonly uint ukey;
		public readonly long loginTime;

		public CSID( ulong gcNID, uint ukey, long loginTime )
		{
			this.gcNID = gcNID;
			this.ukey = ukey;
			this.loginTime = loginTime;
		}
	}

	public class GCSIDMgr
	{
		private readonly Dictionary<ulong, CSID> _gcNIDs = new Dictionary<ulong, CSID>();
		private readonly Dictionary<uint, CSID> _gcUKeys = new Dictionary<uint, CSID>();
		private readonly List<CSID> _csids = new List<CSID>();

		public uint GetUKey( ulong gcNID ) => this._gcNIDs[gcNID].ukey;

		public ulong GetGCNID( uint ukey ) => this._gcUKeys[ukey].gcNID;

		public bool Check( ulong gcNID ) => this._gcNIDs.ContainsKey( gcNID );

		public bool Check( uint ukey ) => this._gcUKeys.ContainsKey( ukey );

		public ErrorCode OnLSLoginSuccess( ulong gcNID, uint ukey )
		{
			ErrorCode errorCode = ErrorCode.Success;
			if ( this._gcNIDs.ContainsKey( gcNID ) )
			{
				Logger.Warn( $"duplicate gcNID:{gcNID}" );
				return ErrorCode.DuplicateGCNID;
			}
			CSID csid = new CSID( gcNID, ukey, TimeUtils.utcTime );
			this._gcNIDs[gcNID] = csid;
			this._gcUKeys[ukey] = csid;
			this._csids.Add( csid );
			return errorCode;
		}

		public bool Remove( ulong gcNID )
		{
			if ( !this._gcNIDs.TryGetValue( gcNID, out CSID csid ) )
			{
				Logger.Warn( $"invalid gcNID:{gcNID} to remove" );
				return false;
			}
			this._gcNIDs.Remove( gcNID );
			this._gcUKeys.Remove( csid.ukey );
			this._csids.Remove( csid );
			return true;
		}

		public void Update()
		{
			long currTime = TimeUtils.utcTime;
			long expTime = CS.instance.config.sessionExpTime;
			for ( int i = 0, count = this._csids.Count; i < count; ++i )
			{
				CSID csid = this._csids[i];
				if ( currTime < csid.loginTime + expTime )
					continue;
				//移除超时
				this._gcNIDs.Remove( csid.gcNID );
				this._gcUKeys.Remove( csid.ukey );
				this._csids.RemoveAt( i );
				--i;
				--count;
			}
		}
	}
}