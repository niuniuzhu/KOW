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

			BS.instance.userMgr.RemoveClient( this._gcNID );

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

			if ( this.HandleGCLogin( this._gcNID ) )
				loginRet.Result = Protos.BS2GC_LoginRet.Types.EResult.Success;
			else
			{
				loginRet.Result = Protos.BS2GC_LoginRet.Types.EResult.Failed;
				this.DelayClose( 500, "client login failed" );
			}
			this.Send( loginRet );
			return ErrorCode.Success;
		}

		private bool HandleGCLogin( ulong gcNID )
		{
			//检查客户端是否在等待房间
			if ( BS.instance.waitingRoomMgr.CheckClient( this._gcNID ) )
			{
				Logger.Log( $"client:{gcNID} join room" );
				BS.instance.userMgr.AddClient( this._gcNID, this.id );
				//在等待房间加入客户端
				BS.instance.waitingRoomMgr.OnGCLogin( this._gcNID );
				return true;
			}
			//检查客户端是否在战场
			if ( BS.instance.battleManager.CheckClient( this._gcNID ) )
			{
				Logger.Log( $"client:{gcNID} join battle" );
				BS.instance.userMgr.AddClient( this._gcNID, this.id );
				return true;
			}
			return false;
		}

		private ErrorCode OnGc2BsKeepAlive( Google.Protobuf.IMessage message )
		{
			this._activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}
	}
}