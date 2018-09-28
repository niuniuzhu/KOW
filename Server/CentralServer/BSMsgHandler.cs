using Shared;

namespace CentralServer
{
	public partial class CS
	{
		public ErrorCode BStateReportHandler( Protos.BSInfo gsInfoRecv )
		{
			bool hasRecord = this.nIDToBSInfos.TryGetValue( gsInfoRecv.Id, out BSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new BSInfo();
				this.nIDToBSInfos[gsInfoRecv.Id] = gsInfo;
			}
			//更新BS信息
			gsInfo.id = gsInfoRecv.Id;
			gsInfo.ip = gsInfoRecv.Ip;
			gsInfo.port = gsInfoRecv.Port;
			gsInfo.state = ( BSInfo.State )gsInfoRecv.State;
			Core.Misc.Logger.Log( $"report from BS:{gsInfo}" );
			return ErrorCode.Success;
		}

		public ErrorCode BSDisconnectHandler( uint gsNID )
		{
			bool result = this.nIDToBSInfos.Remove( gsNID );
			System.Diagnostics.Debug.Assert( result, $"gsNID:{gsNID} not found" );
			if ( result )
			{
				//踢出所有连接到该BS的玩家
				this.userMgr.KickUsers( gsNID );
			}
			return ErrorCode.Success;
		}

		public ErrorCode HandleGCAskLoginFromBS( ulong gcNID, uint gsNID )
		{
			if ( !this.gcNIDMgr.Check( gcNID ) )
				return ErrorCode.InvalidGcNID;
			uint ukey = this.gcNIDMgr.GetUKey( gcNID );
			this.gcNIDMgr.Remove( gcNID );
			return this.userMgr.UserOnline( gcNID, ukey, gsNID, out _ );
		}

		public ErrorCode HandleBSGCLost( ulong gcNID )
		{
			return this.userMgr.UserOffline( gcNID );
		}
	}
}