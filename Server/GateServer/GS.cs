using Core.Misc;
using Core.Net;
using GateServer.Net;
using Newtonsoft.Json;
using Shared;
using Shared.Net;
using System.IO;

namespace GateServer
{
	public class GS
	{
		private static GS _instance;
		public static GS instance => _instance ?? ( _instance = new GS() );
		public GSConfig config { get; private set; }

		public readonly GSNetSessionMgr netSessionMgr = new GSNetSessionMgr();
		public readonly GSUserMgr userMgr = new GSUserMgr();

		private readonly UpdateContext _updateContext = new UpdateContext();
		private readonly Scheduler _heartBeater = new Scheduler();

		public GSConfig.State state;

		public ErrorCode Initialize( Options opts )
		{
			if ( string.IsNullOrEmpty( opts.cfg ) )
			{
				this.config = new GSConfig();
				this.config.CopyFromCLIOptions( opts );
				return ErrorCode.Success;
			}
			try
			{
				this.config = JsonConvert.DeserializeObject<GSConfig>( File.ReadAllText( opts.cfg ) );
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
			cliListener.Start( this.config.externalPort );

			this.netSessionMgr.CreateConnector<G2CSSession>( SessionType.ServerG2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 65535, 0 );
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
	}
}