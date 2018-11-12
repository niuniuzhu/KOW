using Core.Misc;
using Core.Net;

namespace Shell
{
	public class BSSession : MasterSession
	{
		protected override string key => "4CA92E10-4FF7-485B-A553-32217319ADA1";

		private BSSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"BS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"BS({this.id}) disconnected with msg:{reason}" );
		}
	}
}