using Core.Net;
using Protos;
using Shared.Net;

namespace DBServer.Net
{
	public class DBNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateLSSession( ProtoType type )
		{
			LoginSession session = NetSessionPool.instance.Pop<LoginSession>( type );
			session.owner = this;
			session.type = SessionType.ServerLS;
			return session;
		}

		public INetSession CreateGSSession( ProtoType type )
		{
			CSSession session = NetSessionPool.instance.Pop<CSSession>( type );
			session.owner = this;
			session.type = SessionType.ServerGS;
			return session;
		}

		public override bool IsTransTarget( MsgOpts.Types.TransTarget transTarget )
		{
			return transTarget == MsgOpts.Types.TransTarget.Db;
		}
	}
}