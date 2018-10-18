using System.Diagnostics;

namespace BattleServer.Battle
{
	public class StepLocker
	{
		public int frameRate = 50;//20ms/sec
		public int keyframeStep = 5;//100ms/keyframe

		private int _frame;
		private int _msPerFrame;
		private long _elapsed;
		private readonly Stopwatch _sw = new Stopwatch();
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
			this._elapsed = 0;
			this._sw.Stop();
			this._sw.Reset();
			this._battle = null;
		}

		public void Update()
		{
			this._elapsed += this._sw.ElapsedMilliseconds;

			while ( this._elapsed >= this._msPerFrame )
			{
				this._elapsed -= this._msPerFrame;

				if ( this._frame % this.keyframeStep == 0 )
					this._battle.OnKeyframe( this._frame, this._msPerFrame );

				this._battle.UpdateLogic( this._frame, this._msPerFrame );

				++this._frame;
			}

			this._sw.Restart();
		}
	}
}