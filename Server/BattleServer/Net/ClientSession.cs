using BattleServer.User;
using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace BattleServer.Net
{
	public class ClientSession : SrvCliSession
	{
		private long _activeTime;
		private ulong _gcNID;

		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGc2BsAskLogin, this.OnGc2BsAskLogin );
			this._msgCenter.Register( Protos.MsgID.EGc2BsKeepAlive, this.OnGc2BsKeepAlive );
			this._msgCenter.Register( Protos.MsgID.EGc2BsRequestSnapshot, this.OnGc2BsRequestSnapShot );
			this._msgCenter.Register( Protos.MsgID.EGc2BsFrameAction, this.OnGc2BsFrameAction );
			this._msgCenter.Register( Protos.MsgID.EGc2BsRequestFrameActions, this.OnGc2BsRequestFrameActions );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"client({this.id}) connected" );
			this._activeTime = TimeUtils.utcTime;
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"client({this.id}) disconnected with msg:{reason}" );

			if ( reason != "offline" )
				BS.instance.userMgr.OnDisconnect( this._gcNID );

			this._activeTime = 0;
			this._gcNID = 0;
		}

		protected override void OnHeartBeat( long dt )
		{
			if ( TimeUtils.utcTime > this._activeTime + BS.instance.config.gcLive )
				this.Close( "gc connection timeout" );
		}

		private ErrorCode OnGc2BsAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_AskLogin login = ( Protos.GC2BS_AskLogin )message;
			this._gcNID = login.SessionID;

			Protos.BS2GC_LoginRet loginRet = ProtoCreator.R_GC2BS_AskLogin( login.Opts.Pid );

			BSUser user = BS.instance.userMgr.Online( this._gcNID, this.id );
			if ( user != null )
			{
				//把战场的初始状态下发到GC
				loginRet.RndSeed = user.battle.rndSeed;
				loginRet.FrameRate = user.battle.frameRate;
				loginRet.KeyframeStep = user.battle.keyframeStep;
				loginRet.BattleTime = user.battle.battleTime;
				loginRet.MapID = user.battle.mapID;
				loginRet.Result = Protos.Global.Types.ECommon.Success;
			}
			else
			{
				loginRet.Result = Protos.Global.Types.ECommon.Failed;
				this.DelayClose( 500, "client login failed" );
			}
			this.Send( loginRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnGc2BsKeepAlive( Google.Protobuf.IMessage message )
		{
			this._activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}

		private ErrorCode OnGc2BsRequestSnapShot( Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_RequestSnapshot request = ( Protos.GC2BS_RequestSnapshot )message;
			Protos.BS2GC_RequestSnapshotRet ret = ProtoCreator.R_GC2BS_RequestSnapshot( request.Opts.Pid );
			BS.instance.battleManager.HandleRequestSnapshot( this._gcNID, request, ret );
			this.Send( ret );
			return ErrorCode.Success;
		}

		private ErrorCode OnGc2BsFrameAction( Google.Protobuf.IMessage message )
		{
			BS.instance.battleManager.HandleFrameAction( this._gcNID, ( Protos.GC2BS_FrameAction )message );
			return ErrorCode.Success;
		}

		private ErrorCode OnGc2BsRequestFrameActions( Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_RequestFrameActions request = ( Protos.GC2BS_RequestFrameActions )message;
			Protos.BS2GC_RequestFrameActionsRet ret = ProtoCreator.R_GC2BS_RequestFrameActions( request.Opts.Pid );
			BS.instance.battleManager.HandleRequestFrameActions( this._gcNID, request.From, request.To, ret );
			this.Send( ret );
			return ErrorCode.Success;
		}
	}
}