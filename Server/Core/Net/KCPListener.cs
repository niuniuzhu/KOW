using Core.Misc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace Core.Net
{
	public class ReceiveData
	{
		public readonly IPEndPoint remoteEndPoint = new IPEndPoint( IPAddress.Any, 0 );
		public readonly StreamBuffer buffer = new StreamBuffer();

		public void Clear() => this.buffer.Clear();
	}

	public class KCPListener : IListener
	{
		public uint id { get; }
		public SessionCreater sessionCreater { get; set; }

		public int recvBufSize { get; set; } = 10240;

		private Socket _socket;
		private readonly BufferBlock<ReceiveData> _recvDataBuffer = new BufferBlock<ReceiveData>();
		private readonly ThreadSafeObejctPool<ReceiveData> _receiveDataPool = new ThreadSafeObejctPool<ReceiveData>();
		private bool _running;

		public KCPListener( uint id ) => this.id = id;

		public void Dispose() => this.Stop();

		public void SetOpt( SocketOptionName optionName, object opt ) => this._socket.SetSocketOption( SocketOptionLevel.Socket, optionName, opt );

		public bool Start( int port )
		{
			this._running = true;
			Task.Run( action: this.ConsumeAsync );

			Logger.Log( $"Start Listen {port}" );
			try
			{
				this._socket = new Socket( AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"create socket error, code:{e.SocketErrorCode}" );
				return false;
			}
			try
			{
				this._socket.Bind( new IPEndPoint( IPAddress.Any, port ) );
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket bind at {port} fail, code:{e.SocketErrorCode}" );
				return false;
			}
			this.StartReceive( null );
			return true;
		}

		public bool Stop()
		{
			if ( this._socket == null )
				return false;
			if ( this._recvDataBuffer.TryReceiveAll( out IList<ReceiveData> recvDatas ) )
			{
				foreach ( ReceiveData recvData in recvDatas )
				{
					this.HandleRecvDatas( recvData );
					recvDatas.Clear();
					this._receiveDataPool.Push( recvData );
				}
			}
			this._running = false;
			Socket socket = this._socket;
			this._socket = null;
			return this.Close( socket );
		}

		private bool Close( Socket socket )
		{
			if ( socket == null )
				return false;
			if ( socket.Connected )
				socket.Shutdown( SocketShutdown.Both );
			socket.Close();
			return true;
		}

		private void StartReceive( SocketAsyncEventArgs acceptEventArgs )
		{
			if ( this._socket == null )
				return;

			if ( acceptEventArgs == null )
			{
				acceptEventArgs = new SocketAsyncEventArgs { RemoteEndPoint = new IPEndPoint( IPAddress.Any, 0 ) };
				acceptEventArgs.SetBuffer( new byte[this.recvBufSize], 0, this.recvBufSize );
				acceptEventArgs.Completed += this.OnReceiveComplete;
			}

			bool asyncResult;
			try
			{
				asyncResult = this._socket.ReceiveFromAsync( acceptEventArgs );
			}
			catch ( ObjectDisposedException )
			{
				return;
			}
			catch ( SocketException e )
			{
				Logger.Error( $"socket receive fail, code:{e.SocketErrorCode}" );
				this.Close( this._socket );
				return;
			}
			if ( !asyncResult )
				this.ProcessReceive( acceptEventArgs );
		}

		private void OnReceiveComplete( object sender, SocketAsyncEventArgs acceptEventArgs ) => this.ProcessReceive( acceptEventArgs );

		private void ProcessReceive( SocketAsyncEventArgs recvEventArgs )
		{
			do
			{
				if ( recvEventArgs.SocketError != SocketError.Success )
				{
					//网络错误
					Logger.Error( $"receive error, remote endpoint:{recvEventArgs.RemoteEndPoint}, code:{recvEventArgs.SocketError}" );
					break;
				}

				if ( this._socket == null )
					break;

				int size = recvEventArgs.BytesTransferred;
				if ( size < ProtoConfig.SIZE_OF_HEAD )
					break;

				ReceiveData receiveData = this._receiveDataPool.Pop();
				receiveData.buffer.Write( recvEventArgs.Buffer, recvEventArgs.Offset, size );
				receiveData.remoteEndPoint.Address = ( ( IPEndPoint )recvEventArgs.RemoteEndPoint ).Address;
				receiveData.remoteEndPoint.Port = ( ( IPEndPoint )recvEventArgs.RemoteEndPoint ).Port;
				this._recvDataBuffer.Post( receiveData );
			} while ( false );
			this.StartReceive( recvEventArgs );
		}

		private async void ConsumeAsync()
		{
			while ( this._running )
				this.HandleRecvDatas( await this._recvDataBuffer.ReceiveAsync() );
		}

		private void HandleRecvDatas( ReceiveData recvData )
		{
			byte[] data = recvData.buffer.GetBuffer();
			const int offset = 0;
			int size = recvData.buffer.length;

			uint connID = ByteUtils.Decode32u( data, offset );
			ushort signature = ByteUtils.Decode16u( data, offset + sizeof( uint ) + sizeof( byte ) + sizeof( byte ) );

			//验证握手消息
			if ( connID == ProtoConfig.INVALID_SESSION_ID && signature == ProtoConfig.HANDSHAKE_SIGNATURE )
			{
				//调用委托创建session
				INetSession session = this.sessionCreater( ProtoType.KCP );
				if ( session == null )
					Logger.Error( "create session failed" );
				else
				{
					session.isPassive = true;
					KCPConnection kcpConnection = ( KCPConnection )session.connection;
					kcpConnection.socket = new SocketWrapper( this._socket );
					kcpConnection.isRefSocket = true;
					kcpConnection.remoteEndPoint = recvData.remoteEndPoint;
					kcpConnection.recvBufSize = this.recvBufSize;
					kcpConnection.activeTime = TimeUtils.utcTime;
					kcpConnection.state = KCPConnectionState.Connected;

					NetEvent netEvent = NetworkMgr.instance.PopEvent();
					netEvent.type = NetEvent.Type.Establish;
					netEvent.session = session;
					NetworkMgr.instance.PushEvent( netEvent );

					kcpConnection.SendHandShakeAck();
					kcpConnection.StartPing();
				}
			}
			else
			{
				INetSession session = NetworkMgr.instance.GetSession( connID );
				if ( session == null )
					Logger.Error( $"get session failed with id:{connID}" );
				else
					( ( KCPConnection )session.connection ).SendDataToMainThread( data, offset, size );
			}
			recvData.Clear();
			this._receiveDataPool.Push( recvData );
		}
	}
}