using Core.Misc;
using Core.Net;
using GateServer.Biz;
using GateServer.Net;
using Shared;
using Shared.Battle;
using Shared.Net;
using System;
using System.Collections;
using System.IO;
using System.Security.Cryptography.X509Certificates;

namespace GateServer
{
	public class GS
	{
		private static GS _instance;
		public static GS instance => _instance ?? ( _instance = new GS() );
		public GSConfig config { get; private set; }

		public readonly GSNetSessionMgr netSessionMgr = new GSNetSessionMgr();
		public readonly BizProcessor bizProcessor = new BizProcessor();
		public readonly GSUserMgr userMgr = new GSUserMgr();

		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly Scheduler _heartBeater = new Scheduler();

		public GSConfig.State state;

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
			this._luaEnv.DoString( "require \"gs\"" );
#endif
			this.config = new GSConfig();
			this.config.defPath = opts.defs;
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config.CopyFromCLIOptions( opts );
				return ErrorCode.Success;
			}
			try
			{
				this.config.CopyFromJson( ( Hashtable )MiniJSON.JsonDecode( File.ReadAllText( opts.cfg ) ) );
			}
			catch ( Exception e )
			{
				Logger.Error( e );
				return ErrorCode.CfgLoadFailed;
			}
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
			ShellSession.key = "88F77D88-8C5A-4FE7-B099-68088A27C8DE";
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

			this.netSessionMgr.CreateConnector<G2CSSession>( SessionType.ServerG2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 1024 * 1024, 0 );

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

		private void OnHeartBeat( int count ) => NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );

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