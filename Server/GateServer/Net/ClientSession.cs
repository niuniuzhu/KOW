using Core.Misc;
using Core.Net;
using Shared.Net;

namespace GateServer.Net
{
	public class ClientSession : SecureSession
	{
		internal long activeTime;

		private uint _csSID;

		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			this._accreditedMsgID = Protos.MsgID.EGc2GsAskLogin;

			this.RegMsgHandler( Protos.MsgID.EGc2GsAskLogin, GS.instance.bizProcessor.OnGC2GSAskLogin );
			this.RegMsgHandler( Protos.MsgID.EGc2GsKeepAlive, GS.instance.bizProcessor.OnGc2GsKeepAlive );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"client({this.id}) connected" );

			this.activeTime = TimeUtils.utcTime;
			this._csSID = this.owner.GetSession( SessionType.ServerG2CS ).id;
		}

		protected override void OnClose( string reason )
		{
			GS.instance.bizProcessor.OnGCSessionClosed( this, reason );

			base.OnClose( reason );
			Logger.Info( $"client({this.id}) disconnected with msg:{reason}" );
		}

		protected override void OnHeartBeat( long dt )
		{
			if ( TimeUtils.utcTime > this.activeTime + GS.instance.config.gcLive )
				this.Close( true, "gc connection timeout" );
		}

		protected override void TransMsg( Protos.MsgOpts.Types.TransTarget transTarget, ulong transID, Google.Protobuf.IMessage message )
		{
			switch ( transTarget )
			{
				case Protos.MsgOpts.Types.TransTarget.Cs:
					GS.instance.userMgr.GetGcNID( this.id, out ulong gcNID );
					this.owner.Send( this._csSID, message, null, Protos.MsgOpts.Types.TransTarget.Undefine, gcNID );
					break;
			}
		}
	}
}