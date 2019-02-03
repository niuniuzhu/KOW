using Core.Misc;
using Core.Structure;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CentralServer.Match
{
	public class MatchSystem
	{
		/// <summary>
		/// 模式(高4位代表队伍数量,低4位代表每个队伍的玩家数量)
		/// </summary>
		public byte mode { get; private set; }
		/// <summary>
		/// 队伍数量
		/// </summary>
		public int numTeam => this.mode >> 4;
		/// <summary>
		/// 每个队伍的玩家数量
		/// </summary>
		public int numUserPerTeam => this.mode & 0xf;
		/// <summary>
		/// 需要匹配的玩家数量
		/// </summary>
		public int numUsers => this.numTeam * this.numUserPerTeam;

		public Action<MatchTeam> onMatchResult;
		public Action<MatchUserEvent> OnUserStateChanged;

		private readonly List<Grading> _gradings = new List<Grading>();
		private readonly Dictionary<byte, Grading> _modeToGrading = new Dictionary<byte, Grading>();
		private readonly Task _task;
		private readonly Stopwatch _sw = new Stopwatch();
		private readonly SwitchQueue<MatchTeam> _results = new SwitchQueue<MatchTeam>();
		private readonly SwitchQueue<MatchUserEvent> _events = new SwitchQueue<MatchUserEvent>();
		private long _updateInterval;
		private long _lastUpdateTime;
		private bool _disposed;

		public MatchSystem()
		{
			this._task = Task.Factory.StartNew( this.AsyncLoop, CancellationToken.None, TaskCreationOptions.LongRunning, TaskScheduler.Default );
			this._sw.Start();
		}

		public void Dispose()
		{
			this._disposed = true;
			this._sw.Stop();
			this._task.Wait();
		}

		public void InitFromDefs( Hashtable json )
		{
			this.mode = json.GetByte( "mode" );
			this._updateInterval = json.GetInt( "update_interval" );
			Hashtable[] gradingDefs = json.GetMapArray( "gradings" );
			int count = gradingDefs.Length;
			for ( int i = 0; i < count; i++ )
			{
				Hashtable gradingDef = gradingDefs[i];
				int from = gradingDef.GetInt( "from" );
				int to = gradingDef.GetInt( "to" );
				int expire = gradingDef.GetInt( "expire" );
				int maxExtends = gradingDef.GetInt( "max_extends" );
				Grading grading = new Grading( this, @from, to, expire, maxExtends );
				if ( i > 0 )
				{
					grading.prev = this._gradings[i - 1];
					grading.prev.next = grading;
				}
				this._gradings.Add( grading );
			}
		}

		internal void CreateEvent( MatchUserEvent.Type type, MatchUser user ) => this._events.Push( new MatchUserEvent( type, user ) );

		internal void CreateEvent( MatchUserEvent.Type type, MatchUser user, MatchState state ) => this._events.Push( new MatchUserEvent( type, user, state ) );

		private void AsyncLoop()
		{
			while ( !this._disposed )
			{
				long dt = this._sw.ElapsedMilliseconds - this._lastUpdateTime;
				while ( dt >= this._updateInterval )
				{
					dt -= this._updateInterval;
					this._lastUpdateTime += this._updateInterval;
					this.AsyncMatching( this._updateInterval );
				}
				this.ProcessEvents();
				Thread.Sleep( 10 );
			}
		}

		/// <summary>
		/// 处理时间
		/// 非主线程调用
		/// </summary>
		private void ProcessEvents()
		{
			int count = this._gradings.Count;
			//处理计划事件
			for ( int i = 0; i < count; i++ )
				this._gradings[i].ProcessPendings();
		}

		/// <summary>
		/// 异步匹配
		/// 非主线程
		/// </summary>
		private void AsyncMatching( long dt )
		{
			int count = this._gradings.Count;
			//处理匹配
			for ( int i = 0; i < count; i++ )
				this._gradings[i].ProcessMatch( this._results, dt );
		}

		/// <summary>
		/// 外部驱动的更新
		/// </summary>
		public void Update( long dt )
		{
			//处理事件
			this._events.Switch();
			while ( !this._events.isEmpty )
			{
				this.OnUserStateChanged?.Invoke( this._events.Pop() );
			}
			//主线程处理匹配结果
			this._results.Switch();
			while ( !this._results.isEmpty )
			{
				MatchTeam state = this._results.Pop();
				this.onMatchResult?.Invoke( state );
			}
		}

		/// <summary>
		/// 获取指定模式的段位
		/// </summary>
		/// <param name="mode">模式</param>
		/// <returns>段位实例</returns>
		public Grading GetGrading( byte mode )
		{
			this._modeToGrading.TryGetValue( mode, out Grading grading );
			return grading;
		}

		private Grading SelectGrading( int rank )
		{
			foreach ( Grading grading in this._gradings )
			{
				if ( ( grading.from < 0 || rank >= grading.from ) &&
					 ( grading.to < 0 || rank <= grading.to ) )
					return grading;
			}
			return null;
		}

		public MatchUser CreateUser( ulong id, int rank )
		{
			Grading grading = this.SelectGrading( rank );
			if ( grading == null )
				return null;
			MatchUser user = new MatchUser( id, rank );
			grading.PendingAddUser( user );
			return user;
		}

		public void RemoveUser( MatchUser user )
		{
			user.grading.PendingRemoveUser( user );
		}

		public string Dump()
		{
			StringBuilder sb = new StringBuilder();
			sb.AppendLine( $"mode:{this.mode}" );
			int count = this._gradings.Count;
			sb.AppendLine( $"grading count:{count}" );
			for ( int i = 0; i < count; i++ )
			{
				sb.AppendLine( $"{i}: {this._gradings[i].Dump()}" );
				if ( i < count - 1 )
					sb.AppendLine();
			}
			return sb.ToString();
		}
	}
}