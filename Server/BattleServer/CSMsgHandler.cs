using Shared.Net;

namespace BattleServer
{
	public partial class BS
	{
		public void ReportStateToCS()
		{
			Protos.BS2CS_ReportState reportState = ProtoCreator.Q_BS2CS_ReportState();
			reportState.BsInfo = new Protos.BSInfo
			{
				Id = this.config.id,
				Ip = this.config.externalIP,
				Port = this.config.externalPort,
				State = ( Protos.BSInfo.Types.State )this.state
			};
			this.netSessionMgr.Send( SessionType.ServerB2CS, reportState );
		}
	}
}