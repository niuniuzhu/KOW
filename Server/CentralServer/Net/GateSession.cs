using Core.Misc;
using Core.Net;
using Shared.Net;

namespace CentralServer.Net
{
	public class GateSession : SrvCliSession
	{
		protected GateSession( uint id, ProtoType type ) : base( id, type )
		{
			this.RegMsgHandler( Protos.MsgID.EGAskPing, CS.instance.bizProcessor.OnGSAskPing );
			this.RegMsgHandler( Protos.MsgID.EGs2CsReportState, CS.instance.bizProcessor.OnGs2CsReportState );
			this.RegMsgHandler( Protos.MsgID.EGs2CsGcaskLogin, CS.instance.bizProcessor.OnGs2CsGcaskLogin );
			this.RegMsgHandler( Protos.MsgID.EGs2CsGclost, CS.instance.bizProcessor.OnGs2CsGclost );

			this.RegMsgHandler( Protos.MsgID.EGc2CsBeginMatch, CS.instance.bizProcessor.OnGc2CsBeginMatch );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"GS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			CS.instance.bizProcessor.OnGSSessionClosed( this.id );

			base.OnClose( reason );
			Logger.Info( $"GS({this.id}) disconnected with msg:{reason}" );
		}
	}
}