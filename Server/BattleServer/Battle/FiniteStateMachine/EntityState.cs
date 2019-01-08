using BattleServer.Battle.Model;
using Core.FiniteStateMachine;

namespace BattleServer.Battle.FiniteStateMachine
{
	public class EntityState : FSMState
	{
		/// <summary>
		/// 所属实体
		/// </summary>
		public Entity owner { get; }

		public EntityState( int type, Entity owner ) : base( type )
		{
			this.owner = owner;
		}
	}
}