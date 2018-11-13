using Core.Misc;
using Google.Protobuf;
using Shared;
using Shared.Net;

namespace GateServer.Biz
{
	public partial class BizProcessor
	{
		public void OnCSSessionClosed( NetSessionBase session )
		{
			//断开所有客户端
			uint[] gcSids = GS.instance.userMgr.GetClients();
			foreach ( uint gcSID in gcSids )
				GS.instance.netSessionMgr.CloseSession( gcSID, "CS Closed" );
			GS.instance.userMgr.ClearClients();
		}

		public ErrorCode OnECs2GsKickGc( NetSessionBase session, IMessage message )
		{
			Protos.CS2GS_KickGC kickGC = ( Protos.CS2GS_KickGC )message;
			Protos.GS2CS_KickGCRet kickGCRet = ProtoCreator.R_CS2GS_KickGC( kickGC.Opts.Pid );

			//可能在收到消息前,客户端就断开了,这里必须容错
			if ( GS.instance.userMgr.GetSID( kickGC.GcNID, out uint sid_ ) )
			{
				//通知客户端被踢下线
				Protos.GS2GC_Kick kick = ProtoCreator.Q_GS2GC_Kick();
				kick.Reason = kickGC.Reason;
				GS.instance.netSessionMgr.Send( sid_, kick );

				//强制断开客户端
				GS.instance.netSessionMgr.DelayCloseSession( sid_, 500, "CS Kick" );

				kickGCRet.Result = Protos.Global.Types.ECommon.Success;
			}
			else
				kickGCRet.Result = Protos.Global.Types.ECommon.Failed;

			//通知cs操作结果
			session.Send( kickGCRet );

			return ErrorCode.Success;
		}

		public void OnGSAskPingRet( NetSessionBase session, IMessage message )
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