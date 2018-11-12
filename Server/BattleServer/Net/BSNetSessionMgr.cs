using Core.Net;
using Protos;
using Shared.Net;

namespace BattleServer.Net
{
	public class BSNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateClientSession( ProtoType type )
		{
			ClientSession session = NetSessionPool.instance.Pop<ClientSession>( type );
			session.owner = this;
			session.type = SessionType.ServerGC;
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
			return transTarget == MsgOpts.Types.TransTarget.Bs;
		}
	}
}