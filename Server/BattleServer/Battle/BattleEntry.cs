namespace BattleServer.Battle
{
	public struct BattleEntry
	{
		public class Player
		{
			public ulong gcNID;
			public string nickname;
			public string avatar;
			public byte gender;
			public int honor;
			public int actorID;
			public int team;
		}

		public int rndSeed;
		public int mapID;
		public Player[] players;
	}
}