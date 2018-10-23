using BattleServer.User;

namespace BattleServer.Battle
{
	public struct BattleEntry
	{
		public int frameRate;
		public int keyframeStep;
		public int mapID;
		public Player[] players;
		public int battleTime;
	}

	public class Player
	{
		/// <summary>
		/// 所属玩家实例
		/// </summary>
		public BSUser user;
		/// <summary>
		/// 网络ID
		/// </summary>
		public ulong gcNID;
		//以下是属性
		public string name;
		public int actorID;
	}
}