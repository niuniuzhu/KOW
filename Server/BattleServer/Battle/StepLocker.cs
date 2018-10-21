namespace BattleServer.Battle
{
	public class StepLocker
	{
		public int frameRate = 50;//20ms/sec
		public int keyframeStep = 5;//100ms/keyframe

		private int _frame;
		private int _msPerFrame;
		private Battle _battle;

		public void Init( Battle battle, int frameRate, int keyframeStep )
		{
			this._battle = battle;
			this.frameRate = frameRate;
			this.keyframeStep = keyframeStep;
			this._msPerFrame = 1000 / this.frameRate;
		}

		public void Reset()
		{
			this._frame = 0;
			this._battle = null;
		}

		public void Update(long elapsed )
		{
			while ( elapsed >= this._msPerFrame )
			{
				elapsed -= this._msPerFrame;

				if ( this._frame % this.keyframeStep == 0 )
					this._battle.OnKeyframe( this._frame, this._msPerFrame );

				this._battle.UpdateLogic( this._frame, this._msPerFrame );

				++this._frame;
			}
		}
	}
}