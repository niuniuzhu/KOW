using Core.Misc;
using System.Collections.Generic;
using System.Net.Sockets;

namespace Core.Net
{
	public class WSListener : TCPListener
	{
		private string _scheme = "ws";
		private readonly HashSet<string> _subProtocols = new HashSet<string>();

		public WSListener( uint id ) : base( id )
		{
		}

		public void AddSubProtocol( string protocol ) => this._subProtocols.Add( protocol );

		public bool Start( string scheme, int port )
		{
			this._scheme = scheme;
			return this.Start( port );
		}

		protected override INetSession CreateSession( Socket acceptSocket )
		{
			//调用委托创建session
			INetSession session = this.sessionCreater( ProtoType.WebSocket );
			if ( session == null )
			{
				Logger.Error( "create session failed" );
				this.Close( acceptSocket );
				return null;
			}
			session.isPassive = true;
			WSConnection wsConnection = ( WSConnection )session.connection;
			wsConnection.activeTime = TimeUtils.utcTime;
			wsConnection.scheme = this._scheme;
			wsConnection.subProtocols = this._subProtocols;
			wsConnection.socket = new SocketWrapper( acceptSocket );
			wsConnection.remoteEndPoint = acceptSocket.RemoteEndPoint;
			wsConnection.recvBufSize = this.recvBufSize;
			return session;
		}
	}
}