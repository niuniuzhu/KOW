using Google.Protobuf;
using System;

namespace CentralServer.User
{
	public class CSUser
	{
		public enum State
		{
			Idle,
			Battle
		}

		/// <summary>
		/// 登陆密匙
		/// </summary>
		public uint ukey { get; }

		/// <summary>
		/// 玩家名字
		/// </summary>
		public string name { get; }

		/// <summary>
		/// 网络唯一ID
		/// </summary>
		public ulong gcNID;

		/// <summary>
		/// 玩家是否已连线
		/// </summary>
		public bool isConnected;

		/// <summary>
		/// 玩家所在房间ID
		/// </summary>
		public uint roomID;

		/// <summary>
		/// 玩家是否在房间内
		/// </summary>
		public bool IsInRoom;

		/// <summary>
		/// 当前连接的GS sessionID
		/// </summary>
		public uint gsSID;

		/// <summary>
		/// 登录BS使用的网络ID
		/// </summary>
		public ulong gcbsNID;

		/// <summary>
		/// 当前连接的BS sessionID
		/// </summary>
		public uint bsSID;

		/// <summary>
		/// 当前状态
		/// </summary>
		public State state;

		/// <summary>
		/// 构造函数
		/// </summary>
		/// <param name="ukey">玩家登陆ID</param>
		public CSUser( uint ukey )
		{
			this.ukey = ukey;
			//todo 从redis或db中取回数据

			this.name = string.Empty;
		}

		/// <summary>
		/// 发送消息
		/// </summary>
		/// <param name="msg">消息体</param>
		/// <param name="rpcHandler">RPC回调函数</param>
		public void Send( IMessage msg, Action<IMessage> rpcHandler = null ) => CS.instance.netSessionMgr.Send(
			this.gsSID, msg, rpcHandler, Protos.MsgOpts.Types.TransTarget.Gc, this.gcNID );

		/// <summary>
		/// 是否达到下线的条件
		/// </summary>
		public bool KeepOnline()
		{
			//todo 目前只需要判断是否在战场状态
			return this.state == State.Battle;
		}
	}
}