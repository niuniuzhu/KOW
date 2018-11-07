using CentralServer.User;
using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;
using BSInfo = Shared.BSInfo;
using GSInfo = Shared.GSInfo;

namespace CentralServer.Net
{
	public class GateSession : SrvCliSession
	{
		protected GateSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGAskPing, this.OnGSAskPing );
			this._msgCenter.Register( Protos.MsgID.EGs2CsReportState, this.OnGs2CsReportState );
			this._msgCenter.Register( Protos.MsgID.EGs2CsGcaskLogin, this.OnGs2CsGcaskLogin );
			this._msgCenter.Register( Protos.MsgID.EGs2CsGclost, this.OnGs2CsGclost );

			this._msgCenter.Register( Protos.MsgID.EGc2CsBeginMatch, this.OnGc2CsBeginMatch );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"GS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			//更新GS列表
			CS.instance.lIDToGSInfos.Remove( this.logicID );
			CS.instance.UpdateAppropriateGSInfo();

			//踢出所有连接到该GS的玩家
			CS.instance.userMgr.OnGSDisconnect( this.logicID );

			//通知LS有GS断开连接了
			Protos.CS2LS_GSLost gsLost = ProtoCreator.Q_CS2LS_GSLost();
			gsLost.Gsid = this.logicID;
			CS.instance.netSessionMgr.Send( SessionType.ServerLS, gsLost );

			this.logicID = 0;
			base.OnClose( reason );
			Logger.Info( $"GS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnGSAskPing( IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			this.Send( askPingRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnGs2CsReportState( IMessage message )
		{
			Protos.GS2CS_ReportState reportState = ( Protos.GS2CS_ReportState )message;
			return this.GStateReportHandler( reportState.GsInfo, this.id );
		}

		private ErrorCode GStateReportHandler( Protos.GSInfo GSInfoRecv, uint sessionID )
		{
			this.logicID = GSInfoRecv.Id;
			bool hasRecord = CS.instance.lIDToGSInfos.TryGetValue( this.logicID, out GSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new GSInfo();
				CS.instance.lIDToGSInfos[this.logicID] = gsInfo;
			}
			//更新GS信息
			gsInfo.lid = this.logicID;
			gsInfo.sessionID = sessionID;
			gsInfo.name = GSInfoRecv.Name;
			gsInfo.ip = GSInfoRecv.Ip;
			gsInfo.port = GSInfoRecv.Port;
			gsInfo.password = GSInfoRecv.Password;
			gsInfo.state = ( GSInfo.State )GSInfoRecv.State;
			Logger.Log( $"report from GS:{gsInfo}" );

			//转发到LS
			Protos.CS2LS_GSInfo nGSInfo = ProtoCreator.Q_CS2LS_GSInfo();
			nGSInfo.GsInfo = new Protos.GSInfo()
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
		private ErrorCode OnGs2CsGcaskLogin( IMessage message )
		{
			Protos.GS2CS_GCAskLogin gcAskLogin = ( Protos.GS2CS_GCAskLogin )message;
			Protos.CS2GS_GCLoginRet gcAskLoginRet = ProtoCreator.R_GS2CS_GCAskLogin( gcAskLogin.Opts.Pid );

			//创建玩家并上线
			CSUser user = CS.instance.userMgr.Online( gcAskLogin.SessionID, this.id, this.logicID );
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
					System.Diagnostics.Debug.Assert( CS.instance.netSessionMgr.GetSession( user.bsSID, out INetSession session ), $"can not find BS:{user.bsSID}" );
					System.Diagnostics.Debug.Assert( CS.instance.lIDToBSInfos.TryGetValue( ( ( BattleSession )session ).logicID, out BSInfo bsInfo ),
													$"can not find BS:{( ( BattleSession )session ).logicID}" );
					gcAskLoginRet.GcState = Protos.CS2GS_GCLoginRet.Types.EGCCState.Battle;
					gcAskLoginRet.GcNID = user.ukey | ( ulong )bsInfo.lid << 32;
					gcAskLoginRet.BsIP = bsInfo.ip;
					gcAskLoginRet.BsPort = bsInfo.port;
				}
				gcAskLoginRet.Result = Protos.CS2GS_GCLoginRet.Types.EResult.Success;
			}
			this.Send( gcAskLoginRet );
			return ErrorCode.Success;
		}

		/// <summary>
		/// 客户端与GS断开连接
		/// </summary>
		private ErrorCode OnGs2CsGclost( IMessage message )
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

		private ErrorCode OnGc2CsBeginMatch( IMessage message )
		{
			Protos.GC2CS_BeginMatch beginMatch = ( Protos.GC2CS_BeginMatch )message;
			CS.instance.matcher.BeginMatch( this.id, beginMatch );
			return ErrorCode.Success;
		}
	}
}