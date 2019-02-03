using System.Text;

namespace CentralServer.Match
{
	public class MatchState
	{
		public MatchUser[] users;

		public MatchTeam CreateTeam( int numTeam )
		{
			MatchTeam team = new MatchTeam();
			team.users = new MatchUser[numTeam][];
			//每个队伍获得的玩家数量
			int pu = this.users.Length / numTeam;
			int k = 0;
			for ( int i = 0; i < numTeam; i++ )
			{
				MatchUser[] user = team.users[i] = new MatchUser[pu];
				//分配玩家
				for ( int j = 0; j < pu; j++, k++ )
					user[j] = this.users[k];
			}
			return team;
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