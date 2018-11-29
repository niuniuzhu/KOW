using CentralServer.Net;
using CentralServer.User;
using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;

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
			Protos.CS2LS_GSLost gsLost = ProtoCreator.Q_CS2LS_GSLost();
			gsLost.Gsid = session.logicID;
			CS.instance.netSessionMgr.Send( SessionType.ServerLS, gsLost );

			session.logicID = 0;
		}

		public ErrorCode OnGSAskPing( NetSessionBase session, IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			session.Send( askPingRet );
			return ErrorCode.Success;
		}

		public ErrorCode OnGs2CsReportState( NetSessionBase session, IMessage message )
		{
			Protos.GS2CS_ReportState reportState = ( Protos.GS2CS_ReportState )message;
			return this.GStateReportHandler( session, reportState.GsInfo );
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
			Protos.GS2CS_GCAskLogin gcAskLogin = ( Protos.GS2CS_GCAskLogin )message;
			Protos.CS2GS_GCLoginRet gcAskLoginRet = ProtoCreator.R_GS2CS_GCAskLogin( gcAskLogin.Opts.Pid );

			//创建玩家并上线
			CSUser user = CS.instance.userMgr.Online( gcAskLogin.SessionID, session.id, session.logicID );
			if ( user == null )
			{
				//非法登陆
				gcAskLoginRet.Result = Protos.CS2GS_GCLoginRet.Types.EResult.IllegalLogin;
			}
			else
			{
				//检查玩家是否在战场
				if ( user.isInBattle )
				{
					//检查是否存在BS信息(可能当玩家上线时,BS已丢失)
					//这里理应不会成功断言,因为BS丢失时会把玩家从战场暂存器里移除
					INetSession bsSession = CS.instance.netSessionMgr.GetSession( user.bsSID );
					System.Diagnostics.Debug.Assert( bsSession != null, $"can not find BS:{user.bsSID}" );

					CS.instance.lIDToBSInfos.TryGetValue( ( ( BattleSession )bsSession ).logicID, out BSInfo bsInfo );
					System.Diagnostics.Debug.Assert( bsInfo != null, $"can not find BS:{( ( BattleSession )bsSession ).logicID}" );
					gcAskLoginRet.GcState = Protos.CS2GS_GCLoginRet.Types.EGCCState.Battle;
					gcAskLoginRet.GcNID = user.ukey | ( ulong )bsInfo.lid << 32;
					gcAskLoginRet.BsIP = bsInfo.ip;
					gcAskLoginRet.BsPort = bsInfo.port;
				}
				gcAskLoginRet.Result = Protos.CS2GS_GCLoginRet.Types.EResult.Success;
			}
			session.Send( gcAskLoginRet );
			return ErrorCode.Success;
		}

		/// <summary>
		/// 客户端与GS断开连接
		/// </summary>
		public ErrorCode OnGs2CsGclost( NetSessionBase session, IMessage message )
		{
			Protos.GS2CS_GCLost gcLost = ( Protos.GS2CS_GCLost )message;
			ulong gcNID = gcLost.SessionID;
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
			Protos.GC2CS_BeginMatch beginMatch = ( Protos.GC2CS_BeginMatch )message;
			CS.instance.matcher.BeginMatch( session, beginMatch );
			return ErrorCode.Success;
		}
	}
}