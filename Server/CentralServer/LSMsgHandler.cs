using Shared;
using System.Collections.Generic;

namespace CentralServer
{
	public partial class CS
	{
		public void NotifyGSInfosToLS( uint sessionID )
		{
			Protos.CS2LS_GSInfos gsInfos = ProtoCreator.Q_CS2LS_GSInfos();
			foreach ( KeyValuePair<uint, GSInfo> kv in this.nIDToGSInfos )
			{
				GSInfo mGSInfo = kv.Value;
				Protos.GSInfo gsInfo = new Protos.GSInfo
				{
					Id = mGSInfo.id,
					Name = mGSInfo.name,
					Ip = mGSInfo.ip,
					Port = mGSInfo.port,
					Password = mGSInfo.password,
					State = ( Protos.GSInfo.Types.State )mGSInfo.state
				};
				gsInfos.GsInfo.Add( gsInfo );
			}
			this.netSessionMgr.Send( sessionID, gsInfos );
		}
	}
}