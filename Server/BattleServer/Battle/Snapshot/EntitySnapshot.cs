using Core.Misc;

namespace BattleServer.Battle.Snapshot
{
	public class EntitySnapshot : ISnapshotObject, IPoolObject
	{
		private static readonly ObjectPool<EntitySnapshot> POOL = new ObjectPool<EntitySnapshot>( 100, 10 );

		public static EntitySnapshot Create() => POOL.Pop();

		public static void Destroy( EntitySnapshot snapshot ) => POOL.Push( snapshot );

		public void Clear()
		{
		}
	}
}