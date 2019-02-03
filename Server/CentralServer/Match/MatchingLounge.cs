using System;
using System.Text;

namespace CentralServer.Match
{
	public class MatchingLounge
	{
		private readonly MatchUser[] _users;

		internal int numUsers { get; private set; }

		public MatchingLounge( int maxUserCount )
		{
			this._users = new MatchUser[maxUserCount];
		}

		/// <summary>
		/// 匹配成功后清理
		/// </summary>
		internal void Clear()
		{
			//从分段中移除这些玩家
			for ( int i = 0; i < this._users.Length; i++ )
			{
				MatchUser user = this._users[i];
				if ( user == null )
					continue;
				user.grading.InternalRemoveUser( user );
				user.lounge = null;
			}
			Array.Clear( this._users, 0, this._users.Length );
			this.numUsers = 0;
		}

		/// <summary>
		/// 把玩家添加到等候室,已存在的将会忽略并返回失败
		/// </summary>
		internal bool AddUser( MatchUser user )
		{
			if ( user.lounge != null )
				return false;
			int index = Array.IndexOf( this._users, null );
			if ( index < 0 )
				return false;
			this._users[index] = user;
			++this.numUsers;
			user.lounge = this;
			return true;
		}

		/// <summary>
		/// 从等候室中移除玩家
		/// </summary>
		internal bool RemoveUser( MatchUser user )
		{
			if ( user.lounge == null )
				return false;
			int index = Array.IndexOf( this._users, user );
			if ( index < 0 )
				return false;
			this._users[index] = null;
			--this.numUsers;
			user.lounge = null;
			return true;
		}

		internal MatchState GetState()
		{
			MatchState state = new MatchState();
			state.users = new MatchUser[this._users.Length];
			Array.Copy( this._users, state.users, this._users.Length );
			return state;
		}

		public override string ToString()
		{
			StringBuilder sb = new StringBuilder();
			int count = this._users.Length;
			for ( int i = 0; i < count; i++ )
			{
				MatchUser user = this._users[i];
				if ( user == null )
					continue;
				sb.Append( $"{i}:{user.Dump()}" );
				if ( i < count - 1 )
					sb.AppendLine();
			}
			return sb.ToString();
		}
	}
}