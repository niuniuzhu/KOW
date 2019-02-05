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
		internal void ProcessMatch( long dt )
		{
			if ( this.users.Count == 0 )
				return;
			bool success;
			do
			{
				success = this._matcher.ProcessMatch( dt );
			} while ( success && this.users.Count > 0 );//如果第一个玩家都匹配不了则不用往下处理了
		}

		internal void AddUser( MatchUser user )
		{
			if ( this.users.Contains( user ) )
				return;
			this.users.Add( user );
			user.grading = this;
			this.system.RaiseEvent( MatchUserEvent.Type.AddToGrading, user, null );
		}

		internal void RemoveUser( MatchUser user )
		{
			//从等候室中移除玩家
			if ( user.lounge != null )
			{
				MatchingLounge lounge = user.lounge;
				user.lounge.RemoveUser( user );
				//添加事件
				this.system.RaiseEvent( MatchUserEvent.Type.RemoveFromLounge, user, lounge.GetState() );
			}
			this.users.Remove( user );
			user.grading = null;
			this.system.RaiseEvent( MatchUserEvent.Type.RemoveFromGrading, user, null );
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