using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace Shell
{
	public class Shell
	{
		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly NetSessionMgr _sessionMgr = new NetSessionMgr();
		private readonly GSSession _gsSession;
		private readonly CSSession _csSession;
		private readonly BSSession _bsSession;
		private readonly Scheduler _heartBeater = new Scheduler();

		public Shell()
		{
			this._gsSession = this._sessionMgr.CreateConnector<GSSession>( SessionType.Shell2GS, "127.0.0.1", 50002, ProtoType.TCP, 65535, 0 );
			this._csSession = this._sessionMgr.CreateConnector<CSSession>( SessionType.Shell2CS, "127.0.0.1", 50001, ProtoType.TCP, 65535, 0 );
			this._bsSession = this._sessionMgr.CreateConnector<BSSession>( SessionType.Shell2BS, "127.0.0.1", 50003, ProtoType.TCP, 65535, 0 );

			this._heartBeater.Start( Consts.HEART_BEAT_INTERVAL, this.OnHeartBeat );
		}

		public void Update( long elapsed, long dt )
		{
			this._updateContext.utcTime = TimeUtils.utcTime;
			this._updateContext.time = elapsed;
			this._updateContext.deltaTime = dt;

			this._sessionMgr.Update( this._updateContext );
			NetworkMgr.instance.Update( this._updateContext );
			this._heartBeater.Update( dt );
		}

		private void OnHeartBeat( int count ) => NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );

		public void HandleInput( string cmd )
		{
			int pos = cmd.IndexOf( ' ' );
			if ( pos < 0 )
				return;
			string type = cmd.Substring( 0, pos );
			cmd = cmd.Substring( pos + 1 );
			if ( string.IsNullOrEmpty( cmd ) )
				return;
			switch ( type )
			{
				case "gs":
					this._gsSession.HandleInput( cmd );
					break;
				case "cs":
					this._csSession.HandleInput( cmd );
					break;
				case "bs":
					this._bsSession.HandleInput( cmd );
					break;
			}
		}
	}
}