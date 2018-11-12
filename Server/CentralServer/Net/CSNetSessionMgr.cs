using Core.Net;
using Protos;
using Shared.Net;

namespace CentralServer.Net
{
	public class CSNetSessionMgr : NetSessionMgr
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
			GateSession session = NetSessionPool.instance.Pop<GateSession>( type );
			session.owner = this;
			session.type = SessionType.ServerGS;
			return session;
		}

		public INetSession CreateBSSession( ProtoType type )
		{
			BattleSession session = NetSessionPool.instance.Pop<BattleSession>( type );
			session.owner = this;
			session.type = SessionType.ServerBS;
			return session;
		}

		public INetSession CreateShellSession( ProtoType type )
		{
			ShellSession session = NetSessionPool.instance.Pop<ShellSession>( type );
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