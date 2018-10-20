using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace GateServer.Net
{
	public class ClientSession : SrvCliSession
	{
		private long _activeTime;
		private ulong _gcNID;

		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGc2GsAskLogin, this.OnGc2GsAskLogin );
			this._msgCenter.Register( Protos.MsgID.EGc2GsKeepAlive, this.OnGc2GsKeepAlive );
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

			//可能会移除失败,因为向CS请求验证失败后并没有添加客户端
			if ( GS.instance.RemoveClient( this._gcNID ) )
			{
				//移除成功,说明向CS请求验证成功,所以在连接关闭时需要通知CS
				//通知cs客户端丢失
				Protos.GS2CS_GCLost gcLost = ProtoCreator.Q_GS2CS_GCLost();
				gcLost.SessionID = this._gcNID;
				this.owner.Send( SessionType.ServerG2CS, gcLost );
			}

			this._activeTime = 0;
			this._gcNID = 0;
		}

		private ErrorCode OnGc2GsAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2GS_AskLogin login = ( Protos.GC2GS_AskLogin ) message;
			this._gcNID = login.SessionID;

			Protos.GS2CS_GCAskLogin gcAskLogin = ProtoCreator.Q_GS2CS_GCAskLogin();
			gcAskLogin.SessionID = this._gcNID;
			Logger.Log( $"client:{gcAskLogin.SessionID} ask login" );

			//向CS请求客户端登陆
			this.owner.Send( SessionType.ServerG2CS, gcAskLogin, msgRet =>
			{
				Protos.CS2GS_GCLoginRet csLoginRet = ( Protos.CS2GS_GCLoginRet ) msgRet;
				Protos.GS2GC_LoginRet gsLoginRet = ProtoCreator.R_GC2GS_AskLogin( login.Opts.Pid );
				switch ( csLoginRet.Result )
				{
					case Protos.CS2GS_GCLoginRet.Types.EResult.Success:
						GS.instance.AddClient( this._gcNID, this.id );
						gsLoginRet.Result = Protos.GS2GC_LoginRet.Types.EResult.Success;
						gsLoginRet.GcNID = csLoginRet.GcNID;
						gsLoginRet.GcState = ( Protos.GS2GC_LoginRet.Types.EGCCState ) csLoginRet.GcState;
						gsLoginRet.BsIP = csLoginRet.BsIP;
						gsLoginRet.BsPort = csLoginRet.BsPort;
						break;

					case Protos.CS2GS_GCLoginRet.Types.EResult.IllegalLogin:
						gsLoginRet.Result = Protos.GS2GC_LoginRet.Types.EResult.SessionExpire;
						this.DelayClose( 500, "client login failed" );
						break;
				}
				this.Send( gsLoginRet );
			} );
			return ErrorCode.Success;
		}

		private ErrorCode OnGc2GsKeepAlive( Google.Protobuf.IMessage message )
		{
			this._activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}

		protected override void OnHeartBeat( long dt )
		{
			if ( TimeUtils.utcTime > this._activeTime + GS.instance.config.gcLive )
				this.Close( "gc connection timeout" );
		}

		protected override void TransMsg( Protos.MsgOpts.Types.TransTarget transTarget, ulong transID, Google.Protobuf.IMessage message )
		{
			switch ( transTarget )
			{
				case Protos.MsgOpts.Types.TransTarget.Cs:
					this.owner.Send( SessionType.ServerG2CS, message, null, Protos.MsgOpts.Types.TransTarget.Undefine, this._gcNID );
					break;
			}
		}
	}
}