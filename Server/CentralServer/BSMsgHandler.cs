using Shared;

namespace CentralServer
{
	public partial class CS
	{
		public ErrorCode BStateReportHandler( Protos.BSInfo gsInfoRecv, uint nid )
		{
			bool hasRecord = this.lIDToBSInfos.TryGetValue( gsInfoRecv.Id, out BSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new BSInfo();
				this.lIDToBSInfos[gsInfoRecv.Id] = gsInfo;
			}
			//更新BS信息
			gsInfo.lid = gsInfoRecv.Id;
			gsInfo.sessionID = nid;
			gsInfo.ip = gsInfoRecv.Ip;
			gsInfo.port = gsInfoRecv.Port;
			gsInfo.state = ( BSInfo.State )gsInfoRecv.State;
			Core.Misc.Logger.Log( $"report from BS:{gsInfo}" );
			return ErrorCode.Success;
		}
	}
}