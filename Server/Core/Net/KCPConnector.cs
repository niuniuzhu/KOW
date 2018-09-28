using System.Net;
using System.Net.Sockets;
using Core.Misc;

namespace Core.Net
{
	public class KCPConnector : IConnector
	{
		public Socket socket { get; set; }
		public INetSession session { get; }
		public bool connected => this.socket != null && this.socket.Connected;
		public int recvBufSize { get; set; }
		public PacketEncodeHandler packetEncodeHandler { get; set; }
		public PacketDecodeHandler packetDecodeHandler { get; set; }

		private string _ip;
		private int _port;

		public KCPConnector( INetSession session )
		{
			this.session = session;
		}

		public void Dispose()
		{
		}

		public void Close()
		{
			if ( this.connected )
				this.socket.Shutdown( SocketShutdown.Both );
			this.socket.Close();
			this.socket = null;
		}

		public bool Connect( string ip, int port )
		{
			this._ip = ip;
			this._port = port;
			return this.Reconnect();
		}

		public bool Reconnect()
		{
			try
			{
				this.socket = new Socket( AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp );
			}
			catch ( SocketException e )
			{
				Logger.Debug( $"create socket error, code:{e.SocketErrorCode}" );
				return false;
			}
			try
			{
				this.socket.Bind( new IPEndPoint( IPAddress.Any, 0 ) );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket bind at {this._port} fail, code:{e.SocketErrorCode}" );
				return false;
			}
			KCPConnection kcpConnection = ( KCPConnection )this.session.connection;
			kcpConnection.state = KCPConnectionState.Connecting;
			kcpConnection.socket = new SocketWrapper( this.socket );
			kcpConnection.recvBufSize = this.recvBufSize;
			kcpConnection.remoteEndPoint = new IPEndPoint( IPAddress.Parse( this._ip ), this._port );
			kcpConnection.StartReceive();
			kcpConnection.SendHandShake();
			this.socket = null;
			return true;
		}

		private void OnError( string error )
		{
			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.ConnErr;
			netEvent.session = this.session;
			netEvent.error = error;
			NetworkMgr.instance.PushEvent( netEvent );
		}
	}
}