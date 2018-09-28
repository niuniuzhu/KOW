using System;

namespace Core.Net
{
	public class KCPProxy
	{
		public delegate void KCPDataOutputHandler( byte[] data );

		private readonly KCP _kcp;
		private bool _kcpUpdateFlag;
		private long _nextKcpUpdateTime;
		private long _time;

		internal KCPProxy( Action<byte[], int> output )
		{
			this._kcp = new KCP( ProtoConfig.CONN_KEY, output );
			this._kcp.NoDelay( ProtoConfig.KCP_NO_DELAY, ProtoConfig.KCP_INTERVAL, ProtoConfig.KCP_RESEND,
							   ProtoConfig.KCP_NC );
			this._kcp.WndSize( ProtoConfig.KCP_SND_WIN, ProtoConfig.KCP_REV_WIN );
			this._kcp.SetMtu( ProtoConfig.KCP_MTU );
		}

		internal void Dispose()
		{
		}

		internal void Release()
		{
			this._kcp.Release();
			this._kcpUpdateFlag = false;
			this._nextKcpUpdateTime = 0;
			this._time = 0;
		}

		internal void Send( byte[] data, int offset, int size )
		{
			this._kcpUpdateFlag = true;
			this._kcp.Send( data, offset, size );
		}

		internal void ProcessData( byte[] data, int offset, int size, KCPDataOutputHandler kcpDataOutputHandler )
		{
			int ret = this._kcp.Input( data, offset, size );

			if ( ret < 0 )
				return;

			this._kcpUpdateFlag = true;

			int peekSize;
			while ( ( peekSize = this._kcp.PeekSize() ) > 0 )
			{
				byte[] buffer = new byte[peekSize];
				int recv = this._kcp.Recv( buffer, 0, peekSize );
				if ( recv > 0 )
					kcpDataOutputHandler( buffer );
			}
		}

		internal void Update( long dt )
		{
			this._time += dt;
			if ( !this._kcpUpdateFlag && this._time < this._nextKcpUpdateTime )
				return;
			this._kcp.Update( ( uint )this._time );
			this._nextKcpUpdateTime = this._kcp.Check( ( uint )this._time );
			this._kcpUpdateFlag = false;
		}
	}
}