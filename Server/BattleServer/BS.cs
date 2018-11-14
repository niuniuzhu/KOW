using BattleServer.Battle;
using BattleServer.Net;
using BattleServer.User;
using Core.Misc;
using Core.Net;
using Shared;
using Shared.Battle;
using Shared.Net;
using System.Collections;
using System.IO;
using BattleServer.Biz;

namespace BattleServer
{
	public class BS
	{
		private static BS _instance;
		public static BS instance => _instance ?? ( _instance = new BS() );

		public BSConfig config { get; private set; }

		public readonly BSNetSessionMgr netSessionMgr = new BSNetSessionMgr();
		public readonly BizProcessor bizProcessor = new BizProcessor();
		public readonly BattleManager battleManager = new BattleManager();
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
			try
			{
				Defs.Init( ( Hashtable )MiniJSON.JsonDecode( File.ReadAllText( opts.defs ) ) );
			}
			catch ( System.Exception e )
			{
				Logger.Error( e );
				return ErrorCode.DefsLoadFailed;
			}
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config = new BSConfig();
				this.config.CopyFromCLIOptions( opts );
				return ErrorCode.Success;
			}
			try
			{
				this.config = new BSConfig();
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

			WSListener cliListener = ( WSListener )this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket, this.netSessionMgr.CreateClientSession );
			cliListener.Start( this.config.externalPort );

			IListener shellListener = this.netSessionMgr.CreateListener( 1, 65535, ProtoType.TCP, this.netSessionMgr.CreateShellSession );
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
			this.battleManager.Update( Consts.HEART_BEAT_INTERVAL );
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
	}
}