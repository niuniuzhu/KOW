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
		private long _timestamp;

		public void Init( Battle battle, int frameRate, int keyframeStep )
		{
			this._battle = battle;
			this.frameRate = frameRate;
			this.keyframeStep = keyframeStep;
			this._msPerFrame = 1000 / this.frameRate;
			this._frame = 0;
			this._timestamp = 0;
		}

		public void Clear()
		{
			this._battle = null;
		}
		
		/// <summary>
		/// 异步调用
		/// </summary>
		public void Update( long elasped )
		{
			long delta = elasped - this._timestamp;
			while ( delta >= this._msPerFrame )
			{
				this._timestamp += this._msPerFrame;
				delta -= this._msPerFrame;

				if ( this._frame % this.keyframeStep == 0 )
					this._battle.OnKeyframe( this._frame, elasped, this._msPerFrame * this.keyframeStep );

				this._battle.UpdateLogic( this._frame, elasped, this._msPerFrame );

				++this._frame;
			}
		}
	}
}