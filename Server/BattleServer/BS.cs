﻿using BattleServer.Battle;
using BattleServer.Biz;
using BattleServer.Net;
using BattleServer.User;
using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;
using System.Collections;
using System.IO;
using System.Security.Cryptography.X509Certificates;

namespace BattleServer
{
	public class BS
	{
		private static BS _instance;
		public static BS instance => _instance ?? ( _instance = new BS() );

		public BSConfig config { get; private set; }

		public readonly BSNetSessionMgr netSessionMgr = new BSNetSessionMgr();
		public readonly BizProcessor bizProcessor = new BizProcessor();
		public readonly BattleManager battleMgr = new BattleManager();
		public readonly BSUserMgr userMgr = new BSUserMgr();

		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly Scheduler _heartBeater = new Scheduler();

		public BSConfig.State state;

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
			this._luaEnv.DoString( "require \"bs\"" );
#endif
			this.config = new BSConfig();
			this.config.defPath = opts.defs;
			if ( string.IsNullOrEmpty( opts.cfg ) )
				this.config.CopyFromCLIOptions( opts );
			else
				this.config.CopyFromJson( ( Hashtable )MiniJSON.JsonDecode( File.ReadAllText( opts.cfg ) ) );
			this.ReloadDefs();
			return ErrorCode.Success;
		}

		public ErrorCode Start()
		{
			this._heartBeater.Start( Consts.HEART_BEAT_INTERVAL, this.OnHeartBeat );

			X509Certificate2 certificate = new X509Certificate2( this.config.certPath, this.config.certPass );

			IListener cliListener = this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket, certificate, this.netSessionMgr.CreateClientSession );
			cliListener.Start( this.config.externalPort );

			IListener shellListener = this.netSessionMgr.CreateListener( 1, 65535, ProtoType.TCP, null, this.netSessionMgr.CreateShellSession );
			shellListener.Start( this.config.shellPort );
			ShellSession.key = "4CA92E10-4FF7-485B-A553-32217319ADA1";
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

			this.netSessionMgr.CreateConnector<B2CSSession>( SessionType.ServerB2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 1024 * 1024, 0 );
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
			NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
			this.battleMgr.Update( Consts.HEART_BEAT_INTERVAL );
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

		public void ReloadDefs() => Defs.Load( File.ReadAllText( this.config.defPath ) );
	}
}