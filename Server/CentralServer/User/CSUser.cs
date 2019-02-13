using Google.Protobuf;

namespace CentralServer.User
{
	public class CSUser
	{
		/// <summary>
		/// 渠道
		/// </summary>
		public CSUserMgr.Channel channel { get; private set; }
		/// <summary>
		/// 浏览器
		/// </summary>
		public CSUserMgr.Browser browser { get; private set; }
		/// <summary>
		/// 平台
		/// </summary>
		public CSUserMgr.Platform platform { get; private set; }
		/// <summary>
		/// 登陆密匙
		/// </summary>
		public uint ukey { get; private set; }
		/// <summary>
		/// 网络唯一ID
		/// </summary>
		public ulong gcNID { get; private set; }
		/// <summary>
		/// 微信登陆的openID
		/// </summary>
		public string openID { get; private set; }
		/// <summary>
		/// 微信登陆的sessionKey
		/// </summary>
		public string sessionKey { get; private set; }
		/// <summary>
		/// 微信登陆的unionID
		/// </summary>
		public string unionID { get; private set; }
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
		/// 当前连接的BS SessionID
		/// </summary>
		public uint bsSID { get; private set; }
		/// <summary>
		/// BS逻辑ID
		/// </summary>
		public uint bsLID { get; private set; }
		/// <summary>
		/// 玩家所在的战场ID
		/// </summary>
		public uint bid { get; private set; }
		/// <summary>
		/// 是否在战场
		/// </summary>
		public bool isInBattle { get; private set; }
		/// <summary>
		/// 玩家名字
		/// </summary>
		public string nickname { get; private set; }
		/// <summary>
		/// 头像地址
		/// </summary>
		public string avatar { get; private set; }
		/// <summary>
		/// 性别
		/// </summary>
		public byte gender { get; private set; }
		/// <summary>
		/// 金币
		/// </summary>
		public int money { get; set; }
		/// <summary>
		/// 钻石
		/// </summary>
		public int diamoned { get; set; }
		/// <summary>
		/// 积分
		/// </summary>
		public int rank { get; set; }
		/// <summary>
		/// 经验值
		/// </summary>
		public uint exp { get; set; }

		/// <summary>
		/// 发送消息
		/// </summary>
		/// <param name="msg">消息体</param>
		public void Send( IMessage msg ) => CS.instance.netSessionMgr.Send(
			this.gsSID, msg, null, Protos.MsgOpts.Types.TransTarget.Gc, this.gcNID );

		internal void OnCreate( Protos.LS2CS_GCLogin gcLogin, long loginTime )
		{
			this.channel = ( CSUserMgr.Channel )gcLogin.Channel;
			this.browser = ( CSUserMgr.Browser )gcLogin.Browser;
			this.platform = ( CSUserMgr.Platform )gcLogin.Platform;
			this.ukey = gcLogin.Ukey;
			this.gcNID = gcLogin.GcNID;
			this.openID = gcLogin.Id;
			this.sessionKey = gcLogin.SessionKey;
			this.unionID = gcLogin.UnionID;
			this.loginTime = loginTime;
			this.nickname = gcLogin.Nickname;
			this.avatar = gcLogin.Avatar;
			this.gender = ( byte )gcLogin.Gender;
			this.money = gcLogin.Money;
			this.diamoned = gcLogin.Diamoned;
			this.rank = gcLogin.Rank;
			this.exp = gcLogin.Exp;
		}

		/// <summary>
		/// 处理玩家上线
		/// </summary>
		internal void Online( uint sid, uint lid )
		{
			this.isConnected = true;
			this.gsSID = sid;
			this.gsLID = lid;
		}

		/// <summary>
		/// 处理玩家下线
		/// </summary>
		internal void Offline()
		{
			this.gsSID = 0;
			this.isConnected = false;
		}

		/// <summary>
		/// 设置玩家进入战场
		/// </summary>
		internal void EnterBattle( uint bsSID, uint bsLID, uint bid )
		{
			this.bsSID = bsSID;
			this.bsLID = bsLID;
			this.bid = bid;
			this.isInBattle = true;
		}

		/// <summary>
		/// 设置玩家离开战场
		/// </summary>
		internal void LeaveBattle()
		{
			this.isInBattle = false;
			this.bsSID = 0;
			this.bsLID = 0;
			this.bid = 0;
		}

		public override string ToString() => $"ukey:{this.ukey},gcNID:{this.gcNID},online:{this.isConnected}";
	}
}