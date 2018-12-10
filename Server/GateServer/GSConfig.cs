using System.Collections;
using Core.Misc;

namespace GateServer
{
	public class GSConfig
	{
		public enum State
		{
			Free,
			Busy,
			Full,
			Close
		}
		public uint gsID;
		public string name;
		public string externalIP;
		public int externalPort;
		public string certPath;
		public string certPass;
		public int shellPort;
		public string password;
		public int maxConnection;
		public string csIP;
		public int csPort;
		public long reportInterval;
		public long pingInterval;
		public long gcLive;
		public string defPath;

		public void CopyFromCLIOptions( Options opts )
		{
			this.gsID = opts.gsID;
			this.name = opts.name;
			this.externalIP = opts.externalIP;
			this.externalPort = opts.externalPort;
			this.certPath = opts.certPath;
			this.certPass = opts.certPass;
			this.shellPort = opts.shellPort;
			this.password = opts.password;
			this.maxConnection = opts.maxConnection;
			this.csIP = opts.csIP;
			this.csPort = opts.csPort;
			this.reportInterval = opts.reportInterval;
			this.pingInterval = opts.pingInterval;
			this.gcLive = opts.gcLive;
		}

		public void CopyFromJson( Hashtable json )
		{
			this.gsID = json.GetUInt( "gsID" );
			this.name = json.GetString( "name" );
			this.externalIP = json.GetString( "externalIP" );
			this.externalPort = json.GetInt( "externalPort" );
			this.certPath = json.GetString( "certPath" );
			this.certPass = json.GetString( "certPass" );
			this.shellPort = json.GetInt( "shellPort" );
			this.password = json.GetString( "password" );
			this.maxConnection = json.GetInt( "maxConnection" );
			this.csIP = json.GetString( "csIP" );
			this.csPort = json.GetInt( "csPort" );
			this.reportInterval = json.GetLong( "reportInterval" );
			this.pingInterval = json.GetLong( "pingInterval" );
			this.gcLive = json.GetLong( "gcLive" );
		}
	}
}