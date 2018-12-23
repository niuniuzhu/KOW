using Core.Misc;
using Shared;
using Shared.Net;

namespace BattleServer.Biz
{
	public partial class BizProcessor
	{
		public void OnCSSessionClosed( NetSessionBase session )
		{
			//结束所有战场
			BS.instance.battleManager.StopAllBattles();
		}

		/// <summary>
		/// 处理cs通知开始战斗
		/// </summary>
		public ErrorCode OnCs2BsBattleInfo( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.CS2BS_BattleInfo battleInfo = ( Protos.CS2BS_BattleInfo )message;

			ErrorCode errorCode = BS.instance.battleManager.CreateBattle( battleInfo, out uint bid );

			Protos.BS2CS_BattleInfoRet battleInfoRet = ProtoCreator.R_CS2BS_BattleInfo( battleInfo.Opts.Pid );
			battleInfoRet.Bid = bid;
			battleInfoRet.Result = errorCode == ErrorCode.Success
									   ? Protos.Global.Types.ECommon.Success
									   : Protos.Global.Types.ECommon.Failed;
			session.Send( battleInfoRet );
			return ErrorCode.Success;
		}

		public void PingCS( NetSessionBase session )
		{
			Protos.G_AskPing msg = ProtoCreator.Q_G_AskPing();
			msg.Time = TimeUtils.utcTime;
			session.Send( msg, RPCEntry.Pop( OnGSAskPingRet ) );
		}

		private static void OnGSAskPingRet( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			long currTime = TimeUtils.utcTime;
			Protos.G_AskPingRet askPingRet = ( Protos.G_AskPingRet )message;
			long lag = ( long )( ( currTime - askPingRet.Stime ) * 0.5 );
			long timeDiff = askPingRet.Time + lag - currTime;
			//Logger.Log( $"cs ping ret, lag:{lag}, timediff:{timeDiff}" );
		}

		public void ReportStateToCS( NetSessionBase session )
		{
			Protos.BS2CS_ReportState reportState = ProtoCreator.Q_BS2CS_ReportState();
			BSConfig config = BS.instance.config;
			reportState.BsInfo = new Protos.BSInfo
			{
				Id = config.id,
				Ip = config.externalIP,
				Port = config.externalPort,
				State = ( Protos.BSInfo.Types.State )BS.instance.state
			};
			session.Send( reportState );
		}
	}
}