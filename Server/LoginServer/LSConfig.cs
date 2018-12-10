using Core.Misc;
using System.Collections;

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
		public string certPath;
		public string certPass;
		public long pingInterval;
		public bool pwdVerification;
		public bool autoRegister;

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
			this.certPath = opts.certPath;
			this.certPass = opts.certPass;
			this.pingInterval = opts.pingInterval;
			this.pwdVerification = System.Convert.ToBoolean( opts.pwdVerification );
			this.autoRegister = System.Convert.ToBoolean( opts.autoRegister );
		}

		public void CopyFromJson( Hashtable json )
		{
			this.cliPort = json.GetInt( "cliPort" );
			this.csIP = json.GetString( "csIP" );
			this.csPort = json.GetInt( "csPort" );
			this.dbIP = json.GetString( "dbIP" );
			this.dbPort = json.GetInt( "dbPort" );
			this.redisIP = json.GetString( "redisIP" );
			this.redisPort = json.GetInt( "redisPort" );
			this.redisPwd = json.GetString( "redisPwd" );
			this.certPath = json.GetString( "certPath" );
			this.certPass = json.GetString( "certPass" );
			this.pingInterval = json.GetLong( "pingInterval" );
			this.pwdVerification = json.GetBoolean( "pwdVerification" );
			this.autoRegister = json.GetBoolean( "autoRegister" );
		}
	}
}