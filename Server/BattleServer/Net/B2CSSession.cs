using Core.Misc;
using Core.Net;
using Shared.Net;
using System.Security.Cryptography.X509Certificates;

namespace BattleServer.Net
{
	public class B2CSSession : CliSession
	{
		private long _pingTime;
		private long _reportTime;

		private B2CSSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
			this.RegMsgHandler( Protos.MsgID.ECs2BsBattleInfo, BS.instance.bizProcessor.OnCs2BsBattleInfo );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.id}) connected." );

			this._pingTime = 0;
			this._reportTime = 0;
			BS.instance.bizProcessor.ReportStateToCS( this );
		}

		protected override void OnClose( string reason )
		{
			BS.instance.bizProcessor.OnCSSessionClosed( this );

			base.OnClose( reason );
			Logger.Info( $"CS({this.id}) disconnected with msg:{reason}." );
		}

		protected override void OnHeartBeat( long dt )
		{
			base.OnHeartBeat( dt );

			this._pingTime += dt;
			if ( this._pingTime >= BS.instance.config.pingInterval )
			{
				this._pingTime = 0;
				BS.instance.bizProcessor.PingCS( this );
			}

			this._reportTime += dt;
			if ( this._state == State.Connected && this._reportTime >= BS.instance.config.reportInterval )
			{
				this._reportTime = 0;
				BS.instance.bizProcessor.ReportStateToCS( this );
			}
		}
	}
}