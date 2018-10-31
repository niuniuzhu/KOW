using Google.Protobuf;
using System.Collections.Generic;

namespace BattleServer.Battle.Snapshot
{
	public class SnapshotMgr
	{
		public readonly Dictionary<int, FrameSnapshot> _frameToSnapshot = new Dictionary<int, FrameSnapshot>();

		public void Clear()
		{
			this._frameToSnapshot.Clear();
		}

		public FrameSnapshot Get( int frame )
		{
			this._frameToSnapshot.TryGetValue( frame, out FrameSnapshot snapshot );
			return snapshot;
		}

		public void Create( int frame, ByteString data )
		{
			FrameSnapshot snapshot = new FrameSnapshot();
			snapshot.frame = frame;
			snapshot.data = data;
			this._frameToSnapshot[frame] = snapshot;
		}
	}
}