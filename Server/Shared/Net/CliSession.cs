using Core.Misc;
using Core.Net;

namespace Shared.Net
{
	/// <summary>
	/// 作为客户端的session,通常是主动发起连接后创建的session
	/// </summary>
	public abstract class CliSession : NetSessionBase
	{
		public IConnector connector { get; }

		private bool _reconnectTag;
		private long _reconnTime;

		protected CliSession( uint id, ProtoType type ) : base( id, type )
		{
			switch ( type )
			{
				case ProtoType.TCP:
					this.connector = new TCPConnector( this );
					break;

				case ProtoType.KCP:
					this.connector = new KCPConnector( this );
					break;

				default:
					throw new System.NotSupportedException();
			}
			this._reconnectTag = true;
		}

		public bool Connect( string ip, int port ) => this.Reconnect( ip, port );

		private bool Reconnect()
		{
			if ( this._state != State.Close || !this._reconnectTag || TimeUtils.utcTime < this._reconnTime )
				return false;
			bool result = this.connector.Reconnect();
			this._state = result ? State.Connecting : State.Close;
			return result;
		}

		private bool Reconnect( string ip, int port )
		{
			bool result = this.connector.Connect( ip, port );
			this._state = result ? State.Connecting : State.Close;
			return result;
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			this._reconnTime = TimeUtils.utcTime + Consts.RECONN_INTERVAL;
		}

		protected override void OnConnError( string error )
		{
			Logger.Log( error );
			base.OnConnError( error );
			this._reconnTime = TimeUtils.utcTime + Consts.RECONN_INTERVAL;
		}

		protected override void OnHeartBeat( long dt ) => this.Reconnect();
	}
}