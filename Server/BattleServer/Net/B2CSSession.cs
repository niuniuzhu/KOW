using Core.Misc;
using Core.Net;
using Shared.Net;

namespace BattleServer.Net
{
	public class B2CSSession : CliSession
	{
		private long _pingTime;
		private long _reportTime;

		private B2CSSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.logicID}) connected." );

			this._pingTime = 0;
			this._reportTime = 0;
			this.ReportStateToCS();
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"CS({this.logicID}) disconnected with msg:{reason}." );
		}

		protected override void OnHeartBeat( long dt )
		{
			base.OnHeartBeat( dt );

			this._pingTime += dt;
			if ( this._pingTime >= BS.instance.config.pingInterval )
			{
				this._pingTime = 0;
				Protos.G_AskPing msg = ProtoCreator.Q_G_AskPing();
				msg.Time = TimeUtils.utcTime;
				this.Send( msg, this.OnGSAskPingRet );
			}

			this._reportTime += dt;
			if ( this._state == State.Connected && this._reportTime >= BS.instance.config.reportInterval )
			{
				this._reportTime = 0;
				this.ReportStateToCS();
			}
		}

		private void OnGSAskPingRet( Google.Protobuf.IMessage message )
		{
			long currTime = TimeUtils.utcTime;
			Protos.G_AskPingRet askPingRet = ( Protos.G_AskPingRet ) message;
			long lag = ( long ) ( ( currTime - askPingRet.Stime ) * 0.5 );
			long timeDiff = askPingRet.Time + lag - currTime;
			Logger.Log( $"cs ping ret, lag:{lag}, timediff:{timeDiff}" );
		}

		private void ReportStateToCS()
		{
			Protos.BS2CS_ReportState reportState = ProtoCreator.Q_BS2CS_ReportState();
			BSConfig config = BS.instance.config;
			reportState.BsInfo = new Protos.BSInfo
			{
				Id = config.id,
				Ip = config.externalIP,
				Port = config.externalPort,
				State = ( Protos.BSInfo.Types.State ) BS.instance.state
			};
			this.Send( reportState );
		}
	}
}