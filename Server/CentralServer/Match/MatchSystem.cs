using Core.Misc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

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

		public Action<MatchUserEvent.Type, MatchUser, MatchState> eventHandler;

		private readonly List<Grading> _gradings = new List<Grading>();
		private readonly Dictionary<byte, Grading> _modeToGrading = new Dictionary<byte, Grading>();

		public void InitFromDefs( Hashtable json )
		{
			this.mode = json.GetByte( "mode" );
			Hashtable[] gradingDefs = json.GetMapArray( "gradings" );
			//是否每个分段定义
			if ( gradingDefs != null )
			{
				int count = gradingDefs.Length;
				for ( int i = 0; i < count; i++ )
				{
					Hashtable gradingDef = gradingDefs[i];
					int @from = gradingDef.GetInt( "from" );
					int to = gradingDef.GetInt( "to" );
					int expire = gradingDef.GetInt( "expire" );
					int searchRange = gradingDef.GetInt( "search_range" );
					Grading grading = new Grading( this, @from, to, expire, searchRange );
					if ( i > 0 )
					{
						grading.prev = this._gradings[i - 1];
						grading.prev.next = grading;
					}
					this._gradings.Add( grading );
				}
			}
			else
			{
				int gradingStep = json.GetInt( "grading_step" );
				int gradingCount = json.GetInt( "grading_count" );
				int searchRange = json.GetInt( "search_range" );
				int expire = json.GetInt( "expire" );
				for ( int i = 0, k = 0; i < gradingCount; i++ )
				{
					int @from = k;
					k += gradingStep;
					int to = k - 1;
					Grading grading = new Grading( this, @from, to, expire, searchRange );
					if ( i > 0 )
					{
						grading.prev = this._gradings[i - 1];
						grading.prev.next = grading;
					}
					this._gradings.Add( grading );
				}
			}
		}

		internal void RaiseEvent( MatchUserEvent.Type type, MatchUser user, MatchState state )
		{
			this.eventHandler?.Invoke( type, user, state );
		}

		/// <summary>
		/// 外部驱动的更新
		/// </summary>
		public void Update( long dt )
		{
			int count = this._gradings.Count;
			//处理匹配
			for ( int i = 0; i < count; i++ )
				this._gradings[i].ProcessMatch( dt );
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
			grading.AddUser( user );
			return user;
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