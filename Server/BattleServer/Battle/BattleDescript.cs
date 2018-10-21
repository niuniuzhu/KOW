using System.Collections.Generic;

namespace BattleServer.Battle
{
	public struct BattleDescript
	{
		public uint id;
		public int frameRate;
		public int keyframeStep;
		public int mapID;
		public List<PlayerDescript> players;
		public int battleTime;
	}

	public struct PlayerDescript
	{
		public ulong gcNID;
		public string name;
		public int actorID;
	}
}