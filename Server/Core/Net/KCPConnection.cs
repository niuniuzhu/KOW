using Core.Misc;
using Core.Structure;
using System;
using System.Net;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;

namespace Core.Net
{
	public enum KCPConnectionState
	{
		Disconnect,
		Connecting,
		Connected
	}

	public enum DataTransType
	{
		Direct,
		KCP
	}

	public class KCPConnection : IConnection
	{
		public ISocketWrapper socket { get; set; }
		/// <summary>
		/// 是否一个引用的socket
		/// </summary>
		public bool isRefSocket { private get; set; }
		public EndPoint remoteEndPoint
		{
			get => this._recvEventArgs.RemoteEndPoint;
			set
			{
				this._sendEventArgs.RemoteEndPoint = value;
				this._recvEventArgs.RemoteEndPoint = value;
			}
		}
		public INetSession session { get; }
		public int recvBufSize { set => this._recvEventArgs.SetBuffer( new byte[value], 0, value ); }

		public X509Certificate2 certificate { get; set; }
		public SslProtocols sslProtocols { get; set; }
		public bool isSecure => this.certificate != null;

		/// <summary>
		/// 连接状态
		/// </summary>
		internal KCPConnectionState state;
		internal long activeTime;

		private uint _connID;
		private readonly KCPProxy _kcpProxy;
		private readonly SocketAsyncEventArgs _sendEventArgs;
		private readonly SocketAsyncEventArgs _recvEventArgs;
		private Scheduler _pingWorker;
		private readonly SwitchQueue<StreamBuffer> _sendQueue = new SwitchQueue<StreamBuffer>();
		private readonly SwitchQueue<StreamBuffer> _recvQueue = new SwitchQueue<StreamBuffer>();
		private readonly ThreadSafeObjectPool<StreamBuffer> _bufferPool = new ThreadSafeObjectPool<StreamBuffer>( 10, 5 );

		public KCPConnection( INetSession session )
		{
			this.session = session;
			this._connID = this.session.id;
			this._kcpProxy = new KCPProxy( this.OnKCPOutout );
			this._sendEventArgs = new SocketAsyncEventArgs { UserToken = this };
			this._recvEventArgs = new SocketAsyncEventArgs { UserToken = this };
			this._sendEventArgs.Completed += this.OnIOComplete;
			this._recvEventArgs.Completed += this.OnIOComplete;
		}

		public void Dispose()
		{
			this._sendEventArgs.Completed -= this.OnIOComplete;
			this._recvEventArgs.Completed -= this.OnIOComplete;
			this._sendEventArgs.Dispose();
			this._recvEventArgs.Dispose();
			this._kcpProxy.Dispose();
		}

		public void Close()
		{
			this.Flush( long.MaxValue );
			if ( this.socket == null )
				return;

			if ( !this.isRefSocket )
				this.socket.Close();
			this.socket = null;

			if ( this._pingWorker != null )
			{
				this._pingWorker.Stop();
				this._pingWorker = null;
			}
			this._sendQueue.Clear();
			this._recvQueue.Clear();
			this._kcpProxy.Release();
			this._connID = 0;
			this.state = KCPConnectionState.Disconnect;
			this.activeTime = 0;

		}

