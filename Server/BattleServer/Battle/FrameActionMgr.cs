using Core.Misc;

namespace BattleServer.Battle
{
	public class FrameActionMgr
	{
		private static readonly ObjectPool<FrameAction> POOL = new ObjectPool<FrameAction>( 20, 20 );

		public FrameAction Create()
		{
			FrameAction frameAction = POOL.Pop();
			return frameAction;
		}
	}
}