namespace BattleServer
{
	public class BSConfig
	{
		public enum State
		{
			Free,
			Busy,
			Full,
			Close
		}
		public uint id;
		public string externalIP;
		public int externalPort;
		public string csIP;
		public int csPort;
		public long reportInterval;
		public long pingInterval;
		public long gcLive;

		public void CopyFromCLIOptions( Options opts )
		{
			this.id = opts.id;
			this.externalIP = opts.externalIP;
			this.externalPort = opts.externalPort;
			this.csIP = opts.csIP;
			this.csPort = opts.csPort;
			this.reportInterval = opts.reportInterval;
			this.pingInterval = opts.pingInterval;
			this.gcLive = opts.gcLive;
		}
	}
}