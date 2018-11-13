using BattleServer.Net;
using BattleServer.User;
using Core.Misc;
using Shared;

namespace BattleServer.Biz
{
	public partial class BizProcessor
	{
		public void OnGCSessionClosed( uint sid, string reason )
		{
			ClientSession session = ( ClientSession )BS.instance.netSessionMgr.GetSession( sid );
			session.activeTime = 0;

			//检查玩家是否登陆了
			BSUser user = BS.instance.userMgr.GetUser( sid );
			if ( user != null )
			{
				if ( reason != "offline" )
					BS.instance.userMgr.OnDisconnect( user );
			}
		}

		public ErrorCode OnGc2BsAskLogin( uint sid, Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_AskLogin login = ( Protos.GC2BS_AskLogin )message;
			Protos.BS2GC_LoginRet loginRet = ProtoCreator.R_GC2BS_AskLogin( login.Opts.Pid );

			//验证并登陆
			BSUser user = BS.instance.userMgr.Online( login.SessionID, sid );
			if ( user != null )
			{
				ClientSession session = ( ClientSession )BS.instance.netSessionMgr.GetSession( sid );
				//设置该Session为受信任的连接
				session.accredited = true;
				//把战场的初始状态下发到GC
				loginRet.RndSeed = user.battle.rndSeed;
				loginRet.FrameRate = user.battle.frameRate;
				loginRet.KeyframeStep = user.battle.keyframeStep;
				loginRet.BattleTime = user.battle.battleTime;
				loginRet.MapID = user.battle.mapID;
				loginRet.Result = Protos.Global.Types.ECommon.Success;
				BS.instance.netSessionMgr.Send( sid, loginRet );
			}
			else
			{
				loginRet.Result = Protos.Global.Types.ECommon.Failed;
				BS.instance.netSessionMgr.DelayCloseSession( sid, 500, "client login failed" );
			}
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsKeepAlive( uint sid, Google.Protobuf.IMessage message )
		{
			ClientSession session = BS.instance.netSessionMgr.GetSession( sid ) as ClientSession;
			if ( session != null )
				session.activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsRequestSnapShot( uint sid, Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_RequestSnapshot request = ( Protos.GC2BS_RequestSnapshot )message;
			Protos.BS2GC_RequestSnapshotRet ret = ProtoCreator.R_GC2BS_RequestSnapshot( request.Opts.Pid );

			BSUser user = BS.instance.userMgr.GetUser( sid );
			if ( user == null )
				ret.Result = Protos.BS2GC_RequestSnapshotRet.Types.EResult.InvalidUser;
			else
				BS.instance.battleManager.HandleRequestSnapshot( user.battle, request, ret );
			BS.instance.netSessionMgr.Send( sid, ret );

			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsFrameAction( uint sid, Google.Protobuf.IMessage message )
		{
			BSUser user = BS.instance.userMgr.GetUser( sid );
			if ( user != null )
				BS.instance.battleManager.HandleFrameAction( user.gcNID, user.battle, ( Protos.GC2BS_FrameAction )message );
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsRequestFrameActions( uint sid, Google.Protobuf.IMessage message )
		{
			BSUser user = BS.instance.userMgr.GetUser( sid );
			if ( user != null )
			{
				Protos.GC2BS_RequestFrameActions request = ( Protos.GC2BS_RequestFrameActions )message;
				Protos.BS2GC_RequestFrameActionsRet ret = ProtoCreator.R_GC2BS_RequestFrameActions( request.Opts.Pid );
				BS.instance.battleManager.HandleRequestFrameActions( user.battle, request.From, request.To, ret );
				BS.instance.netSessionMgr.Send( sid, ret );
			}
			return ErrorCode.Success;
		}
	}
}