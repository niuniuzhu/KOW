using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;

namespace GateServer.Net
{
	public class G2CSSession : CliSession
	{
		private long _pingTime;
		private long _reportTime;

		private G2CSSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.ECs2GsKickGc, this.OnECs2GsKickGc );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.logicID}) connected." );

			this._pingTime = 0;
			this._reportTime = 0;
			this.ReportStateToCS();
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"CS({this.logicID}) disconnected with msg:{reason}." );
			//断开所有客户端
			uint[] gcSids = GS.instance.userMgr.GetClients();
			foreach ( uint sid in gcSids )
			{
				GS.instance.netSessionMgr.CloseSession( sid, "CS Closed." );
			}
			GS.instance.userMgr.ClearClients();
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
				this.Send( msg, this.OnGSAskPingRet );
			}

			this._reportTime += dt;
			if ( this._state == State.Connected && this._reportTime >= GS.instance.config.reportInterval )
			{
				this._reportTime = 0;
				this.ReportStateToCS();
			}
		}

		private void ReportStateToCS()
		{
			Protos.GS2CS_ReportState reportState = ProtoCreator.Q_GS2CS_ReportState();
			GSConfig config = GS.instance.config;
			reportState.GsInfo = new Protos.GSInfo
			{
				Id = config.gsID,
				Name = config.name,
				Ip = config.externalIP,
				Port = config.externalPort,
				Password = config.password,
				State = ( Protos.GSInfo.Types.State )GS.instance.state
			};
			this.Send( reportState );
		}

		private void OnGSAskPingRet( IMessage message )
		{
			if ( message == null )
				return;
			long currTime = TimeUtils.utcTime;
			Protos.G_AskPingRet askPingRet = ( Protos.G_AskPingRet )message;
			long lag = ( long )( ( currTime - askPingRet.Stime ) * 0.5 );
			long timeDiff = askPingRet.Time + lag - currTime;
			Logger.Log( $"cs ping ret, lag:{lag}, timediff:{timeDiff}" );
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

		private ErrorCode OnECs2GsKickGc( IMessage message )
		{
			Protos.CS2GS_KickGC kickGC = ( Protos.CS2GS_KickGC )message;
			Protos.GS2CS_KickGCRet kickGCRet = ProtoCreator.R_CS2GS_KickGC( kickGC.Opts.Pid );

			//可能在收到消息前,客户端就断开了,这里必须容错
			if ( GS.instance.userMgr.GetClientSID( kickGC.GcNID, out uint sid ) )
			{
				//通知客户端被踢下线
				Protos.GS2GC_Kick kick = ProtoCreator.Q_GS2GC_Kick();
				kick.Reason = kickGC.Reason;
				this.owner.Send( sid, kick );

				//强制断开客户端
				GS.instance.netSessionMgr.DelayCloseSession( sid, 500, "CS Kick" );

				kickGCRet.Result = Protos.Global.Types.ECommon.Success;
			}
			else
				kickGCRet.Result = Protos.Global.Types.ECommon.Failed;

			//通知cs操作结果
			this.Send( kickGCRet );

			return ErrorCode.Success;
		}
	}
}