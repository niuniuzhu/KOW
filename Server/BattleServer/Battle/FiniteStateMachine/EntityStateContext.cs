using Core.FiniteStateMachine;
using Google.Protobuf;

namespace BattleServer.Battle.FiniteStateMachine
{
	public class EntityStateContext
	{
		public int shakeTime;
		public int skillID;

		public void DecodeSnapshot( CodedInputStream reader )
		{
			this.shakeTime = reader.ReadInt32();
			this.skillID = reader.ReadInt32();
		}
	}
}