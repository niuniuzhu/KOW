using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace BattleServer.Net
{
	public class ClientSession : SrvCliSession
	{
		private long _activeTime;
		private ulong _sid;

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

			//通知cs客户端丢失
			Protos.BS2CS_GCLost gcLost = ProtoCreator.Q_BS2CS_GCLost();
			gcLost.SessionID = this._sid;
			this.owner.Send( SessionType.ServerB2CS, gcLost );

			this._activeTime = 0;
			this._sid = 0;
		}

		private ErrorCode OnGc2BsAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_AskLogin login = ( Protos.GC2BS_AskLogin ) message;
			this._sid = login.SessionID;

			Protos.BS2CS_GCAskLogin gcAskLogin = ProtoCreator.Q_BS2CS_GCAskLogin();
			gcAskLogin.SessionID = this._sid;
			Logger.Log( $"client:{gcAskLogin.SessionID} ask login" );

			//向CS请求客户端登陆
			this.owner.Send( SessionType.ServerB2CS, gcAskLogin, msgRet =>
			{
				Protos.BS2GC_LoginRet gsLoginRet = ProtoCreator.R_GC2BS_AskLogin( login.Opts.Pid );
				Protos.CS2BS_GCLoginRet csLoginRet = ( Protos.CS2BS_GCLoginRet ) msgRet;
				switch ( csLoginRet.Result )
				{
					case Protos.CS2BS_GCLoginRet.Types.EResult.Success:
						gsLoginRet.Result = Protos.BS2GC_LoginRet.Types.EResult.Success;
						break;
					case Protos.CS2BS_GCLoginRet.Types.EResult.Failed:
						gsLoginRet.Result = Protos.BS2GC_LoginRet.Types.EResult.Failed;
						this.DelayClose( 500, "client login failed" );
						break;
				}
				this.Send( gsLoginRet );
			} );
			return ErrorCode.Success;
		}

		private ErrorCode OnGc2BsKeepAlive( Google.Protobuf.IMessage message )
		{
			this._activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}

		protected override void OnHeartBeat( long dt )
		{
			if ( TimeUtils.utcTime > this._activeTime + BS.instance.config.gcLive )
				this.Close( "gc connection timeout" );
		}
	}
}