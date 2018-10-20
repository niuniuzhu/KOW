using CentralServer.Net;
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
		/// 网络唯一ID
		/// </summary>
		public ulong gcNID { get; }

		/// <summary>
		/// 登陆密匙
		/// </summary>
		public uint ukey { get; }

		/// <summary>
		/// 玩家名字
		/// </summary>
		public string name { get; }

		/// <summary>
		/// 玩家是否已连线
		/// </summary>
		public bool IsConnected;

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

		/// <summary>
		/// 当前连接的GS实例
		/// </summary>
		public GateSession gsSession;

		/// <summary>
		/// 当前连接的BS逻辑ID
		/// </summary>
		public uint bsNID;

		/// <summary>
		/// 当前状态
		/// </summary>
		public State state;

		/// <summary>
		/// 构造函数
		/// </summary>
		/// <param name="gcNID">玩家网络ID</param>
		/// <param name="ukey">玩家登陆ID</param>
		public CSUser( ulong gcNID, uint ukey )
		{
			this.gcNID = gcNID;
			this.ukey = ukey;
			//todo 从redis或db中取回数据

			this.name = string.Empty;
		}

		/// <summary>
		/// 发送消息
		/// </summary>
		/// <param name="msg">消息体</param>
		/// <param name="rpcHandler">RPC回调函数</param>
		public void Send( IMessage msg, Action<IMessage> rpcHandler = null ) =>
			this.gsSession?.Send( msg, rpcHandler, Protos.MsgOpts.Types.TransTarget.Gc, this.gcNID );

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