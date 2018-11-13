﻿using Core.Misc;
using Core.Net;
using Shared.Net;

namespace BattleServer.Net
{
	public class B2CSSession : CliSession
	{
		private long _pingTime;
		private long _reportTime;

		private B2CSSession( uint id, ProtoType type ) : base( id, type )
		{
			this.RegMsgHandler( Protos.MsgID.ECs2BsBattleInfo, BS.instance.bizProcessor.OnCs2BsBattleInfo );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.id}) connected." );

			this._pingTime = 0;
			this._reportTime = 0;
			BS.instance.bizProcessor.ReportStateToCS( this.id );
		}

		protected override void OnClose( string reason )
		{
			BS.instance.bizProcessor.OnCSSessionClosed( this.id );

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
				Protos.G_AskPing msg = ProtoCreator.Q_G_AskPing();
				msg.Time = TimeUtils.utcTime;
				this.Send( msg, BS.instance.bizProcessor.OnGSAskPingRet );
			}

			this._reportTime += dt;
			if ( this._state == State.Connected && this._reportTime >= BS.instance.config.reportInterval )
			{
				this._reportTime = 0;
				BS.instance.bizProcessor.ReportStateToCS( this.id );
			}
		}
	}
}