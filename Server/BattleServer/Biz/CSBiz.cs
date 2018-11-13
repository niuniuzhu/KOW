using Core.Misc;
using Shared;

namespace BattleServer.Biz
{
	public partial class BizProcessor
	{
		public void OnCSSessionClosed( uint sid )
		{
			//结束所有战场
			BS.instance.battleManager.StopAllBattles();
		}

		/// <summary>
		/// 处理cs通知开始战斗
		/// </summary>
		public ErrorCode OnCs2BsBattleInfo( uint sid, Google.Protobuf.IMessage message )
		{
			Protos.CS2BS_BattleInfo battleInfo = ( Protos.CS2BS_BattleInfo )message;

			ErrorCode errorCode = BS.instance.battleManager.CreateBattle( battleInfo, out uint bid );

			Protos.BS2CS_BattleInfoRet battleInfoRet = ProtoCreator.R_CS2BS_BattleInfo( battleInfo.Opts.Pid );
			battleInfoRet.Bid = bid;
			battleInfoRet.Result = errorCode == ErrorCode.Success
									   ? Protos.Global.Types.ECommon.Success
									   : Protos.Global.Types.ECommon.Failed;
			BS.instance.netSessionMgr.Send( sid, battleInfoRet );
			return ErrorCode.Success;
		}

		public void OnGSAskPingRet( uint sid, Google.Protobuf.IMessage message )
		{
			long currTime = TimeUtils.utcTime;
			Protos.G_AskPingRet askPingRet = ( Protos.G_AskPingRet )message;
			long lag = ( long )( ( currTime - askPingRet.Stime ) * 0.5 );
			long timeDiff = askPingRet.Time + lag - currTime;
			Logger.Log( $"cs ping ret, lag:{lag}, timediff:{timeDiff}" );
		}

		public void ReportStateToCS( uint sid )
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
			BS.instance.netSessionMgr.Send( sid, reportState );
		}
	}
}