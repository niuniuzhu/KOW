namespace CentralServer.Match
{
	public class MatchUserEvent
	{
		public enum Type
		{
			AddToGrading,
			RemoveFromGrading,
			AddToCandidate,
			RemoveFromCandidate
		}

		public readonly Type type;
		public readonly MatchUser user;
		public readonly MatchState state;

		public MatchUserEvent( Type type, MatchUser user )
		{
			this.type = type;
			this.user = user;
		}

		public MatchUserEvent( Type type, MatchUser user, MatchState state )
		{
			this.type = type;
			this.user = user;
			this.state = state;
		}

		public string Dump()
		{
			return $"type:{this.type}, user:{this.user.Dump()}" + ( this.state == null ? string.Empty : $", state:{this.state.Dump()}" );
		}
	}
}