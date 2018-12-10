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

		public X509Certificate2 certificate;

		protected virtual ProtoType protoType => ProtoType.TCP;

		private TcpListener _socket;

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
			this._socket.Stop();
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
				this._socket = new TcpListener( IPAddress.Any, port );
				this._socket.Server.NoDelay = true;
				this._socket.Start( 32 );
				this._socket.BeginAcceptSocket( this.ProcessAccept, this._socket );
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
			TcpListener socket = ( TcpListener )ar.AsyncState;
			Socket client = null;
			try
			{
				client = socket.EndAcceptSocket( ar );
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

			socket.BeginAcceptSocket( this.ProcessAccept, socket );
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