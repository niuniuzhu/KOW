using System;
using System.Text;

namespace CentralServer.Match3
{
	public class MatchState
	{
		internal readonly MatchUser[] users = new MatchUser[64];
		internal readonly MatchUser[][] tUsers = new MatchUser[8][];

		public readonly int numTeam;
		public readonly int numUserPerTeam;

		public MatchState( int numTeam, int numUserPerTeam )
		{
			this.numTeam = numTeam;
			this.numUserPerTeam = numUserPerTeam;
			int count = this.tUsers.Length;
			for ( int i = 0; i < count; i++ )
				this.tUsers[i] = new MatchUser[8];
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