using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Protos;
using Shared.Net;

namespace GateServer.Net
{
	public class GSNetSessionMgr : NetSessionMgr
	{
		public INetSession CreateClientSession( ProtoType type )
		{
			ClientSession session = NetSessionPool.instance.Pop<ClientSession>( type );
			session.owner = this;
			session.type = SessionType.ServerGC;
			return session;
		}

		public bool SendToGC( ulong gcNID, IMessage msg, System.Action<IMessage> rpcHandler = null )
		{
			if ( !GS.instance.GetClientUKey( gcNID, out uint sid ) )
			{
				Logger.Warn( $"invalid gcNID:{gcNID}" );
				return false;
			}
			this.Send( sid, msg, rpcHandler );
			return true;
		}

		public override bool IsTransTarget( MsgOpts.Types.TransTarget transTarget )
		{
			return transTarget == MsgOpts.Types.TransTarget.Gs;
		}
	}
}