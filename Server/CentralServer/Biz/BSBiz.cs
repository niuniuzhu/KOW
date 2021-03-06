﻿using CentralServer.User;
using Core.Misc;
using Shared;
using Shared.Net;
using System;
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

		public ErrorCode OnBSAskPing( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			session.Send( askPingRet );
			return ErrorCode.Success;
		}

		public ErrorCode OnBs2CsReportState( NetSessionBase session, Google.Protobuf.IMessage message )
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
			//Logger.Log( $"report from BS:{gsInfo}" );
			return ErrorCode.Success;
		}

		/// <summary>
		/// BS通知战场结束
		/// </summary>
		public ErrorCode OnBs2CsBattleEnd( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.BS2CS_BattleEnd battleEnd = ( Protos.BS2CS_BattleEnd )message;
			//评分
			Dictionary<int, int> ratings = this.ComputeElorating( battleEnd.Infos );
			//数据库
			Protos.CS2DB_UpdateRank dbRequest = ProtoCreator.Q_CS2DB_UpdateRank();
			//通知客户端战场结束
			Protos.CS2GC_BattleEnd gcBattleEnd = ProtoCreator.Q_CS2GC_BattleEnd();
			foreach ( var kv in battleEnd.Infos )
			{
				CSUser user = CS.instance.battleStaging.GetUser( kv.Key );

				Protos.BS2CS_BattleEndInfo info = kv.Value;
				gcBattleEnd.Result = ( Protos.CS2GC_BattleEnd.Types.Result )info.Result;
				gcBattleEnd.GMoney = info.Result == Protos.BS2CS_BattleEndInfo.Types.Result.Win ? ( int )( 0.01f * user.rank ) : 0;
				gcBattleEnd.GDiamoned = 0;
				gcBattleEnd.GRank = ratings[info.Team];
				gcBattleEnd.GExp = info.Result == Protos.BS2CS_BattleEndInfo.Types.Result.Win ? 10u : 0u;

				user.money += gcBattleEnd.GMoney;
				user.diamoned += gcBattleEnd.GDiamoned;
				user.rank += gcBattleEnd.GRank;
				user.exp += gcBattleEnd.GExp;

				gcBattleEnd.Money = user.rank;
				gcBattleEnd.Diamoned = user.diamoned;
				gcBattleEnd.Rank = user.rank;
				gcBattleEnd.Exp = user.exp;

				CS.instance.netSessionMgr.Send( user.gsSID, gcBattleEnd, null, Protos.MsgOpts.Types.TransTarget.Gc, user.gcNID );

				//数据库
				Protos.CS2DB_Gain gain = new Protos.CS2DB_Gain();
				gain.Ukey = user.ukey;
				gain.Money = user.money;
				gain.Diamoned = user.diamoned;
				gain.Rank = user.rank;
				gain.Exp = user.exp;
				dbRequest.Gains.Add( gain );
			}
			//数据库
			CS.instance.netSessionMgr.Send( SessionType.ServerC2DB, dbRequest );
			//移除指定BS里指定战场里的所有玩家
			CS.instance.battleStaging.Remove( session.logicID, battleEnd.Bid );

			//回应
			Protos.CS2BS_BattleEndRet battleEndRet = ProtoCreator.R_BS2CS_BattleEnd( battleEnd.Opts.Pid );
			session.Send( battleEndRet );

			return ErrorCode.Success;
		}

		/// <summary>
		/// ELO天梯评分算法
		/// </summary>
		private Dictionary<int, int> ComputeElorating( Google.Protobuf.Collections.MapField<ulong, Protos.BS2CS_BattleEndInfo> battleEndInfos )
		{
			var teamToInfos = new Dictionary<int, List<Protos.BS2CS_BattleEndInfo>>();
			//先按队伍分
			foreach ( var kv in battleEndInfos )
			{
				Protos.BS2CS_BattleEndInfo battleEndInfo = kv.Value;
				teamToInfos.AddToList( battleEndInfo.Team, battleEndInfo );
			}
			//计算每个队伍胜负值,胜+1,和+0.5,负+0
			var teamToWin = new Dictionary<int, double>();
			foreach ( var kv in teamToInfos )
			{
				List<Protos.BS2CS_BattleEndInfo> infos = kv.Value;
				var result = infos[0].Result;//取其中一个成员就知道结果
				switch ( result )
				{
					case Protos.BS2CS_BattleEndInfo.Types.Result.Win:
						//如果胜利,按照规则只有一队胜利,其他都失败
						teamToWin[kv.Key] = teamToInfos.Count - 1;//胜+1
						break;
					case Protos.BS2CS_BattleEndInfo.Types.Result.Draw:
						teamToWin[kv.Key] = ( teamToInfos.Count - 1 ) * 0.5;//和+0.5
						break;
					case Protos.BS2CS_BattleEndInfo.Types.Result.Lose:
						teamToWin[kv.Key] = 0;//负+0
						break;
				}
			}
			//把玩家分配到个队伍
			var teamToUser = new Dictionary<int, List<CSUser>>();
			foreach ( var kv in battleEndInfos )
			{
				CSUser user = CS.instance.battleStaging.GetUser( kv.Key );
				teamToUser.AddToList( kv.Value.Team, user );
			}

			//计算每个队伍的平均分值
			var teamToAvgHonor = new Dictionary<int, int>();
			foreach ( var kv in teamToInfos )
			{
				int rank = 0;
				List<CSUser> users = teamToUser[kv.Key];
				int count = users.Count;
				for ( int i = 0; i < count; i++ )
					rank += users[i].rank;
				rank /= count;
				teamToAvgHonor[kv.Key] = rank;
			}
			//计算每个队伍的得分
			var teamToHonor = new Dictionary<int, int>();
			foreach ( var kv in teamToAvgHonor )
			{
				double we = 0;
				//基数
				double K = AdaptationK( kv.Value );
				//计算与其他队伍的逻辑斯谛分布和
				foreach ( var kv2 in teamToAvgHonor )
				{
					if ( kv.Key == kv2.Key )
						continue;
					var delta = kv2.Value - kv.Value;
					we += 1 / ( Math.Pow( 10, delta / 400.0 ) + 1 );//ELO算法公式,see https://blog.csdn.net/kaifeng2988/article/details/50171201
				}
				//获取胜负值
				double w = teamToWin[kv.Key];
				//最终得分
				double rn = K * ( w - we );
				teamToHonor[kv.Key] = ( int )rn;
			}
			return teamToHonor;
		}

		private static double AdaptationK( int rank )
		{
			if ( rank >= 3200 )
				return 8;
			if ( rank >= 2800 )
				return 16;
			if ( rank >= 2400 )
				return 24;
			if ( rank >= 2000 )
				return 32;
			return 40;
		}

		/// <summary>
		/// BS通知玩家离开战场
		/// </summary>
		public ErrorCode OnBs2CsKickUser( NetSessionBase session, Google.Protobuf.IMessage message )
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