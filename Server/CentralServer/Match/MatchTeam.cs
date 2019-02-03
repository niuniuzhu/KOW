using System.Text;

namespace CentralServer.Match
{
	public class MatchTeam
	{
		public MatchUser[][] users;

		public string Dump()
		{
			StringBuilder sb = new StringBuilder();
			int c1 = this.users.Length;
			for ( int i = 0; i < c1; i++ )
			{
				sb.AppendLine( $"team:{i}" );
				MatchUser[] matchUsers = this.users[i];
				int c2 = matchUsers.Length;
				for ( int j = 0; j < c2; j++ )
				{
					MatchUser matchUser = matchUsers[j];
					sb.Append( matchUser.Dump() );
					if ( j < c2 - 1 )
						sb.AppendLine();
				}
				if ( i < c1 - 1 )
					sb.AppendLine();
			}
			return sb.ToString();
		}
	}
}