using Core.Misc;
using Core.Net;
using Shared.Net;

namespace CentralServer.Net
{
	public class BattleSession : SrvCliSession
	{
		protected BattleSession( uint id, ProtoType type ) : base( id, type )
		{
			this.RegMsgHandler( Protos.MsgID.EGAskPing, CS.instance.bizProcessor.OnBSAskPing );
			this.RegMsgHandler( Protos.MsgID.EBs2CsReportState, CS.instance.bizProcessor.OnBs2CsReportState );
			this.RegMsgHandler( Protos.MsgID.EBs2CsBattleEnd, CS.instance.bizProcessor.OnBs2CsBattleEnd );
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