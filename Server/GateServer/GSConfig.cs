namespace GateServer
{
	public class GSConfig
	{
		public enum State
		{
			Free,
			Busy,
			Full,
			Close
		}
		public uint gsID;
		public string name;
		public string externalIP;
		public int externalPort;
		public string password;
		public int maxConnection;
		public string csIP;
		public int csPort;
		public long reportInterval;
		public long pingInterval;
		public long gcLive;

		public void CopyFromCLIOptions( Options opts )
		{
			this.gsID = opts.gsID;
			this.name = opts.name;
			this.externalIP = opts.externalIP;
			this.externalPort = opts.externalPort;
			this.password = opts.password;
			this.maxConnection = opts.maxConnection;
			this.csIP = opts.csIP;
			this.csPort = opts.csPort;
			this.reportInterval = opts.reportInterval;
			this.pingInterval = opts.pingInterval;
			this.gcLive = opts.gcLive;
		}
	}
}