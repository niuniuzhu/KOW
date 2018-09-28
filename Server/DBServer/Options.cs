using CommandLine;

namespace DBServer
{
	public class Options
	{
		[Option( 'l', "log",
			Default = "Config/DBLogCfg.xml",
			HelpText = "Specify configuration file for log." )]
		public string logCfg { get; set; }

		[Option( 'c', "cfg",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify configuration file." )]
		public string cfg { get; set; }

		[Option( "ls_port",
			Default = 20001,
			SetName = "bysetting",
			HelpText = "Login server port." )]
		public int lsPort { get; set; }

		[Option( "cs_port",
			Default = 20002,
			SetName = "bysetting",
			HelpText = "Central server port." )]
		public int csPort { get; set; }
	}
}