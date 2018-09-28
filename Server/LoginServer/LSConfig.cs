namespace LoginServer
{
	public class LSConfig
	{
		public int cliPort;
		public string csIP;
		public int csPort;
		public string dbIP;
		public int dbPort;
		public string redisIP;
		public int redisPort;
		public string redisPwd;
		public long pingInterval;

		public void CopyFromCLIOptions( Options opts )
		{
			this.cliPort = opts.cliPort;
			this.csIP = opts.csIP;
			this.csPort = opts.csPort;
			this.dbIP = opts.dbIP;
			this.dbPort = opts.dbPort;
			this.redisIP = opts.redisIP;
			this.redisPort = opts.redisPort;
			this.redisPwd = opts.redisPwd;
			this.pingInterval = opts.pingInterval;
		}
	}
}