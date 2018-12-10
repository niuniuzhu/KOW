using Core.Misc;
using Core.Structure;
using System;
using System.Net;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;

namespace Core.Net
{
	public class TLSConnection : IConnection
	{
		public ISocketWrapper socket { get; set; }
		public EndPoint remoteEndPoint { get; set; }
		public INetSession session { get; }
		public int recvBufSize
		{
			set
			{
				if ( value == this._receBufSize )
					return;
				this._receBufSize = value;
				this.OnRecvBufSizeChanged();
			}
			get => this._receBufSize;
		}

		public bool connected => this.socket != null && this.socket.Connected;
		public long activeTime { get; set; }
		public X509Certificate2 certificate { get; set; }

		private readonly StreamBuffer _cache;
		protected readonly SwitchQueue<StreamBuffer> _sendQueue = new SwitchQueue<StreamBuffer>();
		protected readonly ThreadSafeObjectPool<StreamBuffer> _bufferPool = new ThreadSafeObjectPool<StreamBuffer>( 10, 5 );

		private int _receBufSize = 1024;
		private byte[] _buffer;

		public TLSConnection( INetSession session )
		{
			this.session = session;
			this._cache = new StreamBuffer( this.recvBufSize );
		}

		public void Dispose()
		{
		}

		public virtual void Close()
		{
			if ( this.socket == null )
				return;
			if ( this.connected )
			{
				try
				{
					this.socket.Shutdown( SocketShutdown.Both );
				}
				catch ( SocketException e )
				{
					Logger.Error( e.ToString() );
				}
			}
			this.socket.Close();
			this.socket = null;
			this.remoteEndPoint = null;
			this.activeTime = 0;
			this._sendQueue.Clear();
		}

		private void OnRecvBufSizeChanged()
		{
			this._buffer = new byte[this._receBufSize];
			this._cache.capacity = this._receBufSize;
		}

		public virtual bool Send( byte[] data, int offset, int size )
		{
			if ( this.socket == null || !this.connected )
				return false;
			StreamBuffer buffer = this._bufferPool.Pop();
			//写入数据长度
			buffer.Write( ( ushort )( size + TCPMsgEncoder.LENGTH_SIZE ) );
			buffer.Write( data, offset, size );
			this._sendQueue.Push( buffer );
			return true;
		}

		public void StartReceive()
		{
			try
			{
				this.socket.BeginAuthenticate( this.certificate, this.ProcessAuthentication );
			}
			catch ( AuthenticationException e )
			{
				this.OnError( $"authenticate error, code:{e} " );
			}
		}

		private void ProcessAuthentication( IAsyncResult ar )
		{
			try
			{
				this.socket.BeginReceive( this._buffer, 0, this._buffer.Length, this.ProcessReceive );
			}
			catch ( Exception e )
			{
				this.OnError( $"socket start receive error, code:{e} " );
			}
		}

		private void ProcessReceive( IAsyncResult ar )
		{
			TLSSocketWrapper socket = ( TLSSocketWrapper )ar.AsyncState;
			int size = 0;
			try
			{
				size = socket.EndReceive( ar );
			}
			catch ( Exception e )
			{
				this.OnError( $"socket receive error, code:{e} " );
				return;
			}
			if ( size <= 0 )
			{
				//远端可能已经关闭连接
				this.OnError( $"remote:{this.remoteEndPoint} shutdown, code:{SocketError.NoData}" );
				return;
			}
			//写入缓冲区
			this._cache.Write( this._buffer, 0, size );
			//处理数据
			this.ProcessData( this._cache );

			socket.BeginReceive( this._buffer, 0, this._buffer.Length, this.ProcessReceive );
		}

		protected virtual void ProcessData( StreamBuffer cache )
		{
			while ( true )
			{
				if ( cache.length == 0 )
					break;

				//解码数据,返回解码后的数据长度
				//完成解码后数据的包头(整个数据的长度)已经被剥离
				int len = TCPMsgEncoder.Decode( cache.GetBuffer(), 0, cache.length, out byte[] data );
				if ( data == null )
					break;

				//截断当前缓冲区
				cache.Strip( len, cache.length - len );

				NetEvent netEvent = NetworkMgr.instance.PopEvent();
				netEvent.type = NetEvent.Type.Recv;
				netEvent.session = this.session;
				netEvent.data = data;
				NetworkMgr.instance.PushEvent( netEvent );
			}
		}

		public void Update( UpdateContext updateContext )
		{
			this.ProcessSendQueue();
		}

		private void ProcessSendQueue()
		{
			this._sendQueue.Switch();
			while ( !this._sendQueue.isEmpty )
			{
				StreamBuffer buffer = this._sendQueue.Pop();
				if ( !this.connected )
				{
					this._bufferPool.Push( buffer );
					continue;
				}
				try
				{
					this.socket.BeginSend( buffer.GetBuffer(), 0, buffer.length, this.ProcessSend );
				}
				catch ( SocketException e )
				{
					this.OnError( $"socket start send error, code:{e.SocketErrorCode}" );
					this._bufferPool.Push( buffer );
					continue;
				}

				this._bufferPool.Push( buffer );
			}
		}

		private void ProcessSend( IAsyncResult ar )
		{
			TLSSocketWrapper socket = ( TLSSocketWrapper )ar.AsyncState;
			try
			{
				socket.EndSend( ar );
			}
			catch ( Exception e )
			{
				this.OnError( $"socket send error, code:{e.ToString()}" );
				return;
			}

			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Send;
			netEvent.session = this.session;
			NetworkMgr.instance.PushEvent( netEvent );
		}

		public void OnHeartBeat( long dt )
		{
		}

		private void OnError( string error )
		{
			NetEvent netEvent = NetworkMgr.instance.PopEvent();
			netEvent.type = NetEvent.Type.Error;
			netEvent.session = this.session;
			netEvent.error = error;
			NetworkMgr.instance.PushEvent( netEvent );
		}
	}
}