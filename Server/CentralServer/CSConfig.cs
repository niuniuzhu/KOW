namespace CentralServer
{
	public class CSConfig
	{
		public uint csID;
		public int lsPort;
		public int gsPort;
		public int bsPort;
		public int maxGSNum;
		public string redisIP;
		public int redisPort;
		public string redisPwd;
		public long sessionExpTime;

		public void CopyFromCLIOptions( Options opts )
		{
			this.csID = opts.cdID;
			this.lsPort = opts.lsPort;
			this.gsPort = opts.gsPort;
			this.bsPort = opts.bsPort;
			this.maxGSNum = opts.maxGSNum;
			this.redisIP = opts.redisIP;
			this.redisPort = opts.redisPort;
			this.redisPwd = opts.redisPwd;
			this.sessionExpTime = opts.sessionExpTime;
		}
	}
}