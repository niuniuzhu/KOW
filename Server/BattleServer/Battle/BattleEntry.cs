namespace BattleServer.Battle
{
	public struct BattleEntry
	{
		public class Player
		{
			public ulong gcNID;
			public string name;
			public int actorID;
			public int team;
		}

		public int rndSeed;
		public int mapID;
		public Player[] players;
	}
}