using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace LoginServer.Net
{
	public class L2CSSession : CliSession
	{
		private long _pingTime;

		private L2CSSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.ECs2LsGsinfos, this.OnCs2LsGsinfos );
			this._msgCenter.Register( Protos.MsgID.ECs2LsGsinfo, this.OnCs2LsGsinfo );
			this._msgCenter.Register( Protos.MsgID.ECs2LsGslost, this.OnCs2LsGslost );
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
				Protos.G_AskPing msg = ProtoCreator.Q_G_AskPing();
				msg.Time = TimeUtils.utcTime;
				this.Send( msg, this.OnCSAskPingRet );
			}
		}

		private void OnCSAskPingRet( Google.Protobuf.IMessage message )
		{
			long currTime = TimeUtils.utcTime;
			Protos.G_AskPingRet askPingRet = ( Protos.G_AskPingRet ) message;
			long lag = ( long ) ( ( currTime - askPingRet.Stime ) * 0.5 );
			long timeDiff = askPingRet.Time + lag - currTime;
			Logger.Log( $"cs ping ret, lag:{lag}, timediff:{timeDiff}" );
		}

		private ErrorCode OnCs2LsGsinfos( Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSInfos gsInfos = ( Protos.CS2LS_GSInfos ) message;
			foreach ( Protos.GSInfo gsInfo in gsInfos.GsInfo )
				this.GCStateReportHandler( gsInfo );
			return ErrorCode.Success;
		}

		private ErrorCode OnCs2LsGsinfo( Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSInfo gsInfo = ( Protos.CS2LS_GSInfo ) message;
			return this.GCStateReportHandler( gsInfo.GsInfo );
		}

		private ErrorCode OnCs2LsGslost( Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSLost gsLost = ( Protos.CS2LS_GSLost ) message;
			LS.instance.gsInfos.Remove( gsLost.Gsid );
			Logger.Log( $"GS lost:{gsLost.Gsid},count:{LS.instance.gsInfos.Count}" );
			return ErrorCode.Success;
		}

		private ErrorCode GCStateReportHandler( Protos.GSInfo newGSInfo )
		{
			if ( !LS.instance.gsInfos.TryGetValue( newGSInfo.Id, out GSInfo gsInfo ) )
			{
				gsInfo = new GSInfo();
				LS.instance.gsInfos[newGSInfo.Id] = gsInfo;
			}
			gsInfo.lid = newGSInfo.Id;
			gsInfo.name = newGSInfo.Name;
			gsInfo.ip = newGSInfo.Ip;
			gsInfo.port = newGSInfo.Port;
			gsInfo.password = newGSInfo.Password;
			gsInfo.state = ( GSInfo.State ) newGSInfo.State;
			Logger.Log( $"GS report:{gsInfo},count:{LS.instance.gsInfos.Count}" );
			return ErrorCode.Success;
		}
	}
}