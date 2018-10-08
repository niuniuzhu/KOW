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

		public void SendToGC( ulong gcNID, IMessage msg, System.Action<IMessage> rpcHandler = null )
		{
			GS.instance.GcNidToSid.TryGetValue( gcNID, out uint sid );
			if ( sid <= 0 )
			{
				Logger.Warn( $"sid not found by gcNID:{gcNID}" );
				return;
			}
			this.Send( sid, msg, rpcHandler );
		}

		public override bool IsTransTarget( MsgOpts.Types.TransTarget transTarget )
		{
			return transTarget == MsgOpts.Types.TransTarget.Gs;
		}

		public override void TransMsg( MsgOpts.Types.TransTarget transTarget, ulong transID, IMessage msg )
		{
			switch ( transTarget )
			{
				case MsgOpts.Types.TransTarget.Cs:
					msg.GetMsgOpts().Transid = transID;
					this.Send( SessionType.ServerG2CS, msg );
					break;

				case MsgOpts.Types.TransTarget.Gc:
					this.SendToGC( transID, msg );
					break;
			}
		}
	}
}