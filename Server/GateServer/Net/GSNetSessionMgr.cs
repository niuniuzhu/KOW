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

		public void SendToGC( ulong gcNid, IMessage msg, System.Action<IMessage> rpcHandler = null )
		{
			GS.instance.GcNidToSid.TryGetValue( gcNid, out uint sid );
			if ( sid <= 0 )
			{
				Logger.Warn( $"sid not found by gcNid:{gcNid}" );
				return;
			}
			this.Send( sid, msg, rpcHandler );
		}

		public override bool IsTransTarget( MsgOpts.Types.TransTarget transTarget )
		{
			return transTarget == MsgOpts.Types.TransTarget.Gs;
		}

		public override void TransMsg( MsgOpts.Types.TransTarget transTarget, ulong transID, IMessage msg ) => this.SendToGC( transID, msg );
	}
}