using System.Security.Cryptography.X509Certificates;
using Core.Net;
using Google.Protobuf;
using Protos;
using Shared.Net;

namespace GateServer.Net
{
	public class GSNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateClientSession( ProtoType type, X509Certificate2 certificate )
		{
			ClientSession session = NetSessionPool.instance.Pop<ClientSession>( type, certificate );
			session.owner = this;
			session.type = SessionType.ServerGC;
			return session;
		}

		public INetSession CreateShellSession( ProtoType type, X509Certificate2 certificate )
		{
			ShellSession session = NetSessionPool.instance.Pop<ShellSession>( type, certificate );
			session.owner = this;
			session.type = SessionType.Shell;
			return session;
		}

		public bool SendToGC( ulong gcNID, IMessage msg, RPCEntry rpcEntry = null )
		{
			if ( !GS.instance.userMgr.GetSID( gcNID, out uint sid ) )
				return false;
			this.Send( sid, msg, rpcEntry );
			return true;
		}

		public override bool IsTransTarget( MsgOpts.Types.TransTarget transTarget )
		{
			return transTarget == MsgOpts.Types.TransTarget.Gs;
		}
	}
}