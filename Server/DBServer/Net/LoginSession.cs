using Core.Misc;
using Core.Net;
using Shared.Net;

namespace DBServer.Net
{
	public class LoginSession : SrvCliSession
	{
		protected LoginSession( uint id, ProtoType type ) : base( id, type )
		{
			this.RegMsgHandler( Protos.MsgID.ELs2DbQueryAccount, DB.instance.bizProcessor.OnLs2DbQueryAccount );
			this.RegMsgHandler( Protos.MsgID.ELs2DbQueryLogin, DB.instance.bizProcessor.OnLs2DbQueryLogin );
			this.RegMsgHandler( Protos.MsgID.ELs2DbExec, DB.instance.bizProcessor.OnLs2DbExec );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"LS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"LS({this.id}) disconnected with msg:{reason}" );
		}
	}
}