using BattleServer.Net;
using BattleServer.User;
using Core.Misc;
using Shared;
using Shared.Net;

namespace BattleServer.Biz
{
	public partial class BizProcessor
	{
		public void OnGCSessionClosed( NetSessionBase session, string reason )
		{
			ClientSession gcSession = ( ClientSession )session;
			gcSession.activeTime = 0;

			//检查玩家是否登陆了
			BSUser user = BS.instance.userMgr.GetUser( gcSession.id );
			if ( user != null )
			{
				if ( reason != "battle_end" )
				{
					BS.instance.userMgr.OnDisconnect( user );
				}
			}
		}

		public ErrorCode OnGc2BsAskLogin( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_AskLogin login = ( Protos.GC2BS_AskLogin )message;
			Protos.BS2GC_LoginRet loginRet = ProtoCreator.R_GC2BS_AskLogin( login.Opts.Pid );

			//验证并登陆
			BSUser user = BS.instance.userMgr.Online( login.SessionID, session.id );
			if ( user != null )
			{
				ClientSession gcSession = ( ClientSession )session;
				//设置该Session为受信任的连接
				gcSession.accredited = true;
				//把战场的初始状态下发到GC
				loginRet.PlayerID = user.gcNID;
				loginRet.RndSeed = user.battle.rndSeed;
				loginRet.FrameRate = user.battle.frameRate;
				loginRet.KeyframeStep = user.battle.keyframeStep;
				loginRet.SnapshotStep = user.battle.snapshotStep;
				loginRet.BattleTime = user.battle.battleTime;
				loginRet.MapID = user.battle.mapID;
				loginRet.CurFrame = user.battle.frame;
				foreach ( var player in user.battle.battleEntry.players )
				{
					Protos.CS2BS_PlayerInfo playerInfo = new Protos.CS2BS_PlayerInfo
					{
						GcNID = player.gcNID,
						ActorID = player.actorID,
						Nickname = player.nickname,
						Avatar = player.avatar,
						Gender = player.gender,
						Honor = player.honor,
						Team = player.team
					};
					loginRet.PlayerInfos.Add( playerInfo );
				}
				loginRet.Result = Protos.Global.Types.ECommon.Success;
				session.Send( loginRet );
			}
			else
			{
				loginRet.Result = Protos.Global.Types.ECommon.Failed;
				session.Send( loginRet );
				session.Close( true, "client login failed" );
			}
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsKeepAlive( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			ClientSession gcSession = session as ClientSession;
			if ( gcSession != null )
				gcSession.activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsRequestSnapShot( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_RequestSnapshot request = ( Protos.GC2BS_RequestSnapshot )message;
			Protos.BS2GC_RequestSnapshotRet ret = ProtoCreator.R_GC2BS_RequestSnapshot( request.Opts.Pid );

			BSUser user = BS.instance.userMgr.GetUser( session.id );
			if ( user == null )
				ret.Result = Protos.BS2GC_RequestSnapshotRet.Types.EResult.InvalidUser;
			else
				BS.instance.battleMgr.HandleRequestSnapshot( user.battle, request, ret );
			BS.instance.netSessionMgr.Send( session.id, ret );

			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsFrameAction( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			BSUser user = BS.instance.userMgr.GetUser( session.id );
			if ( user != null )
				BS.instance.battleMgr.HandleFrameAction( user.gcNID, user.battle, ( Protos.GC2BS_FrameAction )message );
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsRequestFrameActions( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			BSUser user = BS.instance.userMgr.GetUser( session.id );
			if ( user != null )
			{
				Protos.GC2BS_RequestFrameActions request = ( Protos.GC2BS_RequestFrameActions )message;
				Protos.BS2GC_RequestFrameActionsRet ret = ProtoCreator.R_GC2BS_RequestFrameActions( request.Opts.Pid );
				BS.instance.battleMgr.HandleRequestFrameActions( user.battle, request.From, request.To, ret );
				BS.instance.netSessionMgr.Send( user.gcSID, ret );
			}
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsCommitSnapshot( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			BSUser user = BS.instance.userMgr.GetUser( session.id );
			if ( user != null )
			{
				Protos.GC2BS_CommitSnapshot request = ( Protos.GC2BS_CommitSnapshot )message;
				BS.instance.battleMgr.HandleCommitSnapshot( user.battle, user.gcNID, request.Frame, request.Data );
			}
			return ErrorCode.Success;
		}

		public ErrorCode OnGc2BsEndBattle( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			BSUser user = BS.instance.userMgr.GetUser( session.id );
			if ( user != null )
			{
				Protos.GC2BS_EndBattle request = ( Protos.GC2BS_EndBattle )message;
				BS.instance.battleMgr.HandleBattleEnd( user.battle, user.gcNID, request );
			}
			return ErrorCode.Success;
		}
	}
}