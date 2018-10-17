using System;
using Google.Protobuf;
using Shared;

namespace CentralServer.User
{
	public class CUser
	{
		/// <summary>
		/// 网络唯一ID
		/// </summary>
		public ulong gcNID { get; }

		/// <summary>
		/// 登陆密匙
		/// </summary>
		public uint ukey { get; }

		/// <summary>
		/// GS通道ID
		/// </summary>
		public uint gsNID { get; }

		/// <summary>
		/// 玩家名字
		/// </summary>
		public string name { get; }

		/// <summary>
		/// 玩家所在房间ID
		/// </summary>
		public uint roomID;

		/// <summary>
		/// 玩家是否在房间内
		/// </summary>
		public bool inRoom;

		/// <summary>
		/// 玩家所在战场ID
		/// </summary>
		public uint battleID;

		/// <summary>
		/// 玩家是否在战场
		/// </summary>
		public bool inBattle;

		public CUser( ulong gcNID, uint ukey, uint gsNID )
		{
			this.gcNID = gcNID;
			this.gsNID = gsNID;
			this.ukey = ukey;
			//todo 从redis或db中取回数据

			this.name = string.Empty;
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