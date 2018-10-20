using CentralServer.Match;
using CentralServer.Net;
using CentralServer.User;
using Core.Misc;
using Core.Net;
using Newtonsoft.Json;
using Shared;
using Shared.DB;
using System.Collections.Generic;
using System.IO;

namespace CentralServer
{
	public partial class CS
	{
		private static CS _instance;
		public static CS instance => _instance ?? ( _instance = new CS() );

		public CSNetSessionMgr netSessionMgr { get; } = new CSNetSessionMgr();
		public CSConfig config { get; private set; }
		public DBConfig dbConfig { get; private set; }

		public readonly RedisWrapper redisWrapper = new RedisWrapper();
		public readonly CSUserMgr userMgr = new CSUserMgr();
		public readonly LoginCertificate certificate = new LoginCertificate();
		public readonly Matcher matcher = new Matcher();
		public readonly Dictionary<uint, GSInfo> LIDToGSInfos = new Dictionary<uint, GSInfo>();
		public readonly Dictionary<uint, BSInfo> LIDToBSInfos = new Dictionary<uint, BSInfo>();
		public BSInfo appropriateBSInfo { get; private set; }

		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly Scheduler _heartBeater = new Scheduler();

		public ErrorCode Initialize( Options opts )
		{
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config = new CSConfig();
				this.config.CopyFromCLIOptions( opts );
				return ErrorCode.Success;
			}
			try
			{
				this.config = JsonConvert.DeserializeObject<CSConfig>( File.ReadAllText( opts.cfg ) );
			}
			catch ( System.Exception e )
			{
				Logger.Error( e );
				return ErrorCode.CfgLoadFailed;
			}
			if ( string.IsNullOrEmpty( opts.dbCfg ) )
				return ErrorCode.DBCfgLoadFailed;
			try
			{
				this.dbConfig = new DBConfig();
				this.dbConfig.Load( opts.dbCfg );
			}
			catch ( System.Exception e )
			{
				Logger.Error( e );
				return ErrorCode.DBCfgLoadFailed;
			}
			return ErrorCode.Success;
		}

		public ErrorCode Start()
		{
			this._heartBeater.Start( Consts.HEART_BEAT_INTERVAL, this.OnHeartBeat );
			this.netSessionMgr.CreateListener( 0, 65535, ProtoType.TCP, this.netSessionMgr.CreateLSSession ).Start( this.config.lsPort );
			this.netSessionMgr.CreateListener( 1, 65535, ProtoType.TCP, this.netSessionMgr.CreateGSSession ).Start( this.config.gsPort );
			this.netSessionMgr.CreateListener( 2, 65535, ProtoType.TCP, this.netSessionMgr.CreateBSSession ).Start( this.config.bsPort );
			this.redisWrapper.Connect( this.config.redisIP, this.config.redisPort, this.config.redisPwd );

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
			this.UpdateAppropriateBSInfo();
			this.certificate.OnHeartBeat();
			this.matcher.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
			NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
			this.redisWrapper.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
		}

		/// <summary>
		/// 更新最适合的BS
		/// </summary>
		private void UpdateAppropriateBSInfo()
		{
			this.appropriateBSInfo = null;
			int minState = int.MaxValue;
			foreach ( KeyValuePair<uint, BSInfo> kv in this.LIDToBSInfos )
			{
				int state = ( int ) kv.Value.state;
				if ( state < minState )
					this.appropriateBSInfo = kv.Value;
			}
		}
	}
}