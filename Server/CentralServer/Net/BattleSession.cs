using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace CentralServer.Net
{
	public class BattleSession : SrvCliSession
	{
		protected BattleSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGAskPing, this.OnBSAskPing );
			this._msgCenter.Register( Protos.MsgID.EBs2CsReportState, this.OnBs2CsReportState );
			this._msgCenter.Register( Protos.MsgID.EBs2CsGcaskLogin, this.OnBs2CsGcaskLogin );
			this._msgCenter.Register( Protos.MsgID.EBs2CsGclost, this.OnBs2CsGclost );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"BS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			CS.instance.BSDisconnectHandler( this.logicID );

			this.logicID = 0;

			base.OnClose( reason );
			Logger.Info( $"BS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnBSAskPing( Google.Protobuf.IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing ) message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			this.Send( askPingRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnBs2CsReportState( Google.Protobuf.IMessage message )
		{
			Protos.BS2CS_ReportState reportState = ( Protos.BS2CS_ReportState ) message;
			this.logicID = reportState.BsInfo.Id;
			return CS.instance.BStateReportHandler( reportState.BsInfo );
		}

		private ErrorCode OnBs2CsGcaskLogin( Google.Protobuf.IMessage message )
		{
			Protos.BS2CS_GCAskLogin gcAskLogin = ( Protos.BS2CS_GCAskLogin ) message;
			Protos.CS2BS_GCLoginRet gcAskLoginRet = ProtoCreator.R_BS2CS_GCAskLogin( gcAskLogin.Opts.Pid );

			bool result = CS.instance.userMgr.UserOnline( gcAskLogin.SessionID, this.logicID, out _ );
			gcAskLoginRet.Result = result ? Protos.CS2BS_GCLoginRet.Types.EResult.Success : Protos.CS2BS_GCLoginRet.Types.EResult.Failed;

			this.Send( gcAskLoginRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnBs2CsGclost( Google.Protobuf.IMessage message )
		{
			Protos.BS2CS_GCLost gcLost = ( Protos.BS2CS_GCLost ) message;
			CS.instance.OnGCLost( gcLost.SessionID );
			return ErrorCode.Success;
		}
	}
}