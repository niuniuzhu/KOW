using CentralServer.User;
using Core.Misc;
using Google.Protobuf;
using Shared;
using Shared.Net;
using System.Collections.Generic;
using BSInfo = Shared.BSInfo;

namespace CentralServer.Biz
{
	public partial class BizProcessor
	{
		public void OnBSSessionClosed( NetSessionBase session )
		{
			//更新BS列表
			CS.instance.lIDToBSInfos.Remove( session.logicID );
			CS.instance.UpdateAppropriateBSInfo();

			//通知gs踢掉gc
			Protos.CS2GS_KickGC bsLose = ProtoCreator.Q_CS2GS_KickGC();
			List<CSUser> users = CS.instance.battleStaging.GetUsers( session.logicID );
			if ( users != null )
			{
				int count = users.Count;
				for ( int i = 0; i < count; i++ )
				{
					CSUser user = users[i];
					CS.instance.userMgr.KickUser( user, Protos.CS2GS_KickGC.Types.EReason.Bslost );
				}
			}
			//踢出所有连接到该BS的玩家
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
			//通知客户端战场结束
			Protos.CS2GC_BattleEnd gcBattleEnd = ProtoCreator.Q_CS2GC_BattleEnd();
			foreach ( var kv in battleEnd.Infos )
			{
				CSUser user = CS.instance.battleStaging.GetUser( kv.Key );
				gcBattleEnd.Win = kv.Value.Win;
				const int honour = 15;
				//todo elo算法计算得分
				//todo 记录到数据库
				gcBattleEnd.Honour = honour;
				CS.instance.netSessionMgr.Send( user.gsSID, gcBattleEnd, null, Protos.MsgOpts.Types.TransTarget.Gc, user.gcNID );
			}

			//移除指定BS里指定战场里的所有玩家
			CS.instance.battleStaging.Remove( session.logicID, battleEnd.Bid );

			//回应
			Protos.CS2BS_BattleEndRet battleEndRet = ProtoCreator.R_BS2CS_BattleEnd( battleEnd.Opts.Pid );
			session.Send( battleEndRet );

			return ErrorCode.Success;
		}

		/// <summary>
		/// BS通知玩家离开战场
		/// </summary>
		public ErrorCode OnBs2CsKickUser( NetSessionBase session, IMessage message )
		{
			Protos.BS2CS_KickUser kickUser = ( Protos.BS2CS_KickUser )message;
			CSUser user = CS.instance.battleStaging.GetUser( kickUser.GcNID );
			if ( user != null )
			{
				Protos.CS2GS_KickGC.Types.EReason reason = Protos.CS2GS_KickGC.Types.EReason.OutOfSync;
				switch ( kickUser.Reason )
				{
					case Protos.BS2CS_KickUser.Types.Reason.OutOfSync:
						reason = Protos.CS2GS_KickGC.Types.EReason.OutOfSync;
						break;

					case Protos.BS2CS_KickUser.Types.Reason.Gclost:
						reason = Protos.CS2GS_KickGC.Types.EReason.Bslost;
						break;
				}
				//踢下线
				CS.instance.userMgr.KickUser( user, reason );
			}
			return ErrorCode.Success;
		}
	}
}