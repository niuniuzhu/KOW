using Core.Misc;
using Google.Protobuf;
using Protos;
using Shared;
using Shared.Net;

namespace GateServer.Biz
{
	public partial class BizProcessor
	{
		public void OnCSSessionClosed( NetSessionBase session )
		{
			uint[] gcSIDs = GS.instance.userMgr.GetClients();
			//广播到客户端CS丢失
			GS2GC_CSLost csLost = ProtoCreator.Q_GS2GC_CSLost();
			GS.instance.netSessionMgr.Broadcast( gcSIDs, csLost );
			//断开所有客户端
			foreach ( uint gcSID in gcSIDs )
				GS.instance.netSessionMgr.DelayCloseSession( gcSID, 100, "CS Closed" );
			//清空客户端信息
			GS.instance.userMgr.ClearClients();
		}

		public ErrorCode OnECs2GsKickGc( NetSessionBase session, IMessage message )
		{
			Protos.CS2GS_KickGC kickGC = ( Protos.CS2GS_KickGC )message;

			//可能在收到消息前,客户端就断开了,这里必须容错
			if ( GS.instance.userMgr.GetSID( kickGC.GcNID, out uint sid_ ) )
			{
				//通知客户端被踢下线
				Protos.GS2GC_Kick kick = ProtoCreator.Q_GS2GC_Kick();
				kick.Reason = kickGC.Reason;
				GS.instance.netSessionMgr.Send( sid_, kick );

				//强制断开客户端
				GS.instance.netSessionMgr.DelayCloseSession( sid_, 100, "CS Kick" );

			}
			return ErrorCode.Success;
		}

		public void PingCS( NetSessionBase session )
		{
			Protos.G_AskPing msg = ProtoCreator.Q_G_AskPing();
			msg.Time = TimeUtils.utcTime;
			session.Send( msg, RPCEntry.Pop( OnGSAskPingRet ) );
		}

		private static void OnGSAskPingRet( NetSessionBase session, IMessage message, object[] args )
		{
			if ( message == null )
				return;
			long currTime = TimeUtils.utcTime;
			Protos.G_AskPingRet askPingRet = ( Protos.G_AskPingRet )message;
			long lag = ( long )( ( currTime - askPingRet.Stime ) * 0.5 );
			long timeDiff = askPingRet.Time + lag - currTime;
			Logger.Log( $"cs ping ret, lag:{lag}, timediff:{timeDiff}" );
		}

		public void ReportStateToCS( NetSessionBase session )
		{
			Protos.GS2CS_ReportState reportState = ProtoCreator.Q_GS2CS_ReportState();
			GSConfig config = GS.instance.config;
			reportState.GsInfo = new Protos.GSInfo
			{
				Id = config.gsID,
				Name = config.name,
				Ip = config.externalIP,
				Port = config.externalPort,
				Password = config.password,
				State = ( Protos.GSInfo.Types.State )GS.instance.state
			};
			session.Send( reportState );
		}
	}
}