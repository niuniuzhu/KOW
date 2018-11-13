using Core.Misc;
using GateServer.Net;
using Shared;
using Shared.Net;

namespace GateServer.Biz
{
	public partial class BizProcessor
	{
		public void OnGCSessionClosed( uint sid, string reason )
		{
			ClientSession session = ( ClientSession ) GS.instance.netSessionMgr.GetSession( sid );
			session.activeTime = 0;

			//先验证客户端是否合法登陆了
			if ( !GS.instance.userMgr.GetGcNID( sid, out ulong gcNID ) )
				return;

			//移除客户端信息
			GS.instance.userMgr.RemoveClient( sid );

			//CS主动踢掉不用再次通知了
			if ( "CS Kick" != reason || "CS Closed" != reason )
			{
				//通知cs客户端丢失
				Protos.GS2CS_GCLost gcLost = ProtoCreator.Q_GS2CS_GCLost();
				gcLost.SessionID = gcNID;
				GS.instance.netSessionMgr.Send( SessionType.ServerG2CS, gcLost );
			}
		}

		public ErrorCode OnGc2GsAskLogin( uint sid, Google.Protobuf.IMessage message )
		{
			Protos.GC2GS_AskLogin login = ( Protos.GC2GS_AskLogin )message;

			Protos.GS2CS_GCAskLogin gcAskLogin = ProtoCreator.Q_GS2CS_GCAskLogin();
			gcAskLogin.SessionID = login.SessionID;
			Logger.Log( $"client:{gcAskLogin.SessionID} ask login" );

			//向CS请求客户端登陆
			GS.instance.netSessionMgr.Send( SessionType.ServerG2CS, gcAskLogin, ( sid_, ret ) =>
			{
				//检测客户端是否断线了
				ClientSession session = GS.instance.netSessionMgr.GetSession( sid ) as ClientSession;
				if ( session == null )
				{
					//通知CS客户端断开了
					Protos.GS2CS_GCLost gcLost = ProtoCreator.Q_GS2CS_GCLost();
					gcLost.SessionID = login.SessionID;
					GS.instance.netSessionMgr.Send( SessionType.ServerG2CS, gcLost );
					return;
				}

				Protos.CS2GS_GCLoginRet csLoginRet = ( Protos.CS2GS_GCLoginRet )ret;
				Protos.GS2GC_LoginRet gsLoginRet = ProtoCreator.R_GC2GS_AskLogin( login.Opts.Pid );
				switch ( csLoginRet.Result )
				{
					case Protos.CS2GS_GCLoginRet.Types.EResult.Success:
						//添加到管理器
						GS.instance.userMgr.AddClient( login.SessionID, sid );

						//设置该Session为受信任的连接
						session.accredited = true;

						gsLoginRet.Result = Protos.GS2GC_LoginRet.Types.EResult.Success;
						gsLoginRet.GcNID = csLoginRet.GcNID;
						gsLoginRet.GcState = ( Protos.GS2GC_LoginRet.Types.EGCCState )csLoginRet.GcState;
						gsLoginRet.BsIP = csLoginRet.BsIP;
						gsLoginRet.BsPort = csLoginRet.BsPort;
						GS.instance.netSessionMgr.Send( sid, gsLoginRet );
						break;

					case Protos.CS2GS_GCLoginRet.Types.EResult.IllegalLogin:
						GS.instance.netSessionMgr.CloseSession( sid, "client login failed" );
						break;
				}
			} );
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2GsKeepAlive( uint sid, Google.Protobuf.IMessage message )
		{
			ClientSession session = GS.instance.netSessionMgr.GetSession( sid ) as ClientSession;
			if ( session != null )
				session.activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}
	}
}