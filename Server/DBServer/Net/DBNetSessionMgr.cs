using System.Security.Cryptography.X509Certificates;
using Core.Net;
using Protos;
using Shared.Net;

namespace DBServer.Net
{
	public class DBNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateLSSession( ProtoType type, X509Certificate2 certificate )
		{
			LoginSession session = NetSessionPool.instance.Pop<LoginSession>( type, certificate );
			session.owner = this;
			session.type = SessionType.ServerLS;
			return session;
		}

		public INetSession CreateGSSession( ProtoType type, X509Certificate2 certificate )
		{
			CSSession session = NetSessionPool.instance.Pop<CSSession>( type, certificate );
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