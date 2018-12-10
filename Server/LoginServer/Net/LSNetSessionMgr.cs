using Core.Net;
using Protos;
using Shared.Net;
using System.Security.Cryptography.X509Certificates;

namespace LoginServer.Net
{
	public class LSNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateClientSession( ProtoType type, X509Certificate2 certificate )
		{
			ClientSession session = NetSessionPool.instance.Pop<ClientSession>( type, certificate );
			session.owner = this;
			session.type = SessionType.ServerGC;
			return session;
		}

		public override bool IsTransTarget( MsgOpts.Types.TransTarget transTarget )
		{
			return transTarget == MsgOpts.Types.TransTarget.Ls;
		}
	}
}