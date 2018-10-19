using Core.Misc;
using Core.Net;
using DBServer.Net;
using Newtonsoft.Json;
using Shared;
using Shared.DB;
using System.IO;

namespace DBServer
{
	public partial class DB
	{
		private static DB _instance;
		public static DB instance => _instance ?? ( _instance = new DB() );

		public DBConfig config { get; private set; }

		public readonly DBNetSessionMgr netSessionMgr = new DBNetSessionMgr();
		public readonly DBWrapper accountDB = new DBWrapper();

		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly Scheduler _heartBeater = new Scheduler();

		public ErrorCode Initialize( Options opts )
		{
			try
			{
				this.config = JsonConvert.DeserializeObject<DBConfig>( File.ReadAllText( opts.cfg ) );
			}
			catch ( System.Exception e )
			{
				Logger.Error( e );
				return ErrorCode.CfgLoadFailed;
			}
			return ErrorCode.Success;
		}

		public ErrorCode Start()
		{
			this._heartBeater.Start( Consts.HEART_BEAT_INTERVAL, this.OnHeartBeat );
			this.netSessionMgr.CreateListener( 0, 65535, ProtoType.TCP, this.netSessionMgr.CreateLSSession ).Start( this.config.lsPort );
			this.netSessionMgr.CreateListener( 1, 65535, ProtoType.TCP, this.netSessionMgr.CreateGSSession ).Start( this.config.csPort );
			DBConfig.DBEntry accountDBCfg = this.config.GetDBCfg( DBConfig.DBType.Account );
			this.accountDB.Start( accountDBCfg.ip, accountDBCfg.port, accountDBCfg.pwd, accountDBCfg.user, accountDBCfg.dbname );

			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this._updateContext.utcTime = TimeUtils.utcTime;
			this._updateContext.time = elapsed;
			this._updateContext.deltaTime = dt;

			this.netSessionMgr.Update( this._updateContext );
			NetworkMgr.instance.Update( this._updateContext );
			this._heartBeater.Update( dt );
		}

		private void OnHeartBeat( int count )
		{
			NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
		}
	}
}