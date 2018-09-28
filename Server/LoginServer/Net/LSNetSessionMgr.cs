using Core.Net;
using Google.Protobuf;
using Protos;
using Shared.Net;

namespace LoginServer.Net
{
	public class LSNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateClientSession( ProtoType type )
		{
			ClientSession session = NetSessionPool.instance.Pop<ClientSession>( type );
			session.owner = this;
			session.type = SessionType.ServerGC;
			return session;
		}

		public override bool IsTransTarget( MsgOpts.Types.TransTarget transTarget )
		{
			return transTarget == MsgOpts.Types.TransTarget.Ls;
		}

		public override void TransMsg( MsgOpts.Types.TransTarget transTarget, ulong transID, IMessage msg )
		{
			throw new System.NotImplementedException();
		}
	}
}