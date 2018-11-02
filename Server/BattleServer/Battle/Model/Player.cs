using BattleServer.User;

namespace BattleServer.Battle.Model
{
	public class Player : Champion
	{
		/// <summary>
		/// 所属玩家实例
		/// </summary>
		public BSUser user { get; internal set; }
	}
}