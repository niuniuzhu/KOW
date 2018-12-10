using Core.Misc;
using Core.Net;
using Google.Protobuf;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace Shared.Net
{
	public class NetSessionMgr
	{
		private readonly Dictionary<SessionType, List<NetSessionBase>> _typeToSession = new Dictionary<SessionType, List<NetSessionBase>>();
		private readonly List<NetSessionBase> _sessionsToRemove = new List<NetSessionBase>();
		private readonly ThreadSafeObjectPool<StreamBuffer> _bufferPool = new ThreadSafeObjectPool<StreamBuffer>( 10, 5 );

		/// <summary>
		/// 创建监听器
		/// </summary>
		/// <param name="id">监听器标识</param>
		/// <param name="recvsize">接受缓冲区大小</param>
		/// <param name="protoType">协议类型</param>
		/// <param name="certificate">安全证书</param>
		/// <param name="sessionCreateHandler">创建session的委托</param>
		/// <returns>监听器</returns>
		public IListener CreateListener( uint id, int recvsize, ProtoType protoType, X509Certificate2 certificate, SessionCreater sessionCreateHandler )
		{
			if ( NetworkMgr.instance.ContainsListener( id ) )
				throw new System.Exception( "session id already exists" );

			IListener listener = null;
			switch ( protoType )
			{
				case ProtoType.TCP:
					if ( certificate != null )
					{
						TLSListener tlsListener;
						listener = tlsListener = new TLSListener( id );
						tlsListener.certificate = certificate;
					}
					else
						listener = new TCPListener( id );
					break;

				case ProtoType.WebSocket:
					if ( certificate != null )
					{
						TLSListener tlsListener;
						listener = tlsListener = new TLSWSListener( id );
						tlsListener.certificate = certificate;
					}
					else
						listener = new WSListener( id );
					break;

				case ProtoType.KCP:
					listener = new KCPListener( id );
					break;
			}
			if ( listener == null )
				return null;
			listener.sessionCreater = sessionCreateHandler;
			listener.recvBufSize = recvsize;
			NetworkMgr.instance.AddListener( listener );
			return listener;
		}

		/// <summary>
		/// 创建连接器
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="ip">ip地址</param>
		/// <param name="port">远程端口</param>
		/// <param name="protoType">协议类型</param>
		/// <param name="recvsize">接受缓冲区大小</param>
		/// <param name="logicId">逻辑id</param>
		/// <returns></returns>
		public T CreateConnector<T>( SessionType sessionType, string ip, int port, ProtoType protoType, int recvsize, uint logicId ) where T : CliSession
		{
			T session = NetSessionPool.instance.Pop<T>( protoType, null );
			session.owner = this;
			session.type = sessionType;
			session.logicID = logicId;
			session.connector.recvBufSize = recvsize;
			if ( !session.Connect( ip, port ) )
			{
				NetSessionPool.instance.Push( session );
				return null;
			}
			NetworkMgr.instance.AddSession( session );
			this.AddSession( session );
			return session;
		}

		/// <summary>
		/// 把session添加到管理器
		/// </summary>
		public void AddSession( NetSessionBase session )
		{
			if ( !this._typeToSession.TryGetValue( session.type, out List<NetSessionBase> sessions ) )
			{
				sessions = new List<NetSessionBase>();
				this._typeToSession[session.type] = sessions;
			}
			sessions.Add( session );
		}

		/// <summary>
		/// 从管理器移除session
		/// </summary>
		public void RemoveSession( NetSessionBase session )
		{
			if ( !this._sessionsToRemove.Contains( session ) )
				this._sessionsToRemove.Add( session );
		}

		public virtual bool IsTransTarget( Protos.MsgOpts.Types.TransTarget transTarget ) => false;

		public void Update( UpdateContext updateContext )
		{
			int count = this._sessionsToRemove.Count;
			for ( int i = 0; i < count; i++ )
			{
				NetSessionBase session = this._sessionsToRemove[i];
				List<NetSessionBase> sessions = this._typeToSession[session.type];
				sessions.Remove( session );
				if ( sessions.Count == 0 )
					this._typeToSession.Remove( session.type );
				NetSessionPool.instance.Push( session );
			}
			this._sessionsToRemove.Clear();
		}

		/// <summary>
		/// 停止监听器
		/// </summary>
		public void StopListener( uint id ) => NetworkMgr.instance.GetListener( id )?.Stop();

		public INetSession GetSession( SessionType type )
		{
			if ( !this._typeToSession.TryGetValue( type, out List<NetSessionBase> sessions ) )
				return null;
			return sessions[0];
		}

		public INetSession GetSession( uint sessionID )
		{
			INetSession session = NetworkMgr.instance.GetSession( sessionID );
			return session;
		}

		public bool CloseSession( uint sessionID, string reason )
		{
			INetSession session = this.GetSession( sessionID );
			if ( session == null )
				return false;
			session.Close( true, reason );
			return true;
		}

		public bool DelayCloseSession( uint sessionID, long delay, string reason )
		{
			INetSession session = this.GetSession( sessionID );
			if ( session == null )
				return false;
			session.DelayClose( delay, reason );
			return true;
		}

		/// <summary>
		/// 发送消息到指定的session
		/// </summary>
		/// <param name="sessionID">session id</param>
		/// <param name="msg">消息</param>
		/// <param name="rpcEntry">RPC描述</param>
		/// <param name="transTarget">转发目标</param>
		/// <param name="nsid">转发的网络id</param>
		public bool Send( uint sessionID, IMessage msg, RPCEntry rpcEntry = null, Protos.MsgOpts.Types.TransTarget transTarget = Protos.MsgOpts.Types.TransTarget.Undefine, ulong nsid = 0u )
		{
			INetSession session = this.GetSession( sessionID );
			if ( session == null )
				return false;
			( ( NetSessionBase )session ).Send( msg, rpcEntry, transTarget, nsid );
			return true;
		}

		/// <summary>
		/// 广播消息到指定的session
		/// 不支持消息转发
		/// </summary>
		/// <param name="sessionIds">session id</param>
		/// <param name="msg">消息</param>
		public void Broadcast( IEnumerable<uint> sessionIds, IMessage msg )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			NetSessionBase.EncodeMessage( buffer, msg );
			byte[] data = buffer.GetBuffer();
			int length = buffer.length;

			var enumerator = sessionIds.GetEnumerator(); //据说用var会减少gc
			while ( enumerator.MoveNext() )
			{
				uint sid = enumerator.Current;
				INetSession session = this.GetSession( sid );
				( ( NetSessionBase )session )?.Send( data, 0, length );
			}
			enumerator.Dispose();

			this._bufferPool.Push( buffer );
		}

		/// <summary>
		/// 发送消息到指定的session类型
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="msg">消息</param>
		/// <param name="rpcEntry">RPC描述</param>
		/// <param name="transTarget">转发目标</param>
		/// <param name="nsid">转发的网络id</param>
		/// <param name="all">是否在查询消息类型时对所有结果生效</param>
		public bool Send( SessionType sessionType, IMessage msg, RPCEntry rpcEntry = null,
						  Protos.MsgOpts.Types.TransTarget transTarget = Protos.MsgOpts.Types.TransTarget.Undefine,
						  ulong nsid = 0u, bool all = true )
		{
			if ( !this._typeToSession.TryGetValue( sessionType, out List<NetSessionBase> sessions ) )
				return false;
			if ( !all )
				sessions[0].Send( msg, rpcEntry, transTarget, nsid );
			else
				foreach ( NetSessionBase session in sessions )
					session.Send( msg, rpcEntry, transTarget, nsid );
			return true;
		}

		/// <summary>
		/// 发送数据到指定sesion
		/// </summary>
		/// <param name="sessionID">session id</param>
		/// <param name="data">数据</param>
		/// <param name="offset">数据偏移量</param>
		/// <param name="size">数据长度</param>
		public bool Send( uint sessionID, byte[] data, int offset, int size )
		{
			INetSession session = this.GetSession( sessionID );
			if ( session == null )
				return false;
			session.Send( data, offset, size );
			return true;
		}

		/// <summary>
		/// 发送数据到指定session类型
		/// </summary>
		/// <param name="sessionType">session类型</param>
		/// <param name="data">数据</param>
		/// <param name="offset">数据偏移量</param>
		/// <param name="size">数据长度</param>
		/// <param name="once">在查询消息类型时是否只对第一个结果生效</param>
		public bool Send( SessionType sessionType, byte[] data, int offset, int size, bool once )
		{
			if ( !this._typeToSession.TryGetValue( sessionType, out List<NetSessionBase> sessions ) )
				return false;
			if ( once )
				sessions[0].Send( data, offset, size );
			else
				foreach ( NetSessionBase session in sessions )
					session.Send( data, offset, size );
			return true;
		}
	}
}