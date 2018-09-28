using Core.Misc;
using Core.Net;
using Shared.Net;

namespace DBServer.Net
{
	public class CSSession : SrvCliSession
	{
		protected CSSession( uint id, ProtoType type ) : base( id, type )
		{
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