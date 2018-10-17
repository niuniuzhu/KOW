using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace CentralServer.Net
{
	public class GateSession : SrvCliSession
	{
		protected GateSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGAskPing, this.OnGSAskPing );
			this._msgCenter.Register( Protos.MsgID.EGs2CsReportState, this.OnGs2CsReportState );
			this._msgCenter.Register( Protos.MsgID.EGs2CsGcaskLogin, this.OnGs2CsGcaskLogin );
			this._msgCenter.Register( Protos.MsgID.EGs2CsGclost, this.OnGs2CsGclost );

			this._msgCenter.Register( Protos.MsgID.EGc2CsBeginMatch, msg => CS.instance.matcher.OnGc2CsBeginMatch( this.id, msg ) );
			this._msgCenter.Register( Protos.MsgID.EGc2CsUpdatePlayerInfo, msg => CS.instance.matcher.OnGc2CsUpdatePlayerInfo( msg ) );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"GS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			CS.instance.GSDisconnectHandler( this.logicID );

			this.logicID = 0;

			base.OnClose( reason );
			Logger.Info( $"GS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnGSAskPing( Google.Protobuf.IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing ) message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			this.Send( askPingRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnGs2CsReportState( Google.Protobuf.IMessage message )
		{
			Protos.GS2CS_ReportState reportState = ( Protos.GS2CS_ReportState ) message;
			this.logicID = reportState.GsInfo.Id;
			return CS.instance.GStateReportHandler( reportState.GsInfo, this.id );
		}

		private ErrorCode OnGs2CsGcaskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GS2CS_GCAskLogin gcAskLogin = ( Protos.GS2CS_GCAskLogin ) message;
			Protos.CS2GS_GCLoginRet gcAskLoginRet = ProtoCreator.R_GS2CS_GCAskLogin( gcAskLogin.Opts.Pid );

			bool result = CS.instance.userMgr.UserOnline( gcAskLogin.SessionID, this.logicID, out _ );
			gcAskLoginRet.Result = result ? Protos.CS2GS_GCLoginRet.Types.EResult.Success : Protos.CS2GS_GCLoginRet.Types.EResult.IllegalLogin;

			this.Send( gcAskLoginRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnGs2CsGclost( Google.Protobuf.IMessage message )
		{
			Protos.GS2CS_GCLost gcLost = ( Protos.GS2CS_GCLost ) message;
			CS.instance.OnGCLost( gcLost.SessionID );
			return ErrorCode.Success;
		}
	}
}