		private void OnError( string error )
		{
			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Error;
			netEvent.session = this.session;
			netEvent.error = error;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		private void OnKCPOutout( byte[] data, int size )
		{
			byte[] sdata = new byte[size + sizeof( byte ) + ProtoConfig.SIZE_OF_SESSION_ID];
			int offset = ByteUtils.Encode32u( sdata, 0, this._connID );//connID
			offset += ByteUtils.Encode8u( sdata, offset, 0x80 );//kcp传输 1<<7
			Buffer.BlockCopy( data, 0, sdata, offset, size );
			offset += size;
			this.SendDirect( sdata, 0, offset );
		}

		public bool Send( byte[] data, int offset, int size )
		{
			if ( this.socket == null )
				return false;
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.data = DataTransType.KCP;
			buffer.Write( ( byte )0 );//非内部协议 0<<7
			buffer.Write( data, offset, size );
			this._sendQueue.Push( buffer );
			return true;
		}

		private bool SendDirect( byte[] data, int offset, int size )
		{
			this._sendEventArgs.SetBuffer( data, offset, size );
			bool asyncResult;
			try
			{
				asyncResult = this.socket.SendToAsync( this._sendEventArgs );
			}
			catch ( ObjectDisposedException )
			{
				return false;
			}
			catch ( SocketException e )
			{
				this.OnError( $"socket send error, code:{e.SocketErrorCode} " );
				return false;
			}
			if ( !asyncResult )
				this.ProcessSend( this._sendEventArgs );
			return true;
		}

		public void StartReceive()
		{
			if ( this.socket == null )
				return;
			bool asyncResult;
			try
			{
				asyncResult = this.socket.ReceiveFromAsync( this._recvEventArgs );
			}
			catch ( SocketException e )
			{
				this.OnError( $"socket receive error, code:{e.SocketErrorCode} " );
				return;
			}
			if ( !asyncResult )//有一个挂起的IO操作需要马上处理
				this.ProcessReceive( this._recvEventArgs );
		}

		private void OnIOComplete( object sender, SocketAsyncEventArgs asyncEventArgs )
		{
			switch ( asyncEventArgs.LastOperation )
			{
				case SocketAsyncOperation.ReceiveFrom:
					this.ProcessReceive( asyncEventArgs );
					break;

				case SocketAsyncOperation.SendTo:
					this.ProcessSend( asyncEventArgs );
					break;
			}
		}

		private void ProcessSend( SocketAsyncEventArgs sendEventArgs )
		{
			if ( sendEventArgs.SocketError != SocketError.Success )
			{
				//网络错误
				this.OnError( $"socket send error, code:{sendEventArgs.SocketError}" );
				return;
			}

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Send;
			netEvent.session = this.session;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		private void ProcessReceive( SocketAsyncEventArgs recvEventArgs )
		{
			if ( recvEventArgs.SocketError != SocketError.Success )
			{
				//网络错误
				this.OnError( $"receive error, remote endpoint:{this.remoteEndPoint}, code:{recvEventArgs.SocketError}" );
				return;
			}
			int size = recvEventArgs.BytesTransferred;
			if ( size == 0 )
			{
				//远端可能已经关闭连接
				this.OnError( $"Receive zero bytes, remote endpoint: {this.remoteEndPoint}, code:{SocketError.NoData}" );
				return;
			}
			if ( size >= ProtoConfig.SIZE_OF_HEAD )
			{
				byte[] data = recvEventArgs.Buffer;
				int offset = recvEventArgs.Offset;
				this.SendDataToMainThread( data, offset, size );
			}
			this.StartReceive();
		}

		/// <summary>
		/// 把数据发送到主线程处理
		/// </summary>
		public void SendDataToMainThread( byte[] data, int offset, int size )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( data, offset, size );
			this._recvQueue.Push( buffer );
		}

		/// <summary>
		/// 处理回应握手消息
		/// </summary>
		private void ProcessNonKCPData( byte[] data, int offset, int size )
		{
			//跳过控制码
			offset += sizeof( byte );
			uint connID = 0;
			if ( VerifyHandshakeAck( data, ref offset, ref size, ref connID ) )
			{
				this._connID = connID;
				this.state = KCPConnectionState.Connected;

				NetEvent netEvent = NetworkMgr.instance.PopEvent();
				netEvent.type = NetEvent.Type.Establish;
				netEvent.session = this.session;
				NetworkMgr.instance.PushEvent( netEvent );
			}
			else if ( IsPingTimeout( data, offset, size ) )
				this.OnError( "timeout" );
		}

		/// <summary>
		/// 处理KCP传输的数据(主线程)
		/// </summary>
		private void ProcessKCPData( byte[] data )
		{
			bool isInternal = data[0] >> 7 > 0; //是否内部协议
			const int offset = sizeof( byte );
			int size = data.Length - offset;
			if ( isInternal )
			{
				if ( IsPing( data, offset, size ) )
					this.SendPong();

				if ( IsPong( data, offset, size ) )
					this.activeTime = TimeUtils.utcTime;
			}
			else
			{
				NetEvent netEvent = NetworkMgr.instance.PopEvent();
				netEvent.type = NetEvent.Type.Recv;
				netEvent.session = this.session;
				netEvent.data = data;
				NetworkMgr.instance.PushEvent( netEvent );
			}
		}

		/// <summary>
		/// 开始ping远程连接,通常由监听者调用
		/// </summary>
		public void StartPing()
		{
			this._pingWorker = new Scheduler();
			this._pingWorker.Start( ProtoConfig.PING_INTERVAL, ( count ) => this.SendPing(), true );
		}

		private void SendPing()
		{
			if ( this.socket == null )
				return;
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.data = DataTransType.KCP;
			buffer.Write( ( byte )0x80 );//是内部协议 1<<7
			buffer.Write( ProtoConfig.PING_SIGNATURE );
			this._sendQueue.Push( buffer );
		}

		private void SendPong()
		{
			if ( this.socket == null )
				return;
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.data = DataTransType.KCP;
			buffer.Write( ( byte )0x80 );//是内部协议 1<<7
			buffer.Write( ProtoConfig.PONG_SIGNATURE );
			this._sendQueue.Push( buffer );
		}

		/// <summary>
		/// 发送握手消息
		/// </summary>
		public void SendHandShake()
		{
			if ( this.socket == null )
				return;
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.data = DataTransType.Direct;
			buffer.Write( ( uint )0 );//connID
			buffer.Write( ( byte )0 );//非kcp传输
			buffer.Write( ( byte )0x80 );//是内部协议 1<<7
			buffer.Write( ProtoConfig.HANDSHAKE_SIGNATURE );
			this._sendQueue.Push( buffer );
		}

		/// <summary>
		/// 发送握手回应消息
		/// </summary>
		public void SendHandShakeAck()
		{
			if ( this.socket == null )
				return;
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.data = DataTransType.Direct;
			buffer.Write( ( uint )0 );//connID
			buffer.Write( ( byte )0 );//非kcp传输
			buffer.Write( ( byte )0x80 );//是内部协议 1<<7
			buffer.Write( ProtoConfig.HANDSHAKE_ACK_SIGNATURE );
			buffer.Write( this.session.id );
			this._sendQueue.Push( buffer );
		}

		private void NotifyClose()
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.data = DataTransType.Direct;
			buffer.Write( ( uint )0 );//connID
			buffer.Write( ( byte )0 );//非kcp传输
			buffer.Write( ( byte )0x80 );//是内部协议 1<<7
			buffer.Write( ProtoConfig.TIMEOUT_SIGNATURE );
			this.SendDirect( buffer.GetBuffer(), 0, buffer.length );
			this._bufferPool.Push( buffer );
		}

