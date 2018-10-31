using BattleServer.Battle.Model;
using Core.FiniteStateMachine;

namespace BattleServer.Battle.FiniteStateMachine
{
	public class EntityState : FSMState
	{
		public enum Type
		{
			Idle,
			Move,
			Attack,
			Die
		}

		/// <summary>
		/// 所属实体
		/// </summary>
		public Entity owner;

		/// <summary>
		/// 状态的运行时间
		/// </summary>
		public int time;

		public EntityState( int type, Entity owner ) : base( type )
		{
			this.owner = owner;
		}
	}
}