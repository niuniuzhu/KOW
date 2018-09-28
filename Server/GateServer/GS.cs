using System.Collections.Generic;
using Core.Misc;
using Core.Net;
using GateServer.Net;
using Newtonsoft.Json;
using Shared;
using Shared.Net;
using System.IO;

namespace GateServer
{
	public partial class GS
	{
		private static GS _instance;
		public static GS instance => _instance ?? ( _instance = new GS() );

		public GSNetSessionMgr netSessionMgr { get; } = new GSNetSessionMgr();
		public GSConfig config { get; private set; }

		public GSConfig.State state;

		public readonly Dictionary<ulong, uint> GcNidToSid = new Dictionary<ulong, uint>();

		private readonly Scheduler _heartBeater = new Scheduler();

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

			WSListener cliListener = ( WSListener )this.netSessionMgr.CreateListener( 0, 65535, ProtoType.WebSocket, this.netSessionMgr.CreateClientSession );
			cliListener.Start( "ws", this.config.externalPort );

			this.netSessionMgr.CreateConnector<G2CSSession>( SessionType.ServerG2CS, this.config.csIP, this.config.csPort, ProtoType.TCP, 65535, 0 );
			return ErrorCode.Success;
		}

		public void Update( long elapsed, long dt )
		{
			this.netSessionMgr.Update();
			NetworkMgr.instance.Update( elapsed, dt );
			this._heartBeater.Update( dt );
		}

		private void OnHeartBeat( int count ) => NetworkMgr.instance.OnHeartBeat( Consts.HEART_BEAT_INTERVAL );
	}
}