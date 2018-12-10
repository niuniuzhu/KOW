using Core.Misc;
using Core.Net;
using Shared.Net;
using System.Security.Cryptography.X509Certificates;

namespace CentralServer.Net
{
	public class BattleSession : SrvCliSession
	{
		protected BattleSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
			this.RegMsgHandler( Protos.MsgID.EGAskPing, CS.instance.bizProcessor.OnBSAskPing );
			this.RegMsgHandler( Protos.MsgID.EBs2CsReportState, CS.instance.bizProcessor.OnBs2CsReportState );
			this.RegMsgHandler( Protos.MsgID.EBs2CsBattleEnd, CS.instance.bizProcessor.OnBs2CsBattleEnd );
			this.RegMsgHandler( Protos.MsgID.EBs2CsKickUser, CS.instance.bizProcessor.OnBs2CsKickUser );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"BS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			CS.instance.bizProcessor.OnBSSessionClosed( this );

			base.OnClose( reason );
			Logger.Info( $"BS({this.id}) disconnected with msg:{reason}" );
		}
	}
}