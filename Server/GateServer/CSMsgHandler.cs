using Shared.Net;

namespace GateServer
{
	public partial class GS
	{
		public void ReportStateToCS()
		{
			Protos.GS2CS_ReportState reportState = ProtoCreator.Q_GS2CS_ReportState();
			reportState.GsInfo = new Protos.GSInfo
			{
				Id = this.config.gsID,
				Name = this.config.name,
				Ip = this.config.externalIP,
				Port = this.config.externalPort,
				Password = this.config.password,
				State = ( Protos.GSInfo.Types.State )this.state
			};
			this.netSessionMgr.Send( SessionType.ServerG2CS, reportState );
		}
	}
}