using Google.Protobuf;

namespace CentralServer.User
{
	public class CSUser
	{
		/// <summary>
		/// 登陆密匙
		/// </summary>
		public uint ukey { get; private set; }
		/// <summary>
		/// 网络唯一ID
		/// </summary>
		public ulong gcNID { get; private set; }
		/// <summary>
		/// 玩家是否已连线
		/// </summary>
		public bool isConnected { get; private set; }
		/// <summary>
		/// 当前连接的GS sessionID
		/// </summary>
		public uint gsSID { get; private set; }
		/// <summary>
		/// 当前连接的GS逻辑ID
		/// </summary>
		public uint gsLID { get; private set; }
		/// <summary>
		/// 登陆时间
		/// 用于判断凭证是否过期
		/// </summary>
		public long loginTime { get; private set; }
		/// <summary>
		/// BS SessionID
		/// </summary>
		public uint bsSID { get; private set; }
		/// <summary>
		/// BS逻辑ID
		/// </summary>
		public uint bsLID { get; private set; }
		/// <summary>
		/// 是否在战场
		/// </summary>
		public bool isInBattle { get; private set; }
		/// <summary>
		/// 玩家名字
		/// </summary>
		public string name = string.Empty;

		/// <summary>
		/// 发送消息
		/// </summary>
		/// <param name="msg">消息体</param>
		public void Send( IMessage msg ) => CS.instance.netSessionMgr.Send(
			this.gsSID, msg, null, Protos.MsgOpts.Types.TransTarget.Gc, this.gcNID );

		/// <summary>
		/// 是否达到下线的条件
		/// </summary>
		public bool CanOffline()
		{
			//todo 目前只需要判断是否在战场状态
			return this.gsSID == 0;
		}

		public void OnCreate( uint ukey, ulong gcNID, long loginTime )
		{
			this.ukey = ukey;
			this.gcNID = gcNID;
			this.loginTime = loginTime;
		}

		/// <summary>
		/// 处理玩家上线
		/// </summary>
		public void Online( uint sid, uint lid )
		{
			this.isConnected = true;
			this.gsSID = sid;
			this.gsLID = lid;
		}

		/// <summary>
		/// 处理玩家下线
		/// </summary>
		public void Offline()
		{
			this.gsSID = 0;
			this.isConnected = false;
		}

		/// <summary>
		/// 设置玩家进入战场
		/// </summary>
		public void EnterBattle( uint bsSID, uint bsLID )
		{
			this.bsSID = bsSID;
			this.bsLID = bsLID;
			this.isInBattle = true;
		}

		/// <summary>
		/// 设置玩家离开战场
		/// </summary>
		public void LeaveBattle()
		{
			this.isInBattle = false;
			this.bsSID = 0;
			this.bsLID = 0;
		}
	}
}