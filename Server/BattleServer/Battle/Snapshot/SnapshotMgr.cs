using System.Collections.Generic;
using Core.Misc;

namespace BattleServer.Battle.Snapshot
{
	public class SnapshotMgr
	{
		public readonly Dictionary<int, FrameSnapshot> _frameToSnapshot = new Dictionary<int, FrameSnapshot>();

		public FrameSnapshot GetSnapshot( int frame )
		{
			this._frameToSnapshot.TryGetValue( frame, out FrameSnapshot snapshot );
			return snapshot;
		}
	}
}