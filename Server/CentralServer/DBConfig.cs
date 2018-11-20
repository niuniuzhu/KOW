using Core.Misc;
using System.Collections;
using System.Collections.Generic;

namespace CentralServer
{
	public class DBConfig
	{
		public enum DBType
		{
			None,
			Game,
			Account,
			Log,
			Mail
		}

		public class DBCfg
		{
			public string ip;
			public int port;
			public string username;
			public string passwd;
			public string dbname;
		}

		public DBCfg this[DBType dbType] => this._dbCfgMap[dbType];

		private readonly Dictionary<DBType, DBCfg> _dbCfgMap = new Dictionary<DBType, DBCfg>();

		public void CopyFromJson( Hashtable json )
		{
			Hashtable[] dbs = json.GetMapArray( "DB" );
			foreach ( Hashtable db in dbs )
			{
				DBCfg cfg = new DBCfg();
				DBType dtype = ( DBType )db.GetInt( "type" );
				cfg.ip = db.GetString( "ip" );
				cfg.port = db.GetInt( "port" );
				cfg.username = db.GetString( "user" );
				cfg.passwd = db.GetString( "pwd" );
				cfg.dbname = db.GetString( "dbname" );
				this._dbCfgMap[dtype] = cfg;
			}
		}
	}
}