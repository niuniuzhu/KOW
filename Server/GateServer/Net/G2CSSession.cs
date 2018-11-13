using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared.Net;

namespace GateServer.Net
{
	public class G2CSSession : CliSession
	{
		private long _pingTime;
		private long _reportTime;

		private G2CSSession( uint id, ProtoType type ) : base( id, type )
		{
			this.RegMsgHandler( Protos.MsgID.ECs2GsKickGc, GS.instance.bizProcessor.OnECs2GsKickGc );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.id}) connected." );

			this._pingTime = 0;
			this._reportTime = 0;
			GS.instance.bizProcessor.ReportStateToCS( this );
		}

		protected override void OnClose( string reason )
		{
			GS.instance.bizProcessor.OnCSSessionClosed( this );

			base.OnClose( reason );
			Logger.Info( $"CS({this.id}) disconnected with msg:{reason}." );
		}

		protected override void OnHeartBeat( long dt )
		{
			base.OnHeartBeat( dt );

			this._pingTime += dt;
			if ( this._pingTime >= GS.instance.config.pingInterval )
			{
				this._pingTime = 0;
				Protos.G_AskPing msg = ProtoCreator.Q_G_AskPing();
				msg.Time = TimeUtils.utcTime;
				this.Send( msg, GS.instance.bizProcessor.OnGSAskPingRet );
			}

			this._reportTime += dt;
			if ( this._state == State.Connected && this._reportTime >= GS.instance.config.reportInterval )
			{
				this._reportTime = 0;
				GS.instance.bizProcessor.ReportStateToCS( this );
			}
		}

		protected override void TransMsg( Protos.MsgOpts.Types.TransTarget transTarget, ulong transID, IMessage message )
		{
			switch ( transTarget )
			{
				case Protos.MsgOpts.Types.TransTarget.Gc:
					GS.instance.netSessionMgr.SendToGC( message.GetMsgOpts().Transid, message );
					break;
			}
		}
	}
}