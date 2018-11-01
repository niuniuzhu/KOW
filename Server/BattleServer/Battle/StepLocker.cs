namespace BattleServer.Battle
{
	/// <summary>
	/// 锁步器
	/// </summary>
	public class StepLocker
	{
		public int frameRate = 50;//20ms/sec
		public int keyframeStep = 5;//100ms/keyframe

		private int _frame;
		private int _msPerFrame;
		private Battle _battle;
		private long _elapsed;

		public void Init( Battle battle, int frameRate, int keyframeStep )
		{
			this._battle = battle;
			this.frameRate = frameRate;
			this.keyframeStep = keyframeStep;
			this._msPerFrame = 1000 / this.frameRate;
			this._frame = 0;
			this._elapsed = 0;
		}

		public void Clear()
		{
			this._battle = null;
		}

		public void Update( long dt )
		{
			this._elapsed += dt;
			while ( this._elapsed >= this._msPerFrame )
			{
				this._elapsed -= this._msPerFrame;

				if ( this._frame % this.keyframeStep == 0 )
					this._battle.OnKeyframe( this._frame, this._msPerFrame );

				this._battle.UpdateLogic( this._frame, this._msPerFrame );

				++this._frame;
			}
		}
	}
}