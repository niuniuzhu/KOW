using System.Collections;
using Core.Misc;

namespace CentralServer
{
	public class CSConfig
	{
		public uint csID;
		public int lsPort;
		public int gsPort;
		public int bsPort;
		public int shellPort;
		public int maxGSNum;
		public string redisIP;
		public int redisPort;
		public string redisPwd;
		public long sessionExpTime;

		public void CopyFromJson( Hashtable json )
		{
			this.csID = json.GetUInt( "csID" );
			this.lsPort = json.GetInt( "lsPort" );
			this.gsPort = json.GetInt( "gsPort" );
			this.bsPort = json.GetInt( "bsPort" );
			this.shellPort = json.GetInt( "shellPort" );
			this.maxGSNum = json.GetInt( "maxGSNum" );
			this.redisIP = json.GetString( "redisIP" );
			this.redisPort = json.GetInt( "redisPort" );
			this.redisPwd = json.GetString( "redisPwd" );
			this.sessionExpTime = json.GetLong( "sessionExpTime" );
		}

		public void CopyFromCLIOptions( Options opts )
		{
			this.csID = opts.csID;
			this.lsPort = opts.lsPort;
			this.gsPort = opts.gsPort;
			this.bsPort = opts.bsPort;
			this.shellPort = opts.shellPort;
			this.maxGSNum = opts.maxGSNum;
			this.redisIP = opts.redisIP;
			this.redisPort = opts.redisPort;
			this.redisPwd = opts.redisPwd;
			this.sessionExpTime = opts.sessionExpTime;
		}
	}
}