using Core.Misc;
using Core.Net;
using Shared.Net;
using System.Security.Cryptography.X509Certificates;

namespace DBServer.Net
{
	public class CSSession : SrvCliSession
	{
		protected CSSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
			this.RegMsgHandler( Protos.MsgID.ECs2DbUpdateRank, DB.instance.bizProcessor.OnCs2DbUpdateRank );
			this.RegMsgHandler( Protos.MsgID.ECs2DbQueryRanking, DB.instance.bizProcessor.OnCs2DbQueryRanking );
			this.RegMsgHandler( Protos.MsgID.ECs2DbBuyChampion, DB.instance.bizProcessor.OnCs2DbBuyChampion );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"CS({this.id}) disconnected with msg:{reason}" );
		}
	}
}