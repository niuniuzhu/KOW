using CentralServer.Match;
using CentralServer.Net;
using CentralServer.User;
using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;
using System.Collections;
using BSInfo = Shared.BSInfo;
using GSInfo = Shared.GSInfo;

namespace CentralServer.Biz
{
	public partial class BizProcessor
	{
		public void OnGSSessionClosed( NetSessionBase session )
		{
			//更新GS列表
			CS.instance.lIDToGSInfos.Remove( session.logicID );
			CS.instance.UpdateAppropriateGSInfo();

			//踢出所有连接到该GS的玩家
			CS.instance.userMgr.OnGSDisconnect( session.logicID );

			//通知LS有GS断开连接了
			Protos.CS2LS_GSLost message = ProtoCreator.Q_CS2LS_GSLost();
			message.Gsid = session.logicID;
			CS.instance.netSessionMgr.Send( SessionType.ServerLS, message );

			session.logicID = 0;
		}

		public ErrorCode OnGSAskPing( NetSessionBase session, IMessage message )
		{
			Protos.G_AskPing request = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet response = ProtoCreator.R_G_AskPing( request.Opts.Pid );
			response.Stime = request.Time;
			response.Time = TimeUtils.utcTime;
			session.Send( response );
			return ErrorCode.Success;
		}

		public ErrorCode OnGs2CsReportState( NetSessionBase session, IMessage message )
		{
			Protos.GS2CS_ReportState request = ( Protos.GS2CS_ReportState )message;
			return this.GStateReportHandler( session, request.GsInfo );
		}

		private ErrorCode GStateReportHandler( NetSessionBase session, Protos.GSInfo GSInfoRecv )
		{
			session.logicID = GSInfoRecv.Id;
			bool hasRecord = CS.instance.lIDToGSInfos.TryGetValue( session.logicID, out GSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new GSInfo();
				CS.instance.lIDToGSInfos[session.logicID] = gsInfo;
			}
			//更新GS信息
			gsInfo.lid = session.logicID;
			gsInfo.sessionID = session.id;
			gsInfo.name = GSInfoRecv.Name;
			gsInfo.ip = GSInfoRecv.Ip;
			gsInfo.port = GSInfoRecv.Port;
			gsInfo.password = GSInfoRecv.Password;
			gsInfo.state = ( GSInfo.State )GSInfoRecv.State;
			//Logger.Log( $"report from GS:{gsInfo}" );

			//转发到LS
			Protos.CS2LS_GSInfo nGSInfo = ProtoCreator.Q_CS2LS_GSInfo();
			nGSInfo.GsInfo = new Protos.GSInfo
			{
				Id = gsInfo.lid,
				Name = gsInfo.name,
				Ip = gsInfo.ip,
				Port = gsInfo.port,
				Password = gsInfo.password,
				State = ( Protos.GSInfo.Types.State )gsInfo.state
			};
			CS.instance.netSessionMgr.Send( SessionType.ServerLS, nGSInfo );
			return ErrorCode.Success;
		}

		/// <summary>
		/// GS请求CS,验证GC登陆的合法性
		/// </summary>
		public ErrorCode OnGs2CsGcaskLogin( NetSessionBase session, IMessage message )
		{
			Protos.GS2CS_GCAskLogin request = ( Protos.GS2CS_GCAskLogin )message;
			Protos.CS2GS_GCLoginRet response = ProtoCreator.R_GS2CS_GCAskLogin( request.Opts.Pid );

			//创建玩家并上线
			CSUser user = CS.instance.userMgr.Online( request.SessionID, session.id, session.logicID );
			if ( user == null )
			{
				//非法登陆
				response.Result = Protos.CS2GS_GCLoginRet.Types.EResult.IllegalLogin;
			}
			else
			{
				response.UserInfo = new Protos.G_UserInfo
				{
					GcNID = user.gcNID,
					OpenID = user.openID,
					Nickname = user.nickname,
					Avatar = user.avatar,
					Gender = user.gender,
					Rank = user.rank,
					Money = user.money,
					Diamoned = user.diamoned,
					Exp = user.exp,
				};
				response.UserInfo.Champions.AddRange( user.champions );

				//检查玩家是否在战场
				if ( user.isInBattle )
				{
					//检查是否存在BS信息(可能当玩家上线时,BS已丢失)
					//这里理应不会成功断言,因为BS丢失时会把玩家从战场暂存器里移除
					INetSession bsSession = CS.instance.netSessionMgr.GetSession( user.bsSID );
					System.Diagnostics.Debug.Assert( bsSession != null, $"can not find BS:{user.bsSID}" );

					CS.instance.lIDToBSInfos.TryGetValue( ( ( BattleSession )bsSession ).logicID, out BSInfo bsInfo );
					System.Diagnostics.Debug.Assert( bsInfo != null, $"can not find BS:{( ( BattleSession )bsSession ).logicID}" );
					response.GcState = Protos.CS2GS_GCLoginRet.Types.EGCCState.Battle;
					response.GcNID = user.ukey | ( ulong )bsInfo.lid << 32;
					response.BsIP = bsInfo.ip;
					response.BsPort = bsInfo.port;
				}
				response.Result = Protos.CS2GS_GCLoginRet.Types.EResult.Success;
			}
			session.Send( response );
			return ErrorCode.Success;
		}

