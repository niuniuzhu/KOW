using CommandLine;

namespace CentralServer
{
	public class Options
	{
		[Option( 'l', "log",
			Default = "Config/CSLogCfg.xml",
			HelpText = "Specify configuration file for log." )]
		public string logCfg { get; set; }

		[Option( 'c', "cfg",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify configuration file." )]
		public string cfg { get; set; }

		[Option( "match_defs",
			Default = "Config/matching.json",
			HelpText = "Specify configuration file for matching system." )]
		public string matchDefs { get; set; }

		[Option( 'f', "defs",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify definition file." )]
		public string defs { get; set; }

		[Option( "goods",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify goods file." )]
		public string goods { get; set; }

		[Option( "script_path",
			Default = "./Scripts",
			SetName = "bycfg",
			HelpText = "Specify the path of lua script." )]
		public string scriptPath { get; set; }

		[Option( "id",
			Default = ( uint )1,
			SetName = "bysetting",
			HelpText = "ID for central server." )]
		public uint csID { get; set; }

		[Option( "ls_port",
			Default = 10001,
			SetName = "bysetting",
			HelpText = "Login server port." )]
		public int lsPort { get; set; }

		[Option( "gs_port",
			Default = 10002,
			SetName = "bysetting",
			HelpText = "Gate server port." )]
		public int gsPort { get; set; }

		[Option( "bs_port",
			Default = 10003,
			SetName = "bysetting",
			HelpText = "Battle server port." )]
		public int bsPort { get; set; }

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

		[Option( "shell_port",
			Default = 50001,
			SetName = "bysetting",
			HelpText = "sehll port." )]
		public int shellPort { get; set; }

		[Option( "max_gs_num",
			Default = 10,
			SetName = "bycfg",
			HelpText = "Maximun number of gate server." )]
		public int maxGSNum { get; set; }

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
			Default = "juntai.yytou.com",
			SetName = "bysetting",
			HelpText = "Password for redis server." )]
		public string redisPwd { get; set; }

		[Option( "session_exp_time",
			Default = 60000,
			SetName = "bysetting",
			HelpText = "Expire time for login session." )]
		public long sessionExpTime { get; set; }
	}
}