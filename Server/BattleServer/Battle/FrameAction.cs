using Core.Misc;

namespace BattleServer.Battle
{
	public class FrameAction : IPoolObject
	{
		public int frame;

		public void Clear()
		{
			this.frame = 0;
		}

		public void Init( int frame )
		{
			this.frame = frame;
		}
	}
}