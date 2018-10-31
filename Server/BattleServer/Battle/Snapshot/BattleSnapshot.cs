using Core.Misc;

namespace BattleServer.Battle.Snapshot
{
	public class BattleSnapshot : ISnapshotObject, IPoolObject
	{
		public static readonly ObjectPool<BattleSnapshot> POOL = new ObjectPool<BattleSnapshot>();

		public static BattleSnapshot Create() => POOL.Pop();

		public static void Destroy( BattleSnapshot snapshot ) => POOL.Push( snapshot );

		public int frame;
		public int time;

		public void Clear()
		{
		}
	}
}