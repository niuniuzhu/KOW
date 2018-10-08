using Google.Protobuf;
using Shared;

namespace CentralServer.User
{
	public class CUser
	{
		public ulong gcNID { get; }
		public uint ukey { get; }
		public uint gsNID { get; }

		public string name;

		public CUser( ulong gcNID, uint ukey, uint gsNID )
		{
			this.gcNID = gcNID;
			this.gsNID = gsNID;
			this.ukey = ukey;
			//todo 从redis或db中取回数据

			//CS.instance.userMgr.userNameToGcNID[this.name] = this.gcNID;
		}

		public ErrorCode Send( IMessage msg )
		{
			if ( !CS.instance.nIDToGSInfos.TryGetValue( this.gsNID, out GSInfo gsInfo ) )
				return ErrorCode.InvalidGsNID;
			CS.instance.netSessionMgr.Send( gsInfo.sessionID, msg );
			return ErrorCode.Success;
		}
	}
}