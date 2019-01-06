using BattleServer.User;

namespace BattleServer.Battle.Model
{
	public class Player : Champion
	{
		/// <summary>
		/// 所属玩家实例
		/// </summary>
		public BSUser user { get; internal set; }

		/// <summary>
		/// 战场结束标记
		/// </summary>
		public bool battleEndFlag;

		public bool win;
		public uint damage;
		public uint hurt;
		public uint heal;
		public uint occupyTime;
		public uint skill0Used;
		public uint skill1Used;
		public uint skill0Damage;
		public uint skill1Damage;
	}
}