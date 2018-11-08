using System.Collections;
using System.Collections.Generic;
using Core.Misc;

namespace DBServer
{
	public class DBConfig
	{
		public class DBEntry
		{
			public string ip;
			public int port;
			public string user;
			public string pwd;
			public string dbname;
		}

		public enum DBType
		{
			Account,
			Game,
			Log,
			Mail
		}

		public int lsPort;
		public int csPort;
		public IList<DBEntry> dbs;

		public void CopyFromJson( Hashtable json )
		{
			this.lsPort = json.GetInt( "lsPort" );
			this.csPort = json.GetInt( "csPort" );
			Hashtable[] dbs = json.GetMapArray( "DBs" );
			int count = dbs.Length;
			this.dbs = new DBEntry[count];
			for ( int i = 0; i < count; i++ )
			{
				Hashtable db = dbs[i];
				DBEntry entry = new DBEntry
				{
					ip = db.GetString( "ip" ),
					port = db.GetInt( "port" ),
					user = db.GetString( "user" ),
					pwd = db.GetString( "pwd" ),
					dbname = db.GetString( "dbname" )
				};
				this.dbs[i] = entry;
			}
		}
	}
}