using Core.Misc;
using Core.Net;
using Shared.Net;
using System.Security.Cryptography.X509Certificates;

namespace CentralServer.Net
{
	public class GateSession : SrvCliSession
	{
		protected GateSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
			this.RegMsgHandler( Protos.MsgID.EGAskPing, CS.instance.bizProcessor.OnGSAskPing );
			this.RegMsgHandler( Protos.MsgID.EGs2CsReportState, CS.instance.bizProcessor.OnGs2CsReportState );
			this.RegMsgHandler( Protos.MsgID.EGs2CsGcaskLogin, CS.instance.bizProcessor.OnGs2CsGcaskLogin );
			this.RegMsgHandler( Protos.MsgID.EGs2CsGclost, CS.instance.bizProcessor.OnGs2CsGclost );

			this.RegMsgHandler( Protos.MsgID.EGc2CsBeginMatch, CS.instance.bizProcessor.OnGc2CsBeginMatch );
			this.RegMsgHandler( Protos.MsgID.EGc2CsCancelMatch, CS.instance.bizProcessor.OnGc2CsCancelMatch );
			this.RegMsgHandler( Protos.MsgID.EGc2CsQueryRanking, CS.instance.bizProcessor.OnGc2CsQueryRanking );
			this.RegMsgHandler( Protos.MsgID.EGc2CsQueryChampions, CS.instance.bizProcessor.OnGc2CsQueryChampions );
			this.RegMsgHandler( Protos.MsgID.EGc2CsBuyChampion, CS.instance.bizProcessor.OnGc2CsBuyChampion );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"GS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			CS.instance.bizProcessor.OnGSSessionClosed( this );

			base.OnClose( reason );
			Logger.Info( $"GS({this.id}) disconnected with msg:{reason}" );
		}
	}
}