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
		private readonly Dictionary<int, FrameSnapshot> _frameToSnapshot = new Dictionary<int, FrameSnapshot>();

		public void Clear()
		{
			this._frameToSnapshot.Clear();
		}

		/// <summary>
		/// 获取指定帧数下的快照实例
		/// </summary>
		public FrameSnapshot Get( int frame )
		{
			this._frameToSnapshot.TryGetValue( frame, out FrameSnapshot snapshot );
			return snapshot;
		}

		/// <summary>
		/// 创建快照
		/// </summary>
		public void Create( int frame, ByteString data )
		{
			FrameSnapshot snapshot = new FrameSnapshot
			{
				frame = frame,
				data = data
			};
			this._frameToSnapshot[frame] = snapshot;
		}
	}
}