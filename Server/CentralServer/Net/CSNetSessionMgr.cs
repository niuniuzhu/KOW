using System.Security.Cryptography.X509Certificates;
using Core.Net;
using Protos;
using Shared.Net;

namespace CentralServer.Net
{
	public class CSNetSessionMgr : NetSessionMgr
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
			GateSession session = NetSessionPool.instance.Pop<GateSession>( type, certificate );
			session.owner = this;
			session.type = SessionType.ServerGS;
			return session;
		}

		public INetSession CreateBSSession( ProtoType type, X509Certificate2 certificate )
		{
			BattleSession session = NetSessionPool.instance.Pop<BattleSession>( type, certificate );
			session.owner = this;
			session.type = SessionType.ServerBS;
			return session;
		}

		public INetSession CreateShellSession( ProtoType type, X509Certificate2 certificate )
		{
			ShellSession session = NetSessionPool.instance.Pop<ShellSession>( type, certificate );
			session.owner = this;
			session.type = SessionType.Shell;
			return session;
		}

		public override bool IsTransTarget( MsgOpts.Types.TransTarget transTarget )
		{
			return transTarget == MsgOpts.Types.TransTarget.Cs;
		}
	}
}