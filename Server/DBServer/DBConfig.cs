using System.Collections.Generic;

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

		public DBEntry GetDBCfg( DBType dbType ) => this.dbs[( int )dbType];
	}
}