using Core.Structure;
using System.Collections.Generic;
using System.Text;

namespace CentralServer.Match
{
	public class Grading
	{
		/// <summary>
		/// 所属的匹配系统
		/// </summary>
		public MatchSystem system { get; }
		/// <summary>
		/// 起始分数
		/// </summary>
		public int from { get; }
		/// <summary>
		/// 结束分数
		/// </summary>
		public int to { get; }
		/// <summary>
		/// 搜索期限
		/// </summary>
		public long expireTime { get; }
		/// <summary>
		/// 最大搜索空间扩展次数
		/// </summary>
		public int maxExtends { get; }
		/// <summary>
		/// 上一个分段
		/// </summary>
		internal Grading prev;
		/// <summary>
		/// 下一个分段
		/// </summary>
		internal Grading next;
		/// <summary>
		/// 等待匹配的玩家列表
		/// </summary>
		internal readonly List<MatchUser> users = new List<MatchUser>();

		private readonly SwitchQueue<MatchUser> _pendingToAdd = new SwitchQueue<MatchUser>();
		private readonly SwitchQueue<MatchUser> _pendingToRemove = new SwitchQueue<MatchUser>();
		private readonly Matcher _matcher;

		public Grading( MatchSystem system, int from, int to, long expireTime, int maxExtends )
		{
			this.system = system;
			this.from = from;
			this.to = to;
			this.expireTime = expireTime;
			this.maxExtends = maxExtends;
			this._matcher = new Matcher( this );
		}

		/// <summary>
		/// 系统每次更新调用匹配
		/// 非主线程调用
		/// </summary>
		internal void ProcessMatch( SwitchQueue<MatchTeam> results, long dt )
		{
			if ( this.users.Count == 0 )
				return;
			MatchState state;
			do
			{
				state = this._matcher.ProcessMatch( dt );
				if ( state != null )//匹配成功
				{
					results.Push( state.CreateTeam( this.system.numTeam ) );
				}
			} while ( state != null && this.users.Count > 0 );//如果第一个玩家都匹配不了则不用往下处理了
		}

		internal void PendingAddUser( MatchUser user ) => this._pendingToAdd.Push( user );

		internal void PendingRemoveUser( MatchUser user ) => this._pendingToRemove.Push( user );

		internal void ProcessPendings()
		{
			this._pendingToAdd.Switch();
			while ( !this._pendingToAdd.isEmpty )
			{
				this.InternalAddUser( this._pendingToAdd.Pop() );
			}
			this._pendingToRemove.Switch();
			while ( !this._pendingToRemove.isEmpty )
			{
				this.InternalRemoveUser( this._pendingToRemove.Pop() );
			}
		}

		internal void InternalAddUser( MatchUser user )
		{
			if ( this.users.Contains( user ) )
				return;
			this.users.Add( user );
			user.grading = this;
			this.system.CreateEvent( MatchUserEvent.Type.AddToGrading, user );
		}

		internal void InternalRemoveUser( MatchUser user )
		{
			//从等候室中移除玩家
			if ( user.lounge != null )
			{
				MatchingLounge lounge = user.lounge;
				user.lounge.RemoveUser( user );
				//添加事件
				this.system.CreateEvent( MatchUserEvent.Type.RemoveFromCandidate, user, lounge.GetState() );
			}
			this.users.Remove( user );
			user.grading = null;
			this.system.CreateEvent( MatchUserEvent.Type.RemoveFromGrading, user );
		}

		public string Dump()
		{
			StringBuilder sb = new StringBuilder();
			sb.AppendLine( $"from:{this.from}, to:{this.to}, expire:{this.expireTime}, maxExtends:{this.maxExtends}" );
			int count = this.users.Count;
			sb.AppendLine( $"users count:{count}" );
			for ( int i = 0; i < count; i++ )
			{
				sb.Append( $"{i}: {this.users[i].Dump()}" );
				if ( i < count - 1 )
					sb.AppendLine();
			}
			return sb.ToString();
		}
	}
}