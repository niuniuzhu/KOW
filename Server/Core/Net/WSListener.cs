using System.Collections.Generic;
using System.Net.Sockets;

namespace Core.Net
{
	public class WSListener : TCPListener
	{
		private readonly HashSet<string> _subProtocols = new HashSet<string>();
		protected override ProtoType protoType => ProtoType.WebSocket;

		public WSListener( uint id ) : base( id )
		{
		}

		public void AddSubProtocol( string protocol ) => this._subProtocols.Add( protocol );

		protected override TCPConnection CreateConnection( INetSession session, Socket acceptSocket )
		{
			WSConnection wsConnection = ( WSConnection )base.CreateConnection( session, acceptSocket );
			wsConnection.subProtocols = this._subProtocols;
			return wsConnection;
		}
	}
}