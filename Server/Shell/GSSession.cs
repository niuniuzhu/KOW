using Core.Misc;
using Core.Net;
using System.Security.Cryptography.X509Certificates;

namespace Shell
{
	public class GSSession : MasterSession
	{
		protected override string key => "88F77D88-8C5A-4FE7-B099-68088A27C8DE";

		private GSSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"GS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"GS({this.id}) disconnected with msg:{reason}" );
		}
	}
}