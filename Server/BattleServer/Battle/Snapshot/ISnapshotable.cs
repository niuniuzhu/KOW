namespace BattleServer.Battle.Snapshot
{
	public interface ISnapshotable
	{
		/// <summary>
		/// 制作快照
		/// </summary>
		/// <param name="data">所需的数据</param>
		/// <returns>返回快照对象</returns>
		ISnapshotObject MakeSnapshot( object data );
	}
}