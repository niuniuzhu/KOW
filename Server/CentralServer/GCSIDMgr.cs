using Core.Misc;
using System.Collections.Generic;
using Shared;

namespace CentralServer
{
	public class GCSIDMgr
	{
		private readonly HashSet<ulong> _gcNIDToLogin = new HashSet<ulong>();
		private readonly List<ulong> _gcNIDs = new List<ulong>();
		private readonly List<uint> _ukeys = new List<uint>();
		private readonly List<long> _loginTime = new List<long>();

		public uint GetUKey( ulong gcNID ) => this._ukeys[this._gcNIDs.IndexOf( gcNID )];

		public ErrorCode Add( ulong gcNID, uint ukey )
		{
			if ( !this._gcNIDToLogin.Add( gcNID ) )
			{
				Logger.Warn( $"duplicate gcNID:{gcNID}" );
				return ErrorCode.Failed;
			}
			this._gcNIDs.Add( gcNID );
			this._ukeys.Add( ukey );
			this._loginTime.Add( TimeUtils.utcTime );
			return ErrorCode.Success;
		}

		public bool Remove( ulong gcNID )
		{
			if ( !this._gcNIDToLogin.Remove( gcNID ) )
				return false;
			int pos = this._gcNIDs.IndexOf( gcNID );
			this._gcNIDs.RemoveAt( pos );
			this._ukeys.RemoveAt( pos );
			this._loginTime.RemoveAt( pos );
			return true;
		}

		public bool Check( ulong gcNID ) => this._gcNIDToLogin.Contains( gcNID );

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
				this._gcNIDToLogin.Remove( this._gcNIDs[i] );
				this._gcNIDs.RemoveAt( i );
				this._ukeys.RemoveAt( i );
				this._loginTime.RemoveAt( i );
				--i;
				--count;
			}
		}
	}
}