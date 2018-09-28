using Core.Misc;
using Core.Net;
using Shared.Net;

namespace LoginServer.Net
{
	public class L2DBSession : CliSession
	{
		private L2DBSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"DB({this.logicID}) connected." );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"DB({this.logicID}) disconnected with msg:{reason}." );
		}
	}
}