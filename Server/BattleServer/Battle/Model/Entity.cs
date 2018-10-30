using BattleServer.Battle.Snapshot;

namespace BattleServer.Battle.Model
{
	public class Entity : ISnapshotable
	{
		public ISnapshotObject MakeSnapshot( object data )
		{
			throw new System.NotImplementedException();
		}
	}
}