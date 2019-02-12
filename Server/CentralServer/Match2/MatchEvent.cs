namespace CentralServer.Match2
{
	public class MatchEvent
	{
		public enum Type
		{
			AddToRoom,
			RemoveFromRoom,
			MatchSuccess
		}

		public readonly Type type;
		public readonly RoomUser user;
		public readonly RoomInfo state;

		public MatchEvent( Type type, RoomUser user )
		{
			this.type = type;
			this.user = user;
		}

		public MatchEvent( Type type, RoomUser user, RoomInfo state )
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