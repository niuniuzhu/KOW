namespace CentralServer.Match
{
	public static class MatchEvent
	{
		public enum Type
		{
			AddToRoom,
			RemoveFromRoom,
			RoomInfo,
			MatchSuccess
		}
	}
}