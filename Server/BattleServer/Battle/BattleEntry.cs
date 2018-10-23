using System.Collections.Generic;

namespace BattleServer.Battle
{
	public struct BattleEntry
	{
		public uint id;
		public int frameRate;
		public int keyframeStep;
		public int mapID;
		public List<PlayerEntry> players;
		public int battleTime;
	}

	public struct PlayerEntry
	{
		public ulong gcNID;
		public string name;
		public int actorID;
	}
}