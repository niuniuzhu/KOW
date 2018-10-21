using System.Collections.Generic;
using System.Linq;

namespace BattleServer
{
	public class BSUserMgr
	{
		private readonly Dictionary<ulong, uint> _gcNIDToSID = new Dictionary<ulong, uint>();

		public bool GetClientSID( ulong gcNID, out uint sid )
		{
			return this._gcNIDToSID.TryGetValue( gcNID, out sid );
		}

		public bool RemoveClient( ulong gcNID )
		{
			return this._gcNIDToSID.Remove( gcNID );
		}

		public void AddClient( ulong gcNID, uint sid )
		{
			this._gcNIDToSID.Add( gcNID, sid );
		}

		public uint[] GetClients()
		{
			return this._gcNIDToSID.Values.ToArray();
		}

		public void ClearClients()
		{
			this._gcNIDToSID.Clear();
		}
	}
}