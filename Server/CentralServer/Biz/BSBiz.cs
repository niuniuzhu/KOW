using Core.Misc;
using Google.Protobuf;
using Shared;
using Shared.Net;

namespace CentralServer.Biz
{
	public partial class BizProcessor
	{
		public void OnBSSessionClosed( NetSessionBase session )
		{
			//更新BS列表
			CS.instance.lIDToBSInfos.Remove( session.logicID );
			CS.instance.UpdateAppropriateBSInfo();

			//踢出所有连接到该GS的玩家
			CS.instance.battleStaging.Remove( session.logicID );

			session.logicID = 0;
		}

		public ErrorCode OnBSAskPing( NetSessionBase session, IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			session.Send( askPingRet );
			return ErrorCode.Success;
		}

		public ErrorCode OnBs2CsReportState( NetSessionBase session, IMessage message )
		{
			Protos.BS2CS_ReportState reportState = ( Protos.BS2CS_ReportState )message;
			return this.BStateReportHandler( session, reportState.BsInfo );
		}

		private ErrorCode BStateReportHandler( NetSessionBase session, Protos.BSInfo BSInfoRecv )
		{
			session.logicID = BSInfoRecv.Id;
			bool hasRecord = CS.instance.lIDToBSInfos.TryGetValue( session.logicID, out BSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new BSInfo();
				CS.instance.lIDToBSInfos[session.logicID] = gsInfo;
			}
			//更新BS信息
			gsInfo.lid = session.logicID;
			gsInfo.sessionID = session.id;
			gsInfo.ip = BSInfoRecv.Ip;
			gsInfo.port = BSInfoRecv.Port;
			gsInfo.state = ( BSInfo.State )BSInfoRecv.State;
			Logger.Log( $"report from BS:{gsInfo}" );
			return ErrorCode.Success;
		}

		/// <summary>
		/// BS通知战场结束
		/// </summary>
		public ErrorCode OnBs2CsBattleEnd( NetSessionBase session, IMessage message )
		{
			Protos.BS2CS_BattleEnd battleEnd = ( Protos.BS2CS_BattleEnd )message;
			//移除指定BS里指定战场里的所有玩家
			CS.instance.battleStaging.Remove( session.logicID, battleEnd.Bid );
			//todo 战斗结算
			Protos.CS2BS_BattleEndRet ret = ProtoCreator.R_BS2CS_BattleEnd( battleEnd.Opts.Pid );
			session.Send( ret );
			return ErrorCode.Success;
		}
	}
}