using CentralServer.User;

namespace CentralServer.Match
{
	public class RoomPlayer
	{
		public readonly CSUser user;
		public int actorID;
		public int team;

		public RoomPlayer( CSUser user )
		{
			this.user = user;
		}

		public override string ToString()
		{
			return $"user:{this.user.gcNID}, actorID:{this.actorID}, team:{this.team}";
		}
	}
}