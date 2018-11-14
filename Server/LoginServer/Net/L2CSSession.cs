using Core.Misc;
using Core.Net;
using Shared.Net;

namespace LoginServer.Net
{
	public class L2CSSession : CliSession
	{
		private long _pingTime;

		private L2CSSession( uint id, ProtoType type ) : base( id, type )
		{
			this.RegMsgHandler( Protos.MsgID.ECs2LsGsinfos, LS.instance.bizProcessor.OnCs2LsGsinfos );
			this.RegMsgHandler( Protos.MsgID.ECs2LsGsinfo, LS.instance.bizProcessor.OnCs2LsGsinfo );
			this.RegMsgHandler( Protos.MsgID.ECs2LsGslost, LS.instance.bizProcessor.OnCs2LsGslost );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.id}) connected." );
			this._pingTime = 0;
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"CS({this.id}) disconnected with msg:{reason}." );
		}

		protected override void OnHeartBeat( long dt )
		{
			base.OnHeartBeat( dt );
			this._pingTime += dt;
			if ( this._pingTime >= LS.instance.config.pingInterval )
			{
				this._pingTime = 0;
				LS.instance.bizProcessor.PingCS( this );
			}
		}
	}
}