using Core.Misc;
using Core.Net;
using Shared.Net;

namespace BattleServer.Net
{
	public class ClientSession : SecureSession
	{
		internal long activeTime;

		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			this._accreditedMsgID = Protos.MsgID.EGc2BsAskLogin;

			this.RegMsgHandler( Protos.MsgID.EGc2BsAskLogin, BS.instance.bizProcessor.OnGc2BsAskLogin );
			this.RegMsgHandler( Protos.MsgID.EGc2BsKeepAlive, BS.instance.bizProcessor.OnGc2BsKeepAlive );
			this.RegMsgHandler( Protos.MsgID.EGc2BsRequestSnapshot, BS.instance.bizProcessor.OnGc2BsRequestSnapShot );
			this.RegMsgHandler( Protos.MsgID.EGc2BsFrameAction, BS.instance.bizProcessor.OnGc2BsFrameAction );
			this.RegMsgHandler( Protos.MsgID.EGc2BsRequestFrameActions, BS.instance.bizProcessor.OnGc2BsRequestFrameActions );
			this.RegMsgHandler( Protos.MsgID.EGc2BsCommitSnapshot, BS.instance.bizProcessor.OnGc2BsCommitSnapshot );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"client({this.id}) connected" );

			this.activeTime = TimeUtils.utcTime;
		}

		protected override void OnClose( string reason )
		{
			BS.instance.bizProcessor.OnGCSessionClosed( this, reason );

			base.OnClose( reason );
			Logger.Info( $"client({this.id}) disconnected with msg:{reason}" );
		}

		protected override void OnHeartBeat( long dt )
		{
			if ( TimeUtils.utcTime > this.activeTime + BS.instance.config.gcLive )
				this.Close( true, "gc connection timeout" );
		}
	}
}