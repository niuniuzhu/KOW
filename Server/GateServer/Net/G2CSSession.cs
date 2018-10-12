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
			GS.instance.ReportStateToCS();
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"CS({this.logicID}) disconnected with msg:{reason}." );
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
				GS.instance.ReportStateToCS();
			}
		}

		private void OnGSAskPingRet( Google.Protobuf.IMessage message )
		{
			long currTime = TimeUtils.utcTime;
			Protos.G_AskPingRet askPingRet = ( Protos.G_AskPingRet ) message;
			long lag = ( long ) ( ( currTime - askPingRet.Stime ) * 0.5 );
			long timeDiff = askPingRet.Time + lag - currTime;
			Logger.Log( $"cs ping ret, lag:{lag}, timediff:{timeDiff}" );
		}

		protected override void TransMsg( Protos.MsgOpts.Types.TransTarget transTarget, ulong transID, IMessage message )
		{
			switch ( transTarget )
			{
				case Protos.MsgOpts.Types.TransTarget.Gc:
					GS.instance.GcNidToSid.TryGetValue( message.GetMsgOpts().Transid, out uint sid );
					this.owner.Send( sid, message );
					break;
			}
		}

		private ErrorCode OnECs2GsKickGc( IMessage message )
		{
			Protos.CS2GS_KickGC kickGC = ( Protos.CS2GS_KickGC ) message;
			Protos.CS2GS_KickGC.Types.EReason reason = kickGC.Reason;

			//todo 如果客户端断了,刚好cs要踢掉,怎么处理?
			//这样会找不到客户端
			//通知客户端被踢下线
			Protos.GS2GC_Kick kick = ProtoCreator.Q_GS2GC_Kick();
			kick.Reason = reason;
			GS.instance.netSessionMgr.SendToGC( kickGC.GcNID, kick );

			//通知cs踢出成功
			Protos.GS2CS_KickGCRet kickGCRet = ProtoCreator.R_CS2GS_KickGC( kickGC.Opts.Pid );
			kickGCRet.Result = Protos.Global.Types.ECommon.Success;
			this.Send( kickGCRet );
			return ErrorCode.Success;

			//todo 强制断开客户端
			GS.instance.netSessionMgr.GetSession(  )
		}
	}
}