namespace BattleServer.Battle
{
	public class BattleResult
	{
		public enum FinishState
		{
			Normal,
			Interrupt
		}

		public FinishState finishState;

		public void Clear()
		{
			this.finishState = FinishState.Normal;
		}
	}
}