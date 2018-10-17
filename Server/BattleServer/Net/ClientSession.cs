using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;

namespace BattleServer.Net
{
	public class ClientSession : SrvCliSession
	{
		private long _activeTime;
		private ulong _sid;

		protected ClientSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGc2BsAskLogin, this.OnGc2BsAskLogin );
			this._msgCenter.Register( Protos.MsgID.EGc2BsKeepAlive, this.OnGc2BsKeepAlive );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"client({this.id}) connected" );
			this._activeTime = TimeUtils.utcTime;
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"client({this.id}) disconnected with msg:{reason}" );

			this._activeTime = 0;
			this._sid = 0;
		}

		protected override void OnHeartBeat( long dt )
		{
			if ( TimeUtils.utcTime > this._activeTime + BS.instance.config.gcLive )
				this.Close( "gc connection timeout" );
		}

		private ErrorCode OnGc2BsAskLogin( Google.Protobuf.IMessage message )
		{
			Protos.GC2BS_AskLogin login = ( Protos.GC2BS_AskLogin ) message;
			this._sid = login.SessionID;

			Logger.Log( $"client:{login.SessionID} ask login" );

			//todo
			return ErrorCode.Success;
		}

		private ErrorCode OnGc2BsKeepAlive( Google.Protobuf.IMessage message )
		{
			this._activeTime = TimeUtils.utcTime;
			return ErrorCode.Success;
		}
	}
}