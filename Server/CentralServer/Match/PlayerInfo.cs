namespace CentralServer.Match
{
	public class PlayerInfo
	{
		public ulong gcNID { get; }
		public string uname { get; }

		public int actorID;
		public int progress;

		public PlayerInfo( ulong gcNID )
		{
			this.gcNID = gcNID;
			this.uname = CS.instance.userMgr.GetUser( gcNID ).name;
		}

		public override string ToString()
		{
			return $"gcNID:{this.gcNID}, name:{this.uname}";
		}
	}
}