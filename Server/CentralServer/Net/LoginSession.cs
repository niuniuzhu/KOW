using Core.Misc;
using Core.Net;
using Shared.Net;
using System.Security.Cryptography.X509Certificates;

namespace CentralServer.Net
{
	public class LoginSession : SrvCliSession
	{
		protected LoginSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
			this.RegMsgHandler( Protos.MsgID.EGAskPing, CS.instance.bizProcessor.OnLSAskPing );
			this.RegMsgHandler( Protos.MsgID.ELs2CsGclogin, CS.instance.bizProcessor.OnLs2CsGclogin );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"LS({this.id}) connected" );
			CS.instance.bizProcessor.NotifyGSInfosToLS( this.id );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"LS({this.id}) disconnected with msg:{reason}" );
		}
	}
}