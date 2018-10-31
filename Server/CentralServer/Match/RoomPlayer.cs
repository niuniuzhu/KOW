namespace CentralServer.Match
{
	public class RoomPlayer
	{
		public ulong gcNID { get; }
		public string uname { get; }
		public uint ukey { get; }

		public int actorID;
		public int team;
		public int progress;

		public RoomPlayer( ulong gcNID, uint ukey )
		{
			this.gcNID = gcNID;
			this.ukey = ukey;
			this.uname = CS.instance.userMgr.GetUser( gcNID ).name;
		}

		public override string ToString()
		{
			return $"[gcNID:{this.gcNID}, name:{this.uname}]";
		}
	}
}