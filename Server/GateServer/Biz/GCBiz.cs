using Core.Misc;
using GateServer.Net;
using Shared;
using Shared.Net;

namespace GateServer.Biz
{
	public partial class BizProcessor
	{
		public void OnGCSessionClosed( NetSessionBase session, string reason )
		{
			ClientSession gcSession = ( ClientSession )session;
			gcSession.activeTime = 0;

			//先验证客户端是否合法登陆了
			if ( !GS.instance.userMgr.GetGcNID( gcSession.id, out ulong gcNID ) )
				return;

			//移除客户端信息
			GS.instance.userMgr.RemoveClient( gcNID );

			//CS主动踢掉不用再次通知了
			if ( "CS Kick" != reason || "CS Closed" != reason )
			{
				//通知cs客户端丢失
				Protos.GS2CS_GCLost gcLost = ProtoCreator.Q_GS2CS_GCLost();
				gcLost.SessionID = gcNID;
				GS.instance.netSessionMgr.Send( SessionType.ServerG2CS, gcLost );
			}
		}

		public ErrorCode OnGC2GSAskLogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.GC2GS_AskLogin login = ( Protos.GC2GS_AskLogin )message;

			Protos.GS2CS_GCAskLogin gcAskLogin = ProtoCreator.Q_GS2CS_GCAskLogin();
			gcAskLogin.SessionID = login.SessionID;
			Logger.Log( $"client:{gcAskLogin.SessionID} ask login" );

			//向CS请求客户端登陆
			GS.instance.netSessionMgr.Send( SessionType.ServerG2CS, gcAskLogin,
											RPCEntry.Pop( OnCS2GSAskLoginRet, session.id, login ) );
			return ErrorCode.Success;
		}

		private static void OnCS2GSAskLoginRet( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			uint sid = ( uint )args[0];
			Protos.GC2GS_AskLogin login = ( Protos.GC2GS_AskLogin )args[1];

			Protos.CS2GS_GCLoginRet csLoginRet = ( Protos.CS2GS_GCLoginRet )message;
			Protos.GS2GC_LoginRet gsLoginRet = ProtoCreator.R_GC2GS_AskLogin( login.Opts.Pid );
			switch ( csLoginRet.Result )
			{
				case Protos.CS2GS_GCLoginRet.Types.EResult.Success:
					//检测客户端是否断线了
					ClientSession gcSession = GS.instance.netSessionMgr.GetSession( sid ) as ClientSession;
					if ( gcSession == null )
					{
						//通知CS客户端断开了
						Protos.GS2CS_GCLost gcLost = ProtoCreator.Q_GS2CS_GCLost();
						gcLost.SessionID = login.SessionID;
						GS.instance.netSessionMgr.Send( SessionType.ServerG2CS, gcLost );
						return;
					}

					//添加到管理器
					GS.instance.userMgr.AddClient( login.SessionID, sid );

					//设置该Session为受信任的连接
					gcSession.accredited = true;

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
		}

		public ErrorCode OnGc2GsKeepAlive( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			ClientSession gcSession = session as ClientSession;
			if ( gcSession != null )
				gcSession.activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}
	}
}