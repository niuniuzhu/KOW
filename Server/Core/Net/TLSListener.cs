using Core.Misc;
using System;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography.X509Certificates;

namespace Core.Net
{
	public class TLSListener : IListener
	{
		public event SessionCreatedHandler OnSessionCreated;

		public uint id { get; }
		public SessionCreater sessionCreater { get; set; }
		public int recvBufSize { get; set; }

        public bool noDelay
        {
            get => this._socket.NoDelay;
            set => this._socket.NoDelay = value;
        }

        public X509Certificate2 certificate;

		protected virtual ProtoType protoType => ProtoType.TCP;

		private Socket _socket;

		public TLSListener( uint id ) => this.id = id;

		public void Close( Socket client )
		{
			if ( client.Connected )
				client.Shutdown( SocketShutdown.Both );
			client.Close();
		}

		public void Dispose() => this.Stop();

		public bool Stop()
		{
			if ( this._socket == null )
				return false;
            if ( this._socket.Connected)
			    this._socket.Shutdown(SocketShutdown.Both);
            this._socket.Close();
			this._socket = null;
			return true;
		}

		public bool Start( int port )
		{
			if ( this.certificate == null )
				throw new Exception( "certificate is null" );

			Logger.Log( $"listen port: {port}" );
            try
            {
                this._socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.IP);
            }
            catch (SocketException e)
            {
                Logger.Error($"create socket error, code:{e.SocketErrorCode}");
                return false;
            }
            this.noDelay = true;
            try
            {
                this._socket.Bind(new IPEndPoint(IPAddress.Any, port));
            }
            catch (SocketException e)
            {
                Logger.Error($"socket bind at {port} fail, code:{e.SocketErrorCode}");
                return false;
            }
            try
            {
                this._socket.Listen(32);
            }
            catch (SocketException e)
            {
                Logger.Error($"socket listen at {port} fail, code:{e.SocketErrorCode}");
                return false;
            }
            try
            { 
                this._socket.BeginAccept( this.ProcessAccept, this._socket );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"create socket error, code:{e.SocketErrorCode}" );
				return false;
			}
			return true;
		}

		private void ProcessAccept( IAsyncResult ar )
		{
			Socket socket = (Socket)ar.AsyncState;
			Socket client = null;
			try
			{
				client = socket.EndAccept( ar );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket accept fail, code:{e.SocketErrorCode}" );
				if ( client != null )
					this.Close( client );
				return;
			}

			INetSession session = this.CreateSession( client );
			this.OnSessionCreated?.Invoke( session );

			socket.BeginAccept( this.ProcessAccept, socket );
		}

		protected virtual INetSession CreateSession( Socket client )
		{
			//调用委托创建session
			INetSession session = this.sessionCreater( this.protoType, this.certificate );
			if ( session == null )
			{
				Logger.Error( "create session failed" );
				this.Close( client );
				return null;
			}
			session.isPassive = true;

			TLSConnection connection = this.CreateConnection( session, client );

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Establish;
			netEvent.session = session;
			NetworkMgr.instance.PushEvent( netEvent );

			connection.StartReceive();

			return session;
		}

		protected virtual TLSConnection CreateConnection( INetSession session, Socket client )
		{
			TLSConnection tcpConnection = ( TLSConnection )session.connection;
			tcpConnection.activeTime = TimeUtils.utcTime;
			tcpConnection.socket = new TLSSocketWrapper( client );
			tcpConnection.remoteEndPoint = client.RemoteEndPoint;
			tcpConnection.recvBufSize = this.recvBufSize;
			return tcpConnection;
		}
	}
}