using System.Text;

namespace CentralServer.Match
{
	public class MatchState
	{
		public MatchUser[] users;

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