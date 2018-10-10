﻿using System.Collections.Generic;

namespace Core.Misc
{
	public class ObejctPool<T> where T : new()
	{
		private readonly Queue<T> _pool = new Queue<T>();

		public bool isEmpty => this._pool.Count == 0;
		public int increase = 1;

		public ObejctPool( int cap = 0, int increase = 1 )
		{
			this.increase = cap <= 1 ? 1 : cap;
			for ( int i = 0; i < cap; i++ )
				this._pool.Enqueue( new T() );
		}

		public T Pop()
		{
			if ( this._pool.Count == 0 )
			{
				for ( int i = 0; i < this.increase; i++ )
					this._pool.Enqueue( new T() );
			}
			return this._pool.Dequeue();
		}

		public void Push( T obj )
		{
			this._pool.Enqueue( obj );
		}
	}
}