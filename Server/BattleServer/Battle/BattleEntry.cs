using BattleServer.User;

namespace BattleServer.Battle
{
	public struct BattleEntry
	{
		public int rndSeed;
		public int mapID;
		public BSUser[][] users;
	}
}