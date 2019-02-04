using CentralServer.Match;
using CentralServer.Net;
using CentralServer.User;
using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;
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
			Logger.Log( $"report from GS:{gsInfo}" );

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
					Nickname = user.nickname,
					Avatar = user.avatar,
					Gender = user.gender,
					//todo
					Honor = 0
				};
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
				response.Result = CS.instance.matchMgr.CreateUser( request.Mode, user, @params ) ?
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

			if ( !CS.instance.matchMgr.RemoveUser( user ) )
				return ErrorCode.Failed;

			return ErrorCode.Success;
		}
	}
}