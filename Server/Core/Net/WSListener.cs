using Core.Misc;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;

namespace Core.Net
{
	public class WSListener : TCPListener
	{
		private readonly HashSet<string> _subProtocols = new HashSet<string>();
		private string _scheme = "ws";
		private X509Certificate2 _cert;
		private SslProtocols _sslProtocols;

		public WSListener( uint id ) : base( id )
		{
		}

		public void AddSubProtocol( string protocol ) => this._subProtocols.Add( protocol );

		public bool Start( int port, bool useSSL = false, X509Certificate2 cert = null, SslProtocols sslProtocols = SslProtocols.Tls )
		{
			if ( useSSL && cert == null )
			{
				Logger.Error( "cannot use ssl without a certificate" );
				return false;
			}
			this._scheme = useSSL ? "wss" : "ws";
			this._cert = cert;
			this._sslProtocols = sslProtocols;
			return base.Start( port );
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
			WSConnection wsConnection = ( WSConnection ) session.connection;
			wsConnection.activeTime = TimeUtils.utcTime;
			wsConnection.scheme = this._scheme;
			wsConnection.certificate = this._cert;
			wsConnection.sslProtocols = this._sslProtocols;
			wsConnection.subProtocols = this._subProtocols;
			wsConnection.socket = new SocketWrapper( acceptSocket );
			wsConnection.remoteEndPoint = acceptSocket.RemoteEndPoint;
			wsConnection.recvBufSize = this.recvBufSize;
			wsConnection.Authenticate( () => wsConnection.StartReceive(), e => Logger.Error( e.ToString() ) );
			return session;
		}
	}
}