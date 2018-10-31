using Google.Protobuf;

namespace BattleServer.Battle.Snapshot
{
	public class FrameSnapshot
	{
		public int frame;
		public ByteString data;
	}
}