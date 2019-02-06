using CommandLine;

namespace LoginServer
{
	public class Options
	{
		[Option( 'l', "log",
			Default = "Config/LSLogCfg.xml",
			HelpText = "Specify configuration file for log." )]
		public string logCfg { get; set; }

		[Option( 'c', "cfg",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify configuration file." )]
		public string cfg { get; set; }

		[Option( "wxAppID",
			SetName = "bysetting",
			HelpText = "wx appID" )]
		public string wxAppID { get; set; }

		[Option( "wxAppSecret",
			SetName = "bysetting",
			HelpText = "wx AppSecret" )]
		public string wxAppSecret { get; set; }

		[Option( 'p', "cli_port",
			Default = 49996,
			SetName = "bysetting",
			HelpText = "Exposed port for login server." )]
		public int cliPort { get; set; }

		[Option( "cs_ip",
			Default = "127.0.0.1",
			SetName = "bysetting",
			HelpText = "IPAddress of central server to connect." )]
		public string csIP { get; set; }

		[Option( "cs_port",
			Default = 10001,
			SetName = "bysetting",
			HelpText = "Port of central server." )]
		public int csPort { get; set; }

		[Option( "db_ip",
			Default = "127.0.0.1",
			SetName = "bysetting",
			HelpText = "IPAddress of db server to connect." )]
		public string dbIP { get; set; }

		[Option( "db_port",
			Default = 20001,
			SetName = "bysetting",
			HelpText = "Port of db server." )]
		public int dbPort { get; set; }

		[Option( "redis_ip",
			Default = "juntai.yytou.com",
			SetName = "bysetting",
			HelpText = "IPaddress of redis server." )]
		public string redisIP { get; set; }

		[Option( "redis_port",
			Default = 23680,
			SetName = "bysetting",
			HelpText = "Redis server port." )]
		public int redisPort { get; set; }

		[Option( "redis_pwd",
			Default = "",
			SetName = "bysetting",
			HelpText = "Password for redis server." )]
		public string redisPwd { get; set; }

		[Option( "secret",
			Default = "Config/secret.json",
			SetName = "bysetting",
			HelpText = "Certificate path." )]
		public string secret { get; set; }

		[Option( "ping_interval",
			Default = 10000,
			SetName = "bysetting",
			HelpText = "interval to ping to cs." )]
		public long pingInterval { get; set; }

		[Option( "code2session_url",
			Default = "",
			SetName = "bysetting",
			HelpText = "Expire time for login session." )]
		public string code2sessionUrl { get; set; }

		[Option( "init_money",
			Default = 500,
			SetName = "bysetting",
			HelpText = "init money" )]
		public int initMoney { get; set; }

		[Option( "init_diamoned",
			Default = 200,
			SetName = "bysetting",
			HelpText = "init diamoned" )]
		public int initDiamoned { get; set; }

		[Option( "init_rank",
			Default = 0,
			SetName = "bysetting",
			HelpText = "init rank" )]
		public int initRank { get; set; }
	}
}