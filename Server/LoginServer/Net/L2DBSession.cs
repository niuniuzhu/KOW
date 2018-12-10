using Core.Misc;
using Core.Net;
using Shared.Net;
using System.Security.Cryptography.X509Certificates;

namespace LoginServer.Net
{
	public class L2DBSession : CliSession
	{
		private L2DBSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"DB({this.id}) connected." );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"DB({this.id}) disconnected with msg:{reason}." );
		}
	}
}