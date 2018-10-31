namespace BattleServer.Battle.Snapshot
{
	public interface ISnapshotable
	{
		/// <summary>
		/// 制作快照
		/// </summary>
		/// <returns>返回快照对象</returns>
		void MakeSnapshot( Google.Protobuf.CodedOutputStream writer );
	}
}