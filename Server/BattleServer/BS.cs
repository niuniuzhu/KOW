using BattleServer.Battle;
using BattleServer.Net;
using Core.Misc;
using Core.Net;
using Newtonsoft.Json;
using Shared;
using Shared.Net;
using System.IO;

namespace BattleServer
{
	public partial class BS
	{
		private static BS _instance;
		public static BS instance => _instance ?? ( _instance = new BS() );

		public BSConfig config { get; private set; }

		public readonly BSNetSessionMgr netSessionMgr = new BSNetSessionMgr();
		public readonly WaitingRoomMgr waitingRoomMgr = new WaitingRoomMgr();
		public readonly BattleManager battleManager = new BattleManager();
		public readonly BSUserMgr userMgr = new BSUserMgr();

		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly Scheduler _heartBeater = new Scheduler();

		public BSConfig.State state;

		public ErrorCode Initialize( Options opts )
		{
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config = new BSConfig();
				this.config.CopyFromCLIOptions( opts );
				return ErrorCode.Success;
			}
			try
			{
				this.config = JsonConvert.DeserializeObject<BSConfig>( File.ReadAllText( opts.cfg ) );
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

			WSListener cliListener = ( WSListener ) this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket, this.netSessionMgr.CreateClientSession );
			cliListener.Start( "ws", this.config.externalPort );

			this.netSessionMgr.CreateConnector<B2CSSession>( SessionType.ServerB2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 65535, 0 );
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
			this.waitingRoomMgr.Update( Consts.HEART_BEAT_INTERVAL );
			this.battleManager.Update( Consts.HEART_BEAT_INTERVAL );
		}
	}
}