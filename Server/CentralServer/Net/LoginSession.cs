using CentralServer.User;
using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace CentralServer.Net
{
	public class LoginSession : SrvCliSession
	{
		protected LoginSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGAskPing, this.OnLSAskPing );
			this._msgCenter.Register( Protos.MsgID.ELs2CsGclogin, this.OnLs2CsGclogin );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"LS({this.id}) connected" );
			CS.instance.NotifyGSInfosToLS( this.id );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"LS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnLSAskPing( Google.Protobuf.IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing )message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			this.Send( askPingRet );
			return ErrorCode.Success;
		}

		/// <summary>
		/// LS通知CS有客户端登录成功
		/// </summary>
		private ErrorCode OnLs2CsGclogin( Google.Protobuf.IMessage message )
		{
			Protos.LS2CS_GCLogin gcLogin = ( Protos.LS2CS_GCLogin )message;
			//todo 这里应立即创建一个玩家
			CSUser user = CS.instance.userMgr.CreateUser( gcLogin.Ukey, gcLogin.SessionID );


			Protos.CS2LS_GCLoginRet gcLoginRet = ProtoCreator.R_LS2CS_GCLogin( gcLogin.Opts.Pid );
			gcLoginRet.Result = user != null
									? Protos.CS2LS_GCLoginRet.Types.EResult.Success
									: Protos.CS2LS_GCLoginRet.Types.EResult.Failed;
			this.Send( gcLoginRet );
			return ErrorCode.Success;
		}
	}
}