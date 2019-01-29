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
		public readonly int team;
		public readonly string nickname;
		public readonly int actorID;
		public readonly string avatar;
		public readonly byte gender;
		public readonly int money;
		public readonly int diamoned;
		public readonly int honor;

		/// <summary>
		/// GC连接的sessionID
		/// </summary>
		public uint gcSID { get; private set; }

		/// <summary>
		/// 是否连线中
		/// </summary>
		public bool isOnline { get; private set; }

		/// <summary>
		/// 玩家所在战场
		/// </summary>
		public readonly Battle.Battle battle;

		public BSUser( Protos.CS2BS_PlayerInfo playerInfo, Battle.Battle battle )
		{
			this.gcNID = playerInfo.GcNID;
			this.team = playerInfo.Team;
			this.nickname = playerInfo.Nickname;
			this.avatar = playerInfo.Avatar;
			this.actorID = playerInfo.ActorID;
			this.gender = ( byte )playerInfo.Gender;
			this.money = playerInfo.Money;
			this.diamoned = playerInfo.Diamoned;
			this.honor = playerInfo.Honor;
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