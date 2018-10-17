using Shared;
using Shared.Net;

namespace CentralServer
{
	public partial class CS
	{
		public ErrorCode GStateReportHandler( Protos.GSInfo gsInfoRecv, uint sessionID )
		{
			bool hasRecord = this.LIDToGSInfos.TryGetValue( gsInfoRecv.Id, out GSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new GSInfo();
				this.LIDToGSInfos[gsInfoRecv.Id] = gsInfo;
			}
			//更新GS信息
			gsInfo.lid = gsInfoRecv.Id;
			gsInfo.sessionID = sessionID;
			gsInfo.name = gsInfoRecv.Name;
			gsInfo.ip = gsInfoRecv.Ip;
			gsInfo.port = gsInfoRecv.Port;
			gsInfo.password = gsInfoRecv.Password;
			gsInfo.state = ( GSInfo.State )gsInfoRecv.State;
			Core.Misc.Logger.Log( $"report from GS:{gsInfo}" );

			//转发到LS
			Protos.CS2LS_GSInfo nGSInfo = ProtoCreator.Q_CS2LS_GSInfo();
			nGSInfo.GsInfo = new Protos.GSInfo()
			{
				Id = gsInfo.lid,
				Name = gsInfo.name,
				Ip = gsInfo.ip,
				Port = gsInfo.port,
				Password = gsInfo.password,
				State = ( Protos.GSInfo.Types.State )gsInfo.state
			};
			this.netSessionMgr.Send( SessionType.ServerLS, nGSInfo );
			return ErrorCode.Success;
		}

		public ErrorCode GSDisconnectHandler( uint gsNID )
		{
			bool result = this.LIDToGSInfos.Remove( gsNID );
			System.Diagnostics.Debug.Assert( result, $"gsNID:{gsNID} not found" );
			//踢出所有连接到该GS的玩家
			this.userMgr.KickUsers( gsNID );
			//通知LS有GS断开连接了
			Protos.CS2LS_GSLost gsLost = ProtoCreator.Q_CS2LS_GSLost();
			gsLost.Gsid = gsNID;
			this.netSessionMgr.Send( SessionType.ServerLS, gsLost );
			return ErrorCode.Success;
		}
	}
}