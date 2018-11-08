using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GateServer
{
	public class GSUserMgr
	{
		private readonly Dictionary<ulong, uint> _gcNIDToSID = new Dictionary<ulong, uint>();

		public int count => this._gcNIDToSID.Count;

		public bool HasClient( ulong gcNID )
		{
			return this._gcNIDToSID.ContainsKey( gcNID );
		}

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

		public string LS()
		{
			StringBuilder sb = new StringBuilder();
			int i = 0;
			foreach ( var kv in this._gcNIDToSID )
			{
				if ( i == this.count - 1 )
					sb.Append( $"{kv.Key}:{kv.Value}" );
				else
					sb.Append( $"{kv.Key}:{kv.Value}, " );
				++i;
			}
			return sb.ToString();
		}
	}
}