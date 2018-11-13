using Core.Misc;
using Shared;
using Shared.Net;

namespace LoginServer.Biz
{
	public partial class BizProcessor
	{
		public void OnCSAskPingRet( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			long currTime = TimeUtils.utcTime;
			Protos.G_AskPingRet askPingRet = ( Protos.G_AskPingRet )message;
			long lag = ( long )( ( currTime - askPingRet.Stime ) * 0.5 );
			long timeDiff = askPingRet.Time + lag - currTime;
			Logger.Log( $"cs ping ret, lag:{lag}, timediff:{timeDiff}" );
		}

		public ErrorCode OnCs2LsGsinfos( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSInfos gsInfos = ( Protos.CS2LS_GSInfos )message;
			foreach ( Protos.GSInfo gsInfo in gsInfos.GsInfo )
				this.GCStateReportHandler( gsInfo );
			return ErrorCode.Success;
		}

		public ErrorCode OnCs2LsGsinfo( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSInfo gsInfo = ( Protos.CS2LS_GSInfo )message;
			return this.GCStateReportHandler( gsInfo.GsInfo );
		}

		public ErrorCode OnCs2LsGslost( NetSessionBase session, Google.Protobuf.IMessage message )
		{
			Protos.CS2LS_GSLost gsLost = ( Protos.CS2LS_GSLost )message;
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
			gsInfo.state = ( GSInfo.State )newGSInfo.State;
			Logger.Log( $"GS report:{gsInfo},count:{LS.instance.gsInfos.Count}" );
			return ErrorCode.Success;
		}
	}
}