using Core.Misc;
using Core.Net;
using Shared.Net;
using System.Security.Cryptography.X509Certificates;

namespace LoginServer.Net
{
	public class ClientSession : SrvCliSession
	{
		protected ClientSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
			this.RegMsgHandler( Protos.MsgID.EGc2LsAskRegister, LS.instance.bizProcessor.OnGCtoLSAskRegister );
			this.RegMsgHandler( Protos.MsgID.EGc2LsAskLogin, LS.instance.bizProcessor.OnGCtoLSAskLogin );
			this.RegMsgHandler( Protos.MsgID.EGc2LsAskSmartLogin, LS.instance.bizProcessor.OnGc2LsAskSmartLogin );
			this.RegMsgHandler( Protos.MsgID.EGc2LsAskWxlogin, LS.instance.bizProcessor.OnGc2LsAskWxlogin );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"client({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"client({this.id}) disconnected with msg:{reason}" );
		}
	}
}