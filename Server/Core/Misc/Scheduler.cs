using Core.Net;
using System;

namespace Core.Misc
{
	public class Scheduler
	{
		private long _interval;
		private Action<int> _handler;
		private long _currTime;
		private int _count;

		public void Start( long interval, Action<int> handler, bool triggerWhenStart = false )
		{
			this._interval = interval;
			this._handler = handler;
			this._currTime = 0;
			if ( triggerWhenStart )
				this._handler?.Invoke( this._count++ );
		}

		public void Stop()
		{
			this._handler = null;
		}

		public void Update( long dt )
		{
			if ( this._currTime >= this._interval )
			{
				this._handler?.Invoke( this._count++ );
				this._currTime -= this._interval;
			}
			this._currTime += dt;
		}
	}
}