using CommandLine;

namespace GateServer
{
	public class Options
	{
		[Option( 'l', "log",
			Default = "./Config/GSLogCfg.xml",
			HelpText = "Specify configuration file for log." )]
		public string logCfg { get; set; }

		[Option( 'c', "cfg",
			Default = "./Config/GSCfg.json",
			SetName = "bycfg",
			HelpText = "Specify configuration file." )]
		public string cfg { get; set; }

		[Option( "script_path",
			Default = "./Scripts",
			SetName = "bycfg",
			HelpText = "Specify the path of lua script." )]
		public string scriptPath { get; set; }

		[Option( 'f', "defs",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify definition file." )]
		public string defs { get; set; }

		[Option( "id",
			Default = ( uint )30001,
			SetName = "bysetting",
			HelpText = "ID for gate server." )]
		public uint gsID { get; set; }

		[Option( 'n', "name",
			Default = "local",
			SetName = "bysetting",
			HelpText = "Name for gate server." )]
		public string name { get; set; }

		[Option( 'i', "external_ip",
			Default = "127.0.0.1",
			SetName = "bysetting",
			HelpText = "Exposed IPAddress for gate server." )]
		public string externalIP { get; set; }

		[Option( 'p', "external_port",
			Default = 30001,
			SetName = "bysetting",
			HelpText = "Exposed gate server port." )]
		public int externalPort { get; set; }

	    [Option("secret",
	        Default = "Config/secret.json",
	        SetName = "bysetting",
	        HelpText = "Certificate path.")]
	    public string secret { get; set; }

        [Option( "shell_port",
			Default = 50002,
			SetName = "bysetting",
			HelpText = "sehll port." )]
		public int shellPort { get; set; }

		[Option( 'p', "password",
			Default = "123456",
			SetName = "bysetting",
			HelpText = "Password for gate server." )]
		public string password { get; set; }

		[Option( "max_connection",
			Default = 10000,
			SetName = "bycfg",
			HelpText = "Maximun connection for gate server." )]
		public int maxConnection { get; set; }

		[Option( "cs_ip",
			Default = "127.0.0.1",
			SetName = "bysetting",
			HelpText = "IPaddress of central server." )]
		public string csIP { get; set; }

		[Option( "cs_port",
			Default = 10002,
			SetName = "bysetting",
			HelpText = "central server port." )]
		public int csPort { get; set; }

		[Option( "report_interval",
			Default = 10000,
			SetName = "bysetting",
			HelpText = "interval to report to cs." )]
		public long reportInterval { get; set; }

		[Option( "ping_interval",
			Default = 10000,
			SetName = "bysetting",
			HelpText = "interval to ping to cs." )]
		public long pingInterval { get; set; }

		[Option( "gc_live",
			Default = 15000,
			SetName = "bysetting",
			HelpText = "gate client live time." )]
		public long gcLive { get; set; }
	}
}