		/// <summary>
		/// 客户端与GS断开连接
		/// </summary>
		public ErrorCode OnGs2CsGclost( NetSessionBase session, IMessage message )
		{
			Protos.GS2CS_GCLost request = ( Protos.GS2CS_GCLost )message;
			ulong gcNID = request.SessionID;
			CSUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user != null )
			{
				CS.instance.userMgr.Offline( user );
				CS.instance.userMgr.DestroyUser( user );
			}
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2CsBeginMatch( NetSessionBase session, IMessage message )
		{
			Protos.GC2CS_BeginMatch request = ( Protos.GC2CS_BeginMatch )message;
			Protos.CS2GC_BeginMatchRet response = ProtoCreator.R_GC2CS_BeginMatch( request.Opts.Pid );

			ulong gcNID = request.Opts.Transid;
			CSUser user = CS.instance.userMgr.GetUser( gcNID );

			if ( user.isInBattle )
				response.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.UserInBattle;
			else
			{
				MatchParams @params = new MatchParams
				{
					actorID = request.ActorID
				};
				response.Result = CS.instance.matchMgr.Join( request.Mode, user, @params ) ?
									  Protos.CS2GC_BeginMatchRet.Types.EResult.Success :
									  Protos.CS2GC_BeginMatchRet.Types.EResult.Failed;
			}
			user.Send( response );
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2CsCancelMatch( NetSessionBase session, IMessage message )
		{
			Protos.GC2CS_CancelMatch request = ( Protos.GC2CS_CancelMatch )message;

			ulong gcNID = request.Opts.Transid;
			CSUser user = CS.instance.userMgr.GetUser( gcNID );

			if ( !CS.instance.matchMgr.Leave( user ) )
				return ErrorCode.Failed;

			return ErrorCode.Success;
		}

		public ErrorCode OnGc2CsQueryRanking( NetSessionBase session, IMessage message )
		{
			Protos.GC2CS_QueryRanking request = ( Protos.GC2CS_QueryRanking )message;
			ulong gcNID = request.Opts.Transid;
			CSUser user = CS.instance.userMgr.GetUser( gcNID );

			if ( user != null )
			{
				Protos.CS2GC_QueryRankingRet resp = ProtoCreator.R_GC2CS_QueryRanking( request.Opts.Pid );
				Protos.CS2DB_QueryRanking queryRanking = ProtoCreator.Q_CS2DB_QueryRanking();
				queryRanking.SortType = ( Protos.CS2DB_QueryRanking.Types.SortType )request.SortType;
				queryRanking.From = request.From;
				queryRanking.Count = request.Count;

				CS.instance.netSessionMgr.Send( SessionType.ServerC2DB, queryRanking, RPCEntry.Pop( OnQueryRankingRet, user, resp ) );
			}

			return ErrorCode.Success;
		}

		private static void OnQueryRankingRet( NetSessionBase session, IMessage message, object[] args )
		{
			CSUser user = ( CSUser )args[0];
			Protos.CS2GC_QueryRankingRet resp = ( Protos.CS2GC_QueryRankingRet )args[1];
			Protos.DB2CS_QueryRankingRet result = ( Protos.DB2CS_QueryRankingRet )message;
			foreach ( Protos.DB2CS_RankingInfo rankingInfoResult in result.RankingInfos )
			{
				Protos.CS2GC_RankingInfo rankingInfo = new Protos.CS2GC_RankingInfo();
				rankingInfo.Ukey = rankingInfoResult.Ukey;
				rankingInfo.Name = rankingInfoResult.Name;
				rankingInfo.Avatar = rankingInfoResult.Avatar;
				rankingInfo.Gender = rankingInfoResult.Gender;
				rankingInfo.LastLoginTime = rankingInfoResult.LastLoginTime;
				rankingInfo.Rank = rankingInfoResult.Rank;
				rankingInfo.Exp = rankingInfoResult.Exp;
				resp.RankingInfos.Add( rankingInfo );
			}
			user.Send( resp );
		}

		/// <summary>
		/// 客户端请求查询英雄
		/// </summary>
		public ErrorCode OnGc2CsQueryChampions( NetSessionBase session, IMessage message )
		{
			Protos.GC2CS_QueryChampions request = ( Protos.GC2CS_QueryChampions )message;
			ulong gcNID = request.Opts.Transid;
			CSUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user != null )
			{
				Protos.CS2GC_QueryChampionsRet response = ProtoCreator.R_GC2CS_QueryChampions( request.Opts.Pid );
				response.Cids.AddRange( user.champions );
				user.Send( response );
			}
			return ErrorCode.Success;
		}

