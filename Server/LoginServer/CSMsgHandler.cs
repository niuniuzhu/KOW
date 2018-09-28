using Core.Misc;
using Shared;

namespace LoginServer
{
	public partial class LS
	{
		public ErrorCode GCStateReportHandler( Protos.GSInfo newGSInfo )
		{
			if ( !this.gsInfos.TryGetValue( newGSInfo.Id, out GSInfo gsInfo ) )
			{
				gsInfo = new GSInfo();
				this.gsInfos[newGSInfo.Id] = gsInfo;
			}
			gsInfo.id = newGSInfo.Id;
			gsInfo.name = newGSInfo.Name;
			gsInfo.ip = newGSInfo.Ip;
			gsInfo.port = newGSInfo.Port;
			gsInfo.password = newGSInfo.Password;
			gsInfo.state = ( GSInfo.State )newGSInfo.State;
			Logger.Log( $"GS report:{gsInfo},count:{this.gsInfos.Count}" );
			return ErrorCode.Success;
		}

		public ErrorCode GSLostHandler( uint gsID )
		{
			this.gsInfos.Remove( gsID );
			Logger.Log( $"GS lost:{gsID},count:{this.gsInfos.Count}" );
			return ErrorCode.Success;
		}
	}
}