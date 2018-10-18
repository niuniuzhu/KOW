using CommandLine;

namespace BattleServer
{
	public class Options
	{
		[Option( 'l', "log",
			Default = "Config/BSLogCfg.xml",
			HelpText = "Specify configuration file for log." )]
		public string logCfg { get; set; }

		[Option( 'c', "cfg",
			Default = "",
			SetName = "bycfg",
			HelpText = "Specify configuration file." )]
		public string cfg { get; set; }

		[Option( "id",
			Default = ( uint )30001,
			SetName = "bysetting",
			HelpText = "ID for gate server." )]
		public uint id { get; set; }

		[Option( 'i', "external_ip",
			Default = "127.0.0.1",
			SetName = "bysetting",
			HelpText = "Exposed IPAddress for gate server." )]
		public string externalIP { get; set; }

		[Option( 'p', "external_port",
			Default = 40001,
			SetName = "bysetting",
			HelpText = "Exposed gate server port." )]
		public int externalPort { get; set; }

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

		[Option( "frameRate",
			Default = 200,
			SetName = "bysetting",
			HelpText = "the frame rate of the logical update." )]
		public int frameRate { get; set; }

		[Option( "keyframeStep",
			Default = 4,
			SetName = "bysetting",
			HelpText = "how long the step between two key frame." )]
		public int keyframeStep { get; set; }
	}
}