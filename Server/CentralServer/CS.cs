﻿using CentralServer.Match;
using CentralServer.Net;
using CentralServer.User;
using Core.Misc;
using Core.Net;
using Shared;
using Shared.Battle;
using Shared.DB;
using Shared.Net;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace CentralServer
{
	public class CS
	{
		private static CS _instance;
		public static CS instance => _instance ?? ( _instance = new CS() );

		public CSConfig config { get; private set; }
		public DBConfig dbConfig { get; private set; }

		/// <summary>
		/// Session管理器
		/// </summary>
		public readonly CSNetSessionMgr netSessionMgr = new CSNetSessionMgr();
		/// <summary>
		/// Redis包装器
		/// </summary>
		public readonly RedisWrapper redisWrapper = new RedisWrapper();
		/// <summary>
		/// 玩家管理器
		/// </summary>
		public readonly CSUserMgr userMgr = new CSUserMgr();
		/// <summary>
		/// 匹配器
		/// </summary>
		public readonly Matcher matcher = new Matcher();
		/// <summary>
		/// 战场暂存区
		/// </summary>
		public readonly BattleStaging battleStaging = new BattleStaging();
		/// <summary>
		/// GS逻辑ID到GSInfo的映射
		/// </summary>
		public readonly Dictionary<uint, GSInfo> lIDToGSInfos = new Dictionary<uint, GSInfo>();
		/// <summary>
		/// BS逻辑ID到BSInfo的映射
		/// </summary>
		public readonly Dictionary<uint, BSInfo> lIDToBSInfos = new Dictionary<uint, BSInfo>();
		/// <summary>
		/// 最优GS
		/// </summary>
		public GSInfo appropriateGSInfo { get; private set; }
		/// <summary>
		/// 最优BS
		/// </summary>
		public BSInfo appropriateBSInfo { get; private set; }

		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly Scheduler _heartBeater = new Scheduler();

#if !DISABLE_LUA
		private XLua.LuaEnv _luaEnv;
#endif

		public ErrorCode Initialize( Options opts )
		{
#if !DISABLE_LUA
			XLua.XLuaGenIniterRegister.Init();
			XLua.WrapPusher.Init();
			XLua.DelegatesGensBridge.Init();

			this._luaEnv = new XLua.LuaEnv();
			this._luaEnv.AddLoader( ( ref string filepath ) => File.ReadAllBytes( Path.Combine( opts.scriptPath, filepath + ".lua" ) ) );
			this._luaEnv.DoString( "require \"cs\"" );
#endif
			try
			{
				Defs.Init( ( Hashtable )MiniJSON.JsonDecode( File.ReadAllText( opts.defs ) ) );
			}
			catch ( System.Exception e )
			{
				Logger.Error( e );
				return ErrorCode.DefsLoadFailed;
			}
			this.config = new CSConfig();
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

			IListener shellListener = this.netSessionMgr.CreateListener( 3, 65535, ProtoType.TCP, this.netSessionMgr.CreateShellSession );
			shellListener.Start( this.config.shellPort );
			ShellSession.key = "C01B0BAE-4948-4F02-9F45-BC371274C295";
			shellListener.OnSessionCreated += session =>
			{
				ShellSession ss = ( ShellSession )session;
				ss.shellCommandHandler = cmd =>
				{
					string s = string.Empty;
#if !DISABLE_LUA
					object[] result = this._luaEnv.DoString( $"return {cmd}" );
					if ( result != null )
					{
						for ( int i = 0; i < result.Length; i++ )
							s += result[i] == null ? "nil" : result[i].ToString();
					}
#endif
					return s;
				};
			};

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
#if !DISABLE_LUA
			this.OnLuaTick();
#endif
		}

		private void OnHeartBeat( int count )
		{
			this.UpdateAppropriateBSInfo();
			this.userMgr.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
			NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
			this.redisWrapper.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
		}

#if !DISABLE_LUA
		private void OnLuaTick() => this._luaEnv.Tick();
#endif

		public void Dispose()
		{
#if !DISABLE_LUA
			this._luaEnv.Dispose();
#endif
			NetworkMgr.instance.Dispose();
			NetSessionPool.instance.Dispose();
		}

		/// <summary>
		/// 更新最适合的BS
		/// </summary>
		public void UpdateAppropriateGSInfo()
		{
			this.appropriateGSInfo = null;
			int minState = int.MaxValue;
			foreach ( KeyValuePair<uint, GSInfo> kv in this.lIDToGSInfos )
			{
				int state = ( int )kv.Value.state;
				if ( state < minState )
					this.appropriateGSInfo = kv.Value;
			}
		}

		/// <summary>
		/// 更新最适合的BS
		/// </summary>
		public void UpdateAppropriateBSInfo()
		{
			this.appropriateBSInfo = null;
			int minState = int.MaxValue;
			foreach ( KeyValuePair<uint, BSInfo> kv in this.lIDToBSInfos )
			{
				int state = ( int )kv.Value.state;
				if ( state < minState )
					this.appropriateBSInfo = kv.Value;
			}
		}
	}
}