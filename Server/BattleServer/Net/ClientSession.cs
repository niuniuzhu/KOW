using BattleServer.Battle.Model;
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
				BS.instance.userMgr.Disconnect( this._gcNID );

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
			Protos.GC2BS_AskLogin login = ( Protos.GC2BS_AskLogin ) message;
			this._gcNID = login.SessionID;

			Protos.BS2GC_LoginRet loginRet = ProtoCreator.R_GC2BS_AskLogin( login.Opts.Pid );

			BSUser user = BS.instance.userMgr.Online( this._gcNID, this.id );
			if ( user != null )
			{
				//把战场的初始状态下发到GC
				Battle.Battle battle = BS.instance.battleManager.GetBattle( this._gcNID );
				loginRet.RndSeed = battle.rndSeed;
				loginRet.FrameRate = battle.frameRate;
				loginRet.KeyframeStep = battle.keyframeStep;
				loginRet.BattleTime = battle.battleTime;
				loginRet.MapID = battle.mapID;

				int count = battle.numPlayers;
				for ( int i = 0; i < count; i++ )
				{
					Player player = battle.GetPlayerAt( i );
					Protos.BS2GC_PlayerInfo playerInfo = new Protos.BS2GC_PlayerInfo();
					playerInfo.GcNID = player.id;
					playerInfo.Name = player.name;
					playerInfo.ActorID = player.actorID;
					player.attribute.Foreach( ( attr, value ) => { playerInfo.Attrs[( int ) attr] = ( float ) value; } );
					loginRet.PlayerInfo.Add( playerInfo );
				}
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
			BS.instance.battleManager.OnRequestSnapshot( this._gcNID, ( Protos.GC2BS_RequestSnapshot ) message );
			return ErrorCode.Success;
		}
	}
}