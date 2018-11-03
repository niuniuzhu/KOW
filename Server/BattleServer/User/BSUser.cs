﻿using Google.Protobuf;

namespace BattleServer.User
{
	public class BSUser
	{
		/// <summary>
		/// 网络ID
		/// 对每个账号每个BS服唯一
		/// </summary>
		public ulong gcNID;

		/// <summary>
		/// GC连接的sessionID
		/// </summary>
		public uint gcSID;

		/// <summary>
		/// 是否连线中
		/// </summary>
		public bool isConnected;

		public BSUser( ulong gcNID )
		{
			this.gcNID = gcNID;
		}

		/// <summary>
		/// 发送消息
		/// </summary>
		/// <param name="msg">消息体</param>
		public bool Send( IMessage msg )
		{
			if ( !this.isConnected )
				return false;
			return BS.instance.netSessionMgr.Send( this.gcSID, msg, null, Protos.MsgOpts.Types.TransTarget.Gc, this.gcNID );
		}
	}
}