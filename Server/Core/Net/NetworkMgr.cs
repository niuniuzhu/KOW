using Core.Misc;
using Core.Structure;
using System.Collections.Generic;

namespace Core.Net
{
	public class NetworkMgr
	{
		private static NetworkMgr _instance;
		public static NetworkMgr instance => _instance ?? ( _instance = new NetworkMgr() );

		private readonly SwitchQueue<NetEvent> _eventQueue = new SwitchQueue<NetEvent>();
		private readonly ThreadSafeObjectPool<NetEvent> _eventPool = new ThreadSafeObjectPool<NetEvent>( 100, 50 );
		private readonly Dictionary<uint, IListener> _idToListeners = new Dictionary<uint, IListener>();
		private readonly Dictionary<uint, INetSession> _idToSession = new Dictionary<uint, INetSession>();
		private readonly HashSet<INetSession> _sessionsToRemove = new HashSet<INetSession>();

		private NetworkMgr()
		{
		}

		public void Dispose()
		{
			foreach ( KeyValuePair<uint, IListener> kv in this._idToListeners )
				kv.Value.Dispose();
			foreach ( KeyValuePair<uint, INetSession> kv in this._idToSession )
				kv.Value.Close( "System shutdown" );
			this._idToListeners.Clear();
			this._idToSession.Clear();
			this._eventQueue.Clear();
		}

		public NetEvent PopEvent() => this._eventPool.Pop();

		public void PushEvent( NetEvent netEvent ) => this._eventQueue.Push( netEvent );

		public bool AddSession( INetSession session ) => this._idToSession.TryAdd( session.id, session );

		public void RemoveSession( INetSession session ) => this._sessionsToRemove.Add( session );

		public bool ContainsSession( uint id ) => this._idToSession.ContainsKey( id );

		public bool AddListener( IListener listener ) => this._idToListeners.TryAdd( listener.id, listener );

		public bool RemoveListener( IListener listener ) => this._idToListeners.Remove( listener.id );

		public bool ContainsListener( uint id ) => this._idToListeners.ContainsKey( id );

		/// <summary>
		/// 获取指定id的session
		/// </summary>
		public INetSession GetSession( uint sessionID )
		{
			this._idToSession.TryGetValue( sessionID, out INetSession session );
			return session;
		}

		/// <summary>
		/// 获取指定id的listener
		/// </summary>
		public IListener GetListener( uint listenerID )
		{
			this._idToListeners.TryGetValue( listenerID, out IListener listener );
			return listener;
		}

		public void Update( UpdateContext updateContext )
		{
			this.FireEvents();
			this.RemoveSessions();
			this.UpdateSessions( updateContext );
			this.RemoveSessions();
		}

		private void RemoveSessions()
		{
			if ( this._sessionsToRemove.Count == 0 )
				return;
			foreach ( INetSession session in this._sessionsToRemove )
				this._idToSession.Remove( session.id );
			this._sessionsToRemove.Clear();
		}

		private void UpdateSessions( UpdateContext updateContext )
		{
			foreach ( KeyValuePair<uint, INetSession> kv in this._idToSession )
				kv.Value.Update( updateContext );
		}

		public void OnHeartBeat( long dt )
		{
			foreach ( KeyValuePair<uint, INetSession> kv in this._idToSession )
				kv.Value.HeartBeat( dt );
		}

		private void FireEvents()
		{
			this._eventQueue.Switch();
			while ( !this._eventQueue.isEmpty )
			{
				NetEvent netEvent = this._eventQueue.Pop();
				INetSession session = netEvent.session;

				if ( netEvent.type == NetEvent.Type.Establish )
					session._OnEstablish();
				else
				{
					if ( !this._sessionsToRemove.Contains( session ) &&
						 this._idToSession.ContainsKey( session.id ) ) //可能在处理时间前session已关闭
					{
						switch ( netEvent.type )
						{
							case NetEvent.Type.ConnErr:
								session._OnConnError( netEvent.error );
								break;
							case NetEvent.Type.Error:
								session._OnError( netEvent.error );
								break;
							case NetEvent.Type.Recv:
								session._OnRecv( netEvent.data, 0, netEvent.data.Length );
								break;
							case NetEvent.Type.Send:
								session._OnSend();
								break;
						}
					}
				}
				this._eventPool.Push( netEvent );
			}
		}
	}
}