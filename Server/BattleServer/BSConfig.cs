using System.Collections;
using System.IO;
using Core.Misc;

namespace BattleServer
{
	public class BSConfig
	{
		public enum State
		{
			Free,
			Busy,
			Full,
			Close
		}
		public uint id;
		public string externalIP;
		public int externalPort;
		public string certPath;
		public string certPass;
		public string csIP;
		public int csPort;
		public int shellPort;
		public long reportInterval;
		public long pingInterval;
		public long gcLive;
		public string defPath;

		public void CopyFromJson( Hashtable json )
		{
			this.id = json.GetUInt( "ID" );
			this.externalIP = json.GetString( "externalIP" );
			this.externalPort = json.GetInt( "externalPort" );
			this.csIP = json.GetString( "csIP" );
			this.csPort = json.GetInt( "csPort" );
			this.shellPort = json.GetInt( "shellPort" );
			this.reportInterval = json.GetLong( "reportInterval" );
			this.pingInterval = json.GetLong( "pingInterval" );
			this.gcLive = json.GetLong( "gcLive" );
		    Hashtable secretDef = (Hashtable)MiniJSON.JsonDecode(File.ReadAllText(json.GetString("secret")));
		    this.certPath = secretDef.GetString("certPath");
		    this.certPass = secretDef.GetString("certPass");
        }

		public void CopyFromCLIOptions( Options opts )
		{
			this.id = opts.id;
			this.externalIP = opts.externalIP;
			this.externalPort = opts.externalPort;
			this.csIP = opts.csIP;
			this.csPort = opts.csPort;
			this.shellPort = opts.shellPort;
			this.reportInterval = opts.reportInterval;
			this.pingInterval = opts.pingInterval;
			this.gcLive = opts.gcLive;
		    Hashtable secretDef = (Hashtable)MiniJSON.JsonDecode(File.ReadAllText(opts.secret));
		    this.certPath = secretDef.GetString("certPath");
		    this.certPass = secretDef.GetString("certPass");
        }
	}
}