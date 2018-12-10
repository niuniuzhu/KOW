using System.Collections.Generic;
using System.Net.Sockets;

namespace Core.Net
{
	public class TLSWSListener : TLSListener
	{
		private readonly HashSet<string> _subProtocols = new HashSet<string>();
		protected override ProtoType protoType => ProtoType.WebSocket;

		public TLSWSListener( uint id ) : base( id )
		{
		}

		public void AddSubProtocol( string protocol ) => this._subProtocols.Add( protocol );

		protected override TLSConnection CreateConnection( INetSession session, Socket acceptSocket )
		{
			TLSWSConnection wsConnection = ( TLSWSConnection )base.CreateConnection( session, acceptSocket );
			wsConnection.subProtocols = this._subProtocols;
			return wsConnection;
		}
	}
}