using System;
using Google.Protobuf;
using Shared;

namespace CentralServer.User
{
	public class CUser
	{
		public ulong gcNID { get; }
		public uint ukey { get; }
		public uint gsNID { get; }

		/// <summary>
		/// 玩家所在房间
		/// </summary>
		public uint room;

		/// <summary>
		/// 玩家是否在房间内
		/// </summary>
		public bool inRoom;

		/// <summary>
		/// 玩家名字
		/// </summary>
		public string name;

		public CUser( ulong gcNID, uint ukey, uint gsNID )
		{
			this.gcNID = gcNID;
			this.gsNID = gsNID;
			this.ukey = ukey;
			//todo 从redis或db中取回数据

			//CS.instance.userMgr.userNameToGcNID[this.name] = this.gcNID;
		}

		public ErrorCode Send( IMessage msg, Action<IMessage> rpcHandler = null )
		{
			if ( !CS.instance.LIDToGSInfos.TryGetValue( this.gsNID, out GSInfo gsInfo ) )
				return ErrorCode.InvalidGsNID;
			CS.instance.netSessionMgr.Send( gsInfo.sessionID, msg, rpcHandler );
			return ErrorCode.Success;
		}
	}
}