		/// <summary>
		/// 客户端请求购买英雄
		/// </summary>
		public ErrorCode OnGc2CsBuyChampion( NetSessionBase session, IMessage message )
		{
			Protos.GC2CS_BuyChampion request = ( Protos.GC2CS_BuyChampion )message;
			Protos.CS2GC_BuyChampionRet response = ProtoCreator.R_GC2CS_BuyChampion( request.Opts.Pid );
			int id = request.Cid;
			ulong gcNID = request.Opts.Transid;
			CSUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
				return ErrorCode.Success;

			if ( user.champions.Contains( id ) )//已存在该英雄
			{
				response.Result = Protos.CS2GC_BuyChampionRet.Types.Result.Failed;
				user.Send( response );
				return ErrorCode.Success;
			}
			Hashtable defs = GoodsDefs.GetChampion( id );
			int priceNeeded = ( int )( defs.GetInt( "price" ) * ( 1 + defs.GetFloat( "p_discount" ) ) );
			if ( user.money < priceNeeded )//没有足够金钱
			{
				response.Result = Protos.CS2GC_BuyChampionRet.Types.Result.NotEnoughMoney;
				user.Send( response );
				return ErrorCode.Success;
			}
			int diamonedNeeded = ( int )( defs.GetInt( "diamoned" ) * ( 1 + defs.GetFloat( "d_discount" ) ) );
			if ( user.diamoned < diamonedNeeded )
			{
				response.Result = Protos.CS2GC_BuyChampionRet.Types.Result.NotEnoughDiamoned;
				user.Send( response );
				return ErrorCode.Success;
			}
			int expNeeded = defs.GetInt( "exp" );
			if ( user.exp < expNeeded )
			{
				response.Result = Protos.CS2GC_BuyChampionRet.Types.Result.NotEnoughExp;
				user.Send( response );
				return ErrorCode.Success;
			}

			int moneyResult = user.money - priceNeeded;
			int diamonedResult = user.diamoned - diamonedNeeded;

			Protos.CS2DB_BuyChampion request2 = ProtoCreator.Q_CS2DB_BuyChampion();
			request2.Ukey = user.ukey;
			request2.Money = moneyResult;
			request2.Diamoned = diamonedResult;
			request2.Cids.Add( request.Cid );
			CS.instance.netSessionMgr.Send( SessionType.ServerC2DB, request2, RPCEntry.Pop( OnBuyChampion, user, moneyResult, diamonedResult, request.Cid, response ) );

			return ErrorCode.Success;
		}

		private static void OnBuyChampion( NetSessionBase session, IMessage message, object[] args )
		{
			CSUser user = ( CSUser )args[0];
			int moneyResult = ( int )args[1];
			int diamonedResult = ( int )args[2];
			int cid = ( int )args[3];
			Protos.CS2GC_BuyChampionRet response = ( Protos.CS2GC_BuyChampionRet )args[4];
			Protos.DB2CS_BuyChampionRet dbResponse = ( Protos.DB2CS_BuyChampionRet )message;
			if ( dbResponse.Result == Protos.Global.Types.ECommon.Failed )
				response.Result = Protos.CS2GC_BuyChampionRet.Types.Result.Failed;
			else
			{
				user.money = moneyResult;
				user.diamoned = diamonedResult;
				user.champions.Add( cid );
				response.Result = Protos.CS2GC_BuyChampionRet.Types.Result.Success;
				response.Money = user.money;
				response.Diamoned = user.diamoned;
				response.Cids.AddRange( user.champions );
			}
			user.Send( response );
		}
	}
}