		private static bool VerifyHandshakeAck( byte[] data, ref int offset, ref int size, ref uint connID )
		{
			int mOffset = offset;

			ushort signature = 0;
			mOffset += ByteUtils.Decode16u( data, mOffset, ref signature );
			if ( signature != ProtoConfig.HANDSHAKE_ACK_SIGNATURE )
				return false;

			mOffset += ByteUtils.Decode32u( data, mOffset, ref connID );
			if ( connID == ProtoConfig.INVALID_SESSION_ID )
				return false;

			offset = mOffset;
			size -= mOffset;

			return true;
		}

		private static bool IsPing( byte[] data, int offset, int size )
		{
			if ( size < ProtoConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = 0;
			ByteUtils.Decode16u( data, offset, ref signature );
			if ( signature != ProtoConfig.PING_SIGNATURE )
				return false;

			return true;
		}

		private static bool IsPong( byte[] data, int offset, int size )
		{
			if ( size < ProtoConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = 0;
			ByteUtils.Decode16u( data, offset, ref signature );
			if ( signature != ProtoConfig.PONG_SIGNATURE )
				return false;

			return true;
		}

		private static bool IsPingTimeout( byte[] data, int offset, int size )
		{
			if ( size < ProtoConfig.SIZE_OF_SIGNATURE )
				return false;

			ushort signature = 0;
			ByteUtils.Decode16u( data, offset, ref signature );
			if ( signature != ProtoConfig.TIMEOUT_SIGNATURE )
				return false;

			return true;
		}

		public void Update( UpdateContext updateContext )
		{
			this.Flush( updateContext.deltaTime );
		}

		private void Flush( long dt )
		{
			//process sendqueue
			this._sendQueue.Switch();
			while ( !this._sendQueue.isEmpty )
			{
				StreamBuffer buffer = this._sendQueue.Pop();

				DataTransType dataTransType = ( DataTransType )buffer.data;
				switch ( dataTransType )
				{
					case DataTransType.Direct:
						this.SendDirect( buffer.GetBuffer(), 0, buffer.length );
						break;

					case DataTransType.KCP:
						this._kcpProxy.Send( buffer.GetBuffer(), 0, buffer.length );
						break;
				}
				this._bufferPool.Push( buffer );
			}

			//process recequeue
			this._recvQueue.Switch();
			while ( !this._recvQueue.isEmpty )
			{
				StreamBuffer buffer = this._recvQueue.Pop();

				byte[] data = buffer.GetBuffer();
				int offset = 0;
				int size = buffer.length;

				uint transConnID = 0;
				int mOffset = ByteUtils.Decode32u( data, offset, ref transConnID );
				offset += mOffset;
				size -= mOffset;

				bool isKCPTrans = data[offset] >> 7 > 0;
				offset += sizeof( byte );
				size -= sizeof( byte );

				if ( isKCPTrans )
					this._kcpProxy.ProcessData( data, offset, size, this.ProcessKCPData );
				else
					this.ProcessNonKCPData( data, offset, size );

				this._bufferPool.Push( buffer );
			}
			//update kcp
			this._kcpProxy.Update( dt );
		}

		private void CheckActive()
		{
			//只有Listener创建的session才会主动检测
			if ( !this.session.isPassive )
				return;
			if ( TimeUtils.utcTime < this.activeTime + ProtoConfig.PING_TIMEOUT )
				return;
			this.NotifyClose();
			this.session.Close( true, "ping timeout" );
		}

		public void OnHeartBeat( long dt )
		{
			switch ( this.state )
			{
				case KCPConnectionState.Connected:
					this._pingWorker?.Update( dt );
					this.CheckActive();
					break;
			}
		}
	}
}