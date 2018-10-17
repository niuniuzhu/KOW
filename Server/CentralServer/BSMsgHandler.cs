using Shared;

namespace CentralServer
{
	public partial class CS
	{
		public ErrorCode BStateReportHandler( Protos.BSInfo gsInfoRecv, uint nid )
		{
			bool hasRecord = this.LIDToBSInfos.TryGetValue( gsInfoRecv.Id, out BSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new BSInfo();
				this.LIDToBSInfos[gsInfoRecv.Id] = gsInfo;
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

		public ErrorCode BSDisconnectHandler( uint gsNID )
		{
			bool result = this.LIDToBSInfos.Remove( gsNID );
			System.Diagnostics.Debug.Assert( result, $"gsNID:{gsNID} not found" );
			if ( result )
			{
				//踢出所有连接到该BS的玩家
				this.userMgr.KickUsers( gsNID );
			}
			return ErrorCode.Success;
		}
	}
}