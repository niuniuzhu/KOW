using Google.Protobuf;
using System.Collections.Generic;

namespace BattleServer.Battle.Snapshot
{
	/// <summary>
	/// 快照管理器
	/// </summary>
	public class SnapshotMgr
	{
		/// <summary>
		/// 帧数到快照的映射表
		/// </summary>
		private readonly SortedList<int, FrameSnapshot> _frameToSnapshot = new SortedList<int, FrameSnapshot>();

		public void Clear()
		{
			this._frameToSnapshot.Clear();
		}

		/// <summary>
		/// 获取指定帧数下的快照实例
		/// </summary>
		/// <param name="frame">指定帧数下的快速,-1表示最近的快照</param>
		public FrameSnapshot Get( int frame = -1 )
		{
			if ( frame < 0 )
			{
				IList<FrameSnapshot> values = this._frameToSnapshot.Values;
				int count = values.Count;
				return count == 0 ? null : values[count - 1];
			}
			this._frameToSnapshot.TryGetValue( frame, out FrameSnapshot snapshot );
			return snapshot;
		}

		/// <summary>
		/// 保存快照
		/// </summary>
		public void Set( FrameSnapshot snapshot )
		{
			this._frameToSnapshot[snapshot.frame] = snapshot;
		}
	}
}