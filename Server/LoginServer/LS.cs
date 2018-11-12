﻿using Core.Misc;
using Core.Net;
using LoginServer.Net;
using Shared;
using Shared.DB;
using Shared.Net;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace LoginServer
{
	public class LS
	{
		private static LS _instance;
		public static LS instance => _instance ?? ( _instance = new LS() );

		public LSConfig config { get; private set; }

		public readonly RedisWrapper redisWrapper = new RedisWrapper();
		public readonly LSNetSessionMgr netSessionMgr = new LSNetSessionMgr();
		public readonly Dictionary<uint, GSInfo> gsInfos = new Dictionary<uint, GSInfo>();

		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly Scheduler _heartBeater = new Scheduler();

		public ErrorCode Initialize( Options opts )
		{
			this.config = new LSConfig();
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config.CopyFromCLIOptions( opts );
				return ErrorCode.Success;
			}
			try
			{
				this.config.CopyFromJson( ( Hashtable )MiniJSON.JsonDecode( File.ReadAllText( opts.cfg ) ) );
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
			( ( WSListener ) this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket,
																this.netSessionMgr.CreateClientSession ) )
				.Start( this.config.cliPort/*, true, new X509Certificate2( "Config/server.pfx", "159753" )*/ );
			this.netSessionMgr.CreateConnector<L2CSSession>( SessionType.ServerL2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 65535, 0 );
			this.netSessionMgr.CreateConnector<L2DBSession>( SessionType.ServerL2DB, this.config.dbIP, this.config.dbPort, ProtoType.TCP, 65535, 0 );
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

		private void OnHeartBeat( int count ) => NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );

		public void Dispose()
		{
			NetworkMgr.instance.Dispose();
			NetSessionPool.instance.Dispose();
		}
	}
}