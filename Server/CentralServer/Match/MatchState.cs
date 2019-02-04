using System;
using System.Text;
using Core.Misc;

namespace CentralServer.Match
{
	public class MatchState : IPoolObject
	{
		internal static readonly ObjectPool<MatchState> POOL = new ObjectPool<MatchState>();

		internal int numTeam;
		internal int numUserPerTeam;
		internal readonly MatchUser[] users = new MatchUser[64];
		internal readonly MatchUser[][] tUsers = new MatchUser[8][];

		public MatchState()
		{
			int count = this.tUsers.Length;
			for ( int i = 0; i < count; i++ )
				this.tUsers[i] = new MatchUser[8];
		}

		public void Clear()
		{
			Array.Clear( this.users, 0, this.numTeam * this.numUserPerTeam );
			for ( int i = 0; i < this.numTeam; i++ )
				Array.Clear( this.tUsers[i], 0, this.numUserPerTeam );
			this.numTeam = 0;
			this.numUserPerTeam = 0;
		}

		internal void SetUsers( MatchUser[] users )
		{
			Array.Copy( users, this.users, this.numTeam * this.numUserPerTeam );
			//每个队伍获得的玩家数量
			for ( int i = 0, k = 0; i < this.numTeam; i++ )
			{
				//分配玩家
				for ( int j = 0; j < this.numUserPerTeam; j++, k++ )
					this.tUsers[i][j] = this.users[k];
			}
		}

		public string Dump()
		{
			StringBuilder sb = new StringBuilder();
			int count = this.users.Length;
			for ( int i = 0; i < count; i++ )
			{
				MatchUser user = this.users[i];
				sb.Append( user == null ? $"{i}:null" : $"{i}:{user.Dump()}" );
				if ( i < count - 1 )
					sb.AppendLine();
			}
			return sb.ToString();
		}
	}
}