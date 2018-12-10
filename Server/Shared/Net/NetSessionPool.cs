using Core.Misc;
using Core.Net;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;

namespace Shared.Net
{
	public class NetSessionPool
	{
		private static NetSessionPool _instance;
		public static NetSessionPool instance => _instance ?? ( _instance = new NetSessionPool() );
		private static uint _gid;

		private readonly Dictionary<Type, Queue<INetSession>> _typeToObjects = new Dictionary<Type, Queue<INetSession>>();

		private NetSessionPool()
		{
		}

		public T Pop<T>( ProtoType protoType, X509Certificate2 certificate ) where T : INetSession
		{
			lock ( this._typeToObjects )
			{
				Type type = typeof( T );
				if ( !this._typeToObjects.TryGetValue( type, out Queue<INetSession> objs ) )
				{
					objs = new Queue<INetSession>();
					this._typeToObjects[type] = objs;
				}

				if ( objs.Count == 0 )
				{
					if ( _gid == uint.MaxValue )
					{
						Logger.Warn( "id reach the limit!!" );
						_gid = 0;
					}
					uint id = ++_gid;
					return ( T )Activator.CreateInstance( typeof( T ), BindingFlags.NonPublic | BindingFlags.Instance, null, new object[] { id, protoType, certificate }, null );
				}

				objs.TryDequeue( out INetSession session );
				return ( T )session;
			}
		}

		public void Push( INetSession session )
		{
			lock ( this._typeToObjects )
			{
				this._typeToObjects[session.GetType()].Enqueue( session );
			}
		}

		public void Dispose()
		{
			lock ( this._typeToObjects )
			{
				foreach ( var kv in this._typeToObjects )
				{
					Queue<INetSession> queue = kv.Value;
					while ( queue.Count > 0 )
					{
						queue.TryDequeue( out INetSession session );
						session.Dispose();
					}
				}

				this._typeToObjects.Clear();
			}
		}
	}
}