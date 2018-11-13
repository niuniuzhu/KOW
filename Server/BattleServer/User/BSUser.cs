using Google.Protobuf;

namespace BattleServer.User
{
	public class BSUser
	{
		/// <summary>
		/// 网络ID
		/// 对每个账号每个BS服唯一
		/// </summary>
		public readonly ulong gcNID;

		/// <summary>
		/// 玩家所在战场
		/// </summary>
		public readonly Battle.Battle battle;

		/// <summary>
		/// GC连接的sessionID
		/// </summary>
		public uint gcSID { get; private set; }

		/// <summary>
		/// 是否连线中
		/// </summary>
		public bool isOnline { get; private set; }

		public BSUser( ulong gcNID, Battle.Battle battle )
		{
			this.gcNID = gcNID;
			this.battle = battle;
		}

		/// <summary>
		/// 发送消息
		/// </summary>
		/// <param name="msg">消息体</param>
		public bool Send( IMessage msg )
		{
			if ( !this.isOnline )
				return false;
			return BS.instance.netSessionMgr.Send( this.gcSID, msg, null, Protos.MsgOpts.Types.TransTarget.Gc, this.gcNID );
		}

		/// <summary>
		/// 处理玩家上线
		/// </summary>
		public void Online( uint gcSID )
		{
			this.gcSID = gcSID;
			this.isOnline = true;
		}

		/// <summary>
		/// 处理玩家下线
		/// </summary>
		public void Offline()
		{
			this.gcSID = 0;
			this.isOnline = false;
		}

		public override string ToString() => $"gsNID:{this.gcNID}";
	}
}