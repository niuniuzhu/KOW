using Core.Misc;
using System.Collections;
using System.IO;

namespace LoginServer
{
	public class LSConfig
	{
		public string wxAppID;
		public string wxAppSecret;
		public string code2sessionUrl;
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
		public int initMoney;
		public int initDiamoned;
		public int initRank;

		public void CopyFromCLIOptions( Options opts )
		{
			this.wxAppID = opts.wxAppID;
			this.wxAppSecret = opts.wxAppSecret;
			this.code2sessionUrl = opts.code2sessionUrl;
			this.cliPort = opts.cliPort;
			this.csIP = opts.csIP;
			this.csPort = opts.csPort;
			this.dbIP = opts.dbIP;
			this.dbPort = opts.dbPort;
			this.redisIP = opts.redisIP;
			this.redisPort = opts.redisPort;
			this.redisPwd = opts.redisPwd;
			this.pingInterval = opts.pingInterval;
			Hashtable secretDef = ( Hashtable )MiniJSON.JsonDecode( File.ReadAllText( opts.secret ) );
			this.certPath = secretDef.GetString( "certPath" );
			this.certPass = secretDef.GetString( "certPass" );
			this.initMoney = opts.initMoney;
			this.initDiamoned = opts.initDiamoned;
			this.initRank = opts.initRank;
		}

		public void CopyFromJson( Hashtable json )
		{
			this.wxAppID = json.GetString( "wxAppID" );
			this.wxAppSecret = json.GetString( "wxAppSecret" );
			this.code2sessionUrl = json.GetString( "code2sessionUrl" );
			this.cliPort = json.GetInt( "cliPort" );
			this.csIP = json.GetString( "csIP" );
			this.csPort = json.GetInt( "csPort" );
			this.dbIP = json.GetString( "dbIP" );
			this.dbPort = json.GetInt( "dbPort" );
			this.redisIP = json.GetString( "redisIP" );
			this.redisPort = json.GetInt( "redisPort" );
			this.redisPwd = json.GetString( "redisPwd" );
			this.pingInterval = json.GetLong( "pingInterval" );
			Hashtable secretDef = ( Hashtable )MiniJSON.JsonDecode( File.ReadAllText( json.GetString( "secret" ) ) );
			this.certPath = secretDef.GetString( "certPath" );
			this.certPass = secretDef.GetString( "certPass" );
			this.initMoney = json.GetInt( "init_money" );
			this.initDiamoned = json.GetInt( "init_diamoned" );
			this.initRank = json.GetInt( "init_rank" );
		}
	}
}