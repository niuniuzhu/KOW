using Core.FiniteStateMachine;
using Google.Protobuf;

namespace BattleServer.Battle.FiniteStateMachine
{
	public class EntityFSM : FSM
	{
		public readonly EntityStateContext context = new EntityStateContext();

		public void DecodeSnapshot( CodedInputStream reader )
		{
			reader.ReadBytes();

			if ( reader.ReadBool() )
				this.currentState = this.GetState( reader.ReadInt32() );

			if ( reader.ReadBool() )
				this.previousState = this.GetState( reader.ReadInt32() );

			this.context.DecodeSnapshot( reader );
		}
	}
}