using System;
using System.Collections.Concurrent;

namespace Core.Misc
{
	public class ThreadSafeObjectPool<T> where T : IPoolObject, new()
	{
		private readonly ConcurrentQueue<T> _pool = new ConcurrentQueue<T>();

		public bool isEmpty => this._pool.IsEmpty;

		public int increase = 1;

		public ThreadSafeObjectPool( int cap = 0, int increase = 1 )
		{
			this.increase = increase;
			cap = cap <= 1 ? 1 : cap;
			for ( int i = 0; i < cap; i++ )
				this._pool.Enqueue( new T() );
		}

		public T[] PopMultiply( int count )
		{
			throw new NotImplementedException();
		}

		public T Pop()
		{
			if ( this._pool.IsEmpty )
			{
				for ( int i = 0; i < this.increase; i++ )
					this._pool.Enqueue( new T() );
			}
			this._pool.TryDequeue( out T result );
			return result;
		}

		public void Push( T obj )
		{
			obj.Clear();
			this._pool.Enqueue( obj );
		}
	}
}