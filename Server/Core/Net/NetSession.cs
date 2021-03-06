﻿using System;
using System.Security.Cryptography.X509Certificates;

namespace Core.Net
{
	public abstract class NetSession : INetSession
	{
		protected enum State
		{
			Close,
			Connecting,
			Connected
		}

		public uint id { get; }
		public IConnection connection { get; }
		public bool isPassive { get; set; }

		protected State _state;

		protected NetSession( uint id, ProtoType type, X509Certificate2 certificate )
		{
			this.id = id;
			switch ( type )
			{
				case ProtoType.TCP:
					if ( certificate != null )
					{
						TLSConnection tlsConnection;
						this.connection = tlsConnection = new TLSConnection( this );
						tlsConnection.certificate = certificate;
					}
					else
						this.connection = new TCPConnection( this );
					break;

				case ProtoType.WebSocket:
					if ( certificate != null )
					{
						TLSWSConnection tlsWSConnection;
						this.connection = tlsWSConnection = new TLSWSConnection( this );
						tlsWSConnection.certificate = certificate;
					}
					else
						this.connection = new WSConnection( this );
					break;

				case ProtoType.KCP:
					this.connection = new KCPConnection( this );
					break;

				default:
					throw new NotSupportedException();
			}
		}

		public virtual void Dispose() => this.connection.Dispose();

		public void Send( byte[] data, int offset, int size ) => this.connection.Send( data, offset, size );

		/// <summary>
		/// 关闭连接
		/// </summary>
		/// <param name="initiative">是否主动</param>
		/// <param name="reason">原因</param>
		public void Close( bool initiative, string reason )
		{
			if ( this._state == State.Close )
				return;
			this.connection.Close();
			if ( this.isPassive )
				NetworkMgr.instance.RemoveSession( this );
			this.OnClose( reason );
			this.isPassive = false;
			this._state = State.Close;
		}

		public void _OnConnError( string error )
		{
			this._state = State.Close;
			this.OnConnError( error );
		}

		public void _OnEstablish()
		{
			this._state = State.Connected;
			if ( this.isPassive )
				NetworkMgr.instance.AddSession( this );
			this.OnEstablish();
		}

		public void _OnRecv( byte[] data, int offset, int size ) => this.OnRecv( data, offset, size );

		public void _OnSend() => this.OnSend();

		public void _OnError( string error )
		{
			this.OnError( error );
			this.Close( false, error );
		}

		public virtual void Update( UpdateContext updateContext )
		{
			if ( this._state == State.Connected )
				this.connection.Update( updateContext );
		}

		public void HeartBeat( long dt )
		{
			if ( this._state == State.Connected )
				this.connection.OnHeartBeat( dt );
			this.OnHeartBeat( dt );
		}

		/// <summary>
		/// 系统心跳调用
		/// </summary>
		/// <param name="dt"></param>
		protected abstract void OnHeartBeat( long dt );

		/// <summary>
		/// 连接失败后调用
		/// </summary>
		protected abstract void OnConnError( string error );

		/// <summary>
		/// 建立连接后调用
		/// </summary>
		protected abstract void OnEstablish();

		/// <summary>
		/// 关闭连接后调用
		/// </summary>
		protected abstract void OnClose( string reason );

		/// <summary>
		/// 收到数据后调用
		/// </summary>
		protected abstract void OnRecv( byte[] data, int offset, int size );

		/// <summary>
		/// 发送数据后调用
		/// </summary>
		protected abstract void OnSend();

		/// <summary>
		/// 通信过程出现错误后调用
		/// </summary>
		protected abstract void OnError( string error );
	}
}