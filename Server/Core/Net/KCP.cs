using System;

namespace Core.Net
{
	public class KCP
	{
		public const int IKCP_RTO_NDL = 30;  // no delay min rto
		public const int IKCP_RTO_MIN = 100; // normal min rto
		public const int IKCP_RTO_DEF = 200;
		public const int IKCP_RTO_MAX = 60000;
		public const int IKCP_CMD_PUSH = 81; // cmd: push data
		public const int IKCP_CMD_ACK = 82; // cmd: ack
		public const int IKCP_CMD_WASK = 83; // cmd: window probe (ask)
		public const int IKCP_CMD_WINS = 84; // cmd: window size (tell)
		public const int IKCP_ASK_SEND = 1;  // need to send IKCP_CMD_WASK
		public const int IKCP_ASK_TELL = 2;  // need to send IKCP_CMD_WINS
		public const int IKCP_WND_SND = 32;
		public const int IKCP_WND_RCV = 32;
		public const int IKCP_MTU_DEF = 1400;
		public const int IKCP_ACK_FAST = 3;
		public const int IKCP_INTERVAL = 100;
		public const int IKCP_OVERHEAD = 24;
		public const int IKCP_DEADLINK = 10;
		public const int IKCP_THRESH_INIT = 2;
		public const int IKCP_THRESH_MIN = 2;
		public const int IKCP_PROBE_INIT = 7000;   // 7 secs to probe window size
		public const int IKCP_PROBE_LIMIT = 120000; // up to 120 secs to probe window


		// encode 8 bits unsigned int
		public static int ikcp_encode8u( byte[] p, int offset, byte c )
		{
			p[0 + offset] = c;
			return 1;
		}

		// decode 8 bits unsigned int
		public static int ikcp_decode8u( byte[] p, int offset, ref byte c )
		{
			c = p[0 + offset];
			return 1;
		}

		/* encode 16 bits unsigned int (lsb) */
		public static int ikcp_encode16u( byte[] p, int offset, ushort w )
		{
			p[0 + offset] = ( byte )( w >> 0 );
			p[1 + offset] = ( byte )( w >> 8 );
			return 2;
		}

		/* decode 16 bits unsigned int (lsb) */
		public static int ikcp_decode16u( byte[] p, int offset, ref ushort c )
		{
			ushort result = 0;
			result |= p[0 + offset];
			result |= ( ushort )( p[1 + offset] << 8 );
			c = result;
			return 2;
		}

		/* encode 32 bits unsigned int (lsb) */
		public static int ikcp_encode32u( byte[] p, int offset, uint l )
		{
			p[0 + offset] = ( byte )( l >> 0 );
			p[1 + offset] = ( byte )( l >> 8 );
			p[2 + offset] = ( byte )( l >> 16 );
			p[3 + offset] = ( byte )( l >> 24 );
			return 4;
		}

		/* decode 32 bits unsigned int (lsb) */
		public static int ikcp_decode32u( byte[] p, int offset, ref uint c )
		{
			uint result = 0;
			result |= p[0 + offset];
			result |= ( uint )( p[1 + offset] << 8 );
			result |= ( uint )( p[2 + offset] << 16 );
			result |= ( uint )( p[3 + offset] << 24 );
			c = result;
			return 4;
		}

		public static byte[] Slice( byte[] p, int start, int stop )
		{
			byte[] bytes = new byte[stop - start];
			Array.Copy( p, start, bytes, 0, bytes.Length );
			return bytes;
		}

		public static T[] Slice<T>( T[] p, int start, int stop )
		{
			T[] arr = new T[stop - start];
			int index = 0;
			for ( int i = start; i < stop; i++ )
			{
				arr[index] = p[i];
				index++;
			}

			return arr;
		}

		public static byte[] Append( byte[] p, byte c )
		{
			byte[] bytes = new byte[p.Length + 1];
			Array.Copy( p, bytes, p.Length );
			bytes[p.Length] = c;
			return bytes;
		}

		public static T[] Append<T>( T[] p, T c )
		{
			T[] arr = new T[p.Length + 1];
			for ( int i = 0; i < p.Length; i++ )
				arr[i] = p[i];
			arr[p.Length] = c;
			return arr;
		}

		public static T[] Append<T>( T[] p, T[] cs )
		{
			T[] arr = new T[p.Length + cs.Length];
			for ( int i = 0; i < p.Length; i++ )
				arr[i] = p[i];
			for ( int i = 0; i < cs.Length; i++ )
				arr[p.Length + i] = cs[i];
			return arr;
		}

		private static uint _imin_( uint a, uint b ) => a <= b ? a : b;
		private static uint _imax_( uint a, uint b ) => a >= b ? a : b;
		private static uint _ibound_( uint lower, uint middle, uint upper ) => _imin_( _imax_( lower, middle ), upper );
		private static int _itimediff( uint later, uint earlier ) => ( ( int )( later - earlier ) );

		// KCP Segment Definition
		private class Segment
		{
			internal uint conv;
			internal uint cmd;
			internal uint frg;
			internal uint wnd;
			internal uint ts;
			internal uint sn;
			internal uint una;
			internal uint resendts;
			internal uint rto;
			internal uint fastack;
			internal uint xmit;
			internal readonly byte[] data;

			internal Segment( int size )
			{
				this.data = new byte[size];
			}

			internal int Encode( byte[] ptr, int offset )
			{
				int mOffset = offset;

				offset += ikcp_encode32u( ptr, offset, this.conv );
				offset += ikcp_encode8u( ptr, offset, ( byte )this.cmd );
				offset += ikcp_encode8u( ptr, offset, ( byte )this.frg );
				offset += ikcp_encode16u( ptr, offset, ( ushort )this.wnd );
				offset += ikcp_encode32u( ptr, offset, this.ts );
				offset += ikcp_encode32u( ptr, offset, this.sn );
				offset += ikcp_encode32u( ptr, offset, this.una );
				offset += ikcp_encode32u( ptr, offset, ( uint )this.data.Length );

				return offset - mOffset;
			}
		}

		// kcp members.
		private readonly uint _conv;
		private uint _mtu;
		private uint _mss;
		private uint _sndUna;
		private uint _sndNxt;
		private uint _rcvNxt;
		private uint _ssthresh;
		private uint _rxRttval;
		private uint _rxSrtt;
		private uint _rxRto;
		private uint _rxMinrto;
		private uint _sndWnd;
		private uint _rcvWnd;
		private uint _rmtWnd;
		private uint _cwnd;
		private uint _probe;
		private uint _current;
		private uint _interval;
		private uint _tsFlush;
		private uint _xmit;
		private uint _nodelay;
		private uint _updated;
		private uint _tsProbe;
		private uint _probeWait;
		private uint _incr;

		private Segment[] _sndQueue = new Segment[0];
		private Segment[] _rcvQueue = new Segment[0];
		private Segment[] _sndBuf = new Segment[0];
		private Segment[] _rcvBuf = new Segment[0];

		private uint[] _acklist = new uint[0];

		private byte[] _buffer;
		private int _fastresend;
		private int _nocwnd;

		private Action<byte[], int> _output;

		// create a new kcp control object, 'conv' must equal in two endpoint
		// from the same connection.
		public KCP( uint conv, Action<byte[], int> output )
		{
			this._conv = conv;
			this._sndWnd = IKCP_WND_SND;
			this._rcvWnd = IKCP_WND_RCV;
			this._rmtWnd = IKCP_WND_RCV;
			this._mtu = IKCP_MTU_DEF;
			this._mss = this._mtu - IKCP_OVERHEAD;

			this._rxRto = IKCP_RTO_DEF;
			this._rxMinrto = IKCP_RTO_MIN;
			this._interval = IKCP_INTERVAL;
			this._tsFlush = IKCP_INTERVAL;
			this._ssthresh = IKCP_THRESH_INIT;
			this._buffer = new byte[( this._mtu + IKCP_OVERHEAD ) * 3];
			this._output = output;
		}

		public void Release()
		{
			Array.Resize( ref this._sndQueue, 0 );
			Array.Resize( ref this._rcvQueue, 0 );
			Array.Resize( ref this._sndBuf, 0 );
			Array.Resize( ref this._rcvBuf, 0 );
			Array.Resize( ref this._acklist, 0 );
			Array.Clear( this._sndQueue, 0, this._sndQueue.Length );
			Array.Clear( this._rcvQueue, 0, this._rcvQueue.Length );
			Array.Clear( this._sndBuf, 0, this._sndBuf.Length );
			Array.Clear( this._rcvBuf, 0, this._rcvBuf.Length );
			Array.Clear( this._acklist, 0, this._acklist.Length );
			Array.Clear( this._buffer, 0, this._buffer.Length );
			this._sndUna = 0;
			this._sndNxt = 0;
			this._rcvNxt = 0;
			this._rxRttval = 0;
			this._rxSrtt = 0;
			this._cwnd = 0;
			this._probe = 0;
			this._current = 0;
			this._xmit = 0;
			this._nodelay = 0;
			this._updated = 0;
			this._tsProbe = 0;
			this._probeWait = 0;
			this._incr = 0;
		}

		// check the size of next message in the recv queue
		public int PeekSize()
		{
			if ( 0 == this._rcvQueue.Length )
				return -1;

			Segment seq = this._rcvQueue[0];

			if ( 0 == seq.frg )
				return seq.data.Length;

			if ( this._rcvQueue.Length < seq.frg + 1 )
				return -1;

			int length = 0;
			foreach ( Segment item in this._rcvQueue )
			{
				length += item.data.Length;
				if ( 0 == item.frg )
					break;
			}
			return length;
		}

		// user/upper level recv: returns size, returns below zero for EAGAIN
		public int Recv( byte[] buffer, int offset, int len )
		{
			if ( 0 == this._rcvQueue.Length )
				return -1;

			int peekSize = this.PeekSize();

			if ( 0 > peekSize )
				return -2;

			if ( peekSize > len )
				return -3;

			bool fastRecover = this._rcvQueue.Length >= this._rcvWnd;

			// merge fragment.
			int count = 0;
			len = 0;
			foreach ( Segment seg in this._rcvQueue )
			{
				Buffer.BlockCopy( seg.data, 0, buffer, offset, seg.data.Length );
				len += seg.data.Length;
				offset += seg.data.Length;
				count++;
				if ( 0 == seg.frg )
					break;
			}

			if ( 0 < count )
				this._rcvQueue = Slice( this._rcvQueue, count, this._rcvQueue.Length );

			// move available data from rcv_buf -> rcv_queue
			count = 0;
			foreach ( Segment seg in this._rcvBuf )
			{
				if ( seg.sn == this._rcvNxt &&
					 this._rcvQueue.Length < this._rcvWnd )
				{
					this._rcvQueue = Append( this._rcvQueue, seg );
					this._rcvNxt++;
					count++;
				}
				else
					break;
			}

			if ( 0 < count )
				this._rcvBuf = Slice( this._rcvBuf, count, this._rcvBuf.Length );

			// fast recover
			if ( this._rcvQueue.Length < this._rcvWnd && fastRecover )
			{
				// ready to send back IKCP_CMD_WINS in ikcp_flush
				// tell remote my window size
				this._probe |= IKCP_ASK_TELL;
			}
			return len;
		}

		// user/upper level send, returns below zero for error
		public int Send( byte[] buffer, int offset, int len )
		{
			if ( len < 0 ) return -1;
			int count = len < this._mss ? 1 : ( int )( ( len + this._mss - 1 ) / this._mss );
			if ( 255 < count ) return -2;
			if ( 0 == count ) count = 1;

			for ( int i = 0; i < count; i++ )
			{
				int size = len > ( int )this._mss ? ( int )this._mss : len;
				Segment seg = new Segment( size );
				Buffer.BlockCopy( buffer, offset, seg.data, 0, size );
				seg.frg = ( uint )( count - i - 1 );
				this._sndQueue = Append( this._sndQueue, seg );
				offset += size;
				len -= size;
			}
			return 0;
		}

		// update ack.
		private void update_ack( int rtt )
		{
			if ( 0 == this._rxSrtt )
			{
				this._rxSrtt = ( uint )rtt;
				this._rxRttval = ( uint )rtt / 2;
			}
			else
			{
				int delta = ( int )( ( uint )rtt - this._rxSrtt );
				if ( 0 > delta ) delta = -delta;

				this._rxRttval = ( 3 * this._rxRttval + ( uint )delta ) / 4;
				this._rxSrtt = ( uint )( ( 7 * this._rxSrtt + rtt ) / 8 );
				if ( this._rxSrtt < 1 ) this._rxSrtt = 1;
			}

			int rto = ( int )( this._rxSrtt + _imax_( 1, 4 * this._rxRttval ) );
			this._rxRto = _ibound_( this._rxMinrto, ( uint )rto, IKCP_RTO_MAX );
		}

		private void shrink_buf() => this._sndUna = this._sndBuf.Length > 0 ? this._sndBuf[0].sn : this._sndNxt;

		private void parse_ack( uint sn )
		{
			if ( _itimediff( sn, this._sndUna ) < 0 || _itimediff( sn, this._sndNxt ) >= 0 ) return;

			int index = 0;
			foreach ( Segment seg in this._sndBuf )
			{
				if ( sn == seg.sn )
				{
					this._sndBuf = Append( Slice( this._sndBuf, 0, index ), Slice( this._sndBuf, index + 1, this._sndBuf.Length ) );
					break;
				}
				else
				{
					seg.fastack++;
				}

				index++;
			}
		}

		private void parse_una( uint una )
		{
			int count = 0;
			foreach ( Segment seg in this._sndBuf )
			{
				if ( _itimediff( una, seg.sn ) > 0 )
					count++;
				else
					break;
			}
			if ( 0 < count ) this._sndBuf = Slice( this._sndBuf, count, this._sndBuf.Length );
		}

		private void ack_push( uint sn, uint ts ) => this._acklist = Append( this._acklist, new uint[2] { sn, ts } );

		private void ack_get( int p, ref uint sn, ref uint ts )
		{
			sn = this._acklist[p * 2 + 0];
			ts = this._acklist[p * 2 + 1];
		}

		private void parse_data( Segment newseg )
		{
			uint sn = newseg.sn;
			if ( _itimediff( sn, this._rcvNxt + this._rcvWnd ) >= 0 || _itimediff( sn, this._rcvNxt ) < 0 ) return;

			int n = this._rcvBuf.Length - 1;
			int afterIdx = -1;
			bool repeat = false;
			for ( int i = n; i >= 0; i-- )
			{
				Segment seg = this._rcvBuf[i];
				if ( seg.sn == sn )
				{
					repeat = true;
					break;
				}

				if ( _itimediff( sn, seg.sn ) > 0 )
				{
					afterIdx = i;
					break;
				}
			}

			if ( !repeat )
				this._rcvBuf = afterIdx == -1
								   ? Append( new Segment[1] { newseg }, this._rcvBuf )
								   : Append( Slice( this._rcvBuf, 0, afterIdx + 1 ),
											 Append( new Segment[1] { newseg },
													 Slice( this._rcvBuf, afterIdx + 1, this._rcvBuf.Length ) ) );

			// move available data from rcv_buf -> rcv_queue
			int count = 0;
			foreach ( Segment seg in this._rcvBuf )
			{
				if ( seg.sn == this._rcvNxt && this._rcvQueue.Length < this._rcvWnd )
				{
					this._rcvQueue = Append( this._rcvQueue, seg );
					this._rcvNxt++;
					count++;
				}
				else
				{
					break;
				}
			}

			if ( 0 < count )
				this._rcvBuf = Slice( this._rcvBuf, count, this._rcvBuf.Length );
		}

		// when you received a low level packet (eg. UDP packet), call it
		public int Input( byte[] data, int offset, int size )
		{
			uint sUna = this._sndUna;
			if ( data.Length < IKCP_OVERHEAD ) return 0;

			while ( true )
			{
				uint ts = 0;
				uint sn = 0;
				uint len = 0;
				uint una = 0;
				uint conv = 0;

				ushort wnd = 0;

				byte cmd = 0;
				byte frg = 0;

				if ( size < IKCP_OVERHEAD ) break;

				offset += ikcp_decode32u( data, offset, ref conv );

				if ( this._conv != conv ) return -1;

				offset += ikcp_decode8u( data, offset, ref cmd );
				offset += ikcp_decode8u( data, offset, ref frg );
				offset += ikcp_decode16u( data, offset, ref wnd );
				offset += ikcp_decode32u( data, offset, ref ts );
				offset += ikcp_decode32u( data, offset, ref sn );
				offset += ikcp_decode32u( data, offset, ref una );
				offset += ikcp_decode32u( data, offset, ref len );

				size -= IKCP_OVERHEAD;

				if ( size < len ) return -2;

				switch ( cmd )
				{
					case IKCP_CMD_PUSH:
					case IKCP_CMD_ACK:
					case IKCP_CMD_WASK:
					case IKCP_CMD_WINS:
						break;
					default:
						return -3;
				}

				this._rmtWnd = wnd;
				this.parse_una( una );
				this.shrink_buf();

				if ( IKCP_CMD_ACK == cmd )
				{
					if ( _itimediff( this._current, ts ) >= 0 )
					{
						this.update_ack( _itimediff( this._current, ts ) );
					}
					this.parse_ack( sn );
					this.shrink_buf();
				}
				else if ( IKCP_CMD_PUSH == cmd )
				{
					if ( _itimediff( sn, this._rcvNxt + this._rcvWnd ) < 0 )
					{
						this.ack_push( sn, ts );
						if ( _itimediff( sn, this._rcvNxt ) >= 0 )
						{
							Segment seg = new Segment( ( int )len )
							{
								conv = conv,
								cmd = cmd,
								frg = frg,
								wnd = wnd,
								ts = ts,
								sn = sn,
								una = una
							};
							if ( len > 0 )
								Buffer.BlockCopy( data, offset, seg.data, 0, ( int )len );
							this.parse_data( seg );
						}
					}
				}
				else if ( IKCP_CMD_WASK == cmd )
				{
					// ready to send back IKCP_CMD_WINS in Ikcp_flush
					// tell remote my window size
					this._probe |= IKCP_ASK_TELL;
				}
				else if ( IKCP_CMD_WINS == cmd )
				{
					// do nothing
				}
				else
					return -3;

				offset += ( int )len;
				size -= ( int )len;
			}

			if ( _itimediff( this._sndUna, sUna ) > 0 )
			{
				if ( this._cwnd < this._rmtWnd )
				{
					uint mss = this._mss;
					if ( this._cwnd < this._ssthresh )
					{
						this._cwnd++;
						this._incr += mss;
					}
					else
					{
						if ( this._incr < mss )
						{
							this._incr = mss;
						}
						this._incr += ( mss * mss ) / this._incr + ( mss / 16 );
						if ( ( this._cwnd + 1 ) * mss <= this._incr ) this._cwnd++;
					}
					if ( this._cwnd > this._rmtWnd )
					{
						this._cwnd = this._rmtWnd;
						this._incr = this._rmtWnd * mss;
					}
				}
			}
			return 0;
		}

		private int wnd_unused()
		{
			if ( this._rcvQueue.Length < this._rcvWnd )
				return ( int )this._rcvWnd - this._rcvQueue.Length;
			return 0;
		}

		// flush pending data
		private void Flush()
		{
			uint current = this._current;
			int change = 0;
			int lost = 0;

			if ( 0 == this._updated ) return;

			Segment seg = new Segment( 0 )
			{
				conv = this._conv,
				cmd = IKCP_CMD_ACK,
				wnd = ( uint )this.wnd_unused(),
				una = this._rcvNxt
			};

			// flush acknowledges
			int count = this._acklist.Length / 2;
			int offset = 0;
			for ( int i = 0; i < count; i++ )
			{
				if ( offset + IKCP_OVERHEAD > this._mtu )
				{
					this._output( this._buffer, offset );
					//Array.Clear(buffer, 0, offset);
					offset = 0;
				}
				this.ack_get( i, ref seg.sn, ref seg.ts );
				offset += seg.Encode( this._buffer, offset );
			}
			this._acklist = new uint[0];

			// probe window size (if remote window size equals zero)
			if ( 0 == this._rmtWnd )
			{
				if ( 0 == this._probeWait )
				{
					this._probeWait = IKCP_PROBE_INIT;
					this._tsProbe = this._current + this._probeWait;
				}
				else
				{
					if ( _itimediff( this._current, this._tsProbe ) >= 0 )
					{
						if ( this._probeWait < IKCP_PROBE_INIT )
							this._probeWait = IKCP_PROBE_INIT;
						this._probeWait += this._probeWait / 2;
						if ( this._probeWait > IKCP_PROBE_LIMIT )
							this._probeWait = IKCP_PROBE_LIMIT;
						this._tsProbe = this._current + this._probeWait;
						this._probe |= IKCP_ASK_SEND;
					}
				}
			}
			else
			{
				this._tsProbe = 0;
				this._probeWait = 0;
			}

			// flush window probing commands
			if ( ( this._probe & IKCP_ASK_SEND ) != 0 )
			{
				seg.cmd = IKCP_CMD_WASK;
				if ( offset + IKCP_OVERHEAD > ( int )this._mtu )
				{
					this._output( this._buffer, offset );
					//Array.Clear(buffer, 0, offset);
					offset = 0;
				}
				offset += seg.Encode( this._buffer, offset );
			}

			this._probe = 0;

			// calculate window size
			uint cwnd = _imin_( this._sndWnd, this._rmtWnd );
			if ( 0 == this._nocwnd )
				cwnd = _imin_( this._cwnd, cwnd );

			count = 0;
			for ( int k = 0; k < this._sndQueue.Length; k++ )
			{
				if ( _itimediff( this._sndNxt, this._sndUna + cwnd ) >= 0 ) break;

				Segment newseg = this._sndQueue[k];
				newseg.conv = this._conv;
				newseg.cmd = IKCP_CMD_PUSH;
				newseg.wnd = seg.wnd;
				newseg.ts = current;
				newseg.sn = this._sndNxt;
				newseg.una = this._rcvNxt;
				newseg.resendts = current;
				newseg.rto = this._rxRto;
				newseg.fastack = 0;
				newseg.xmit = 0;
				this._sndBuf = Append( this._sndBuf, newseg );
				this._sndNxt++;
				count++;
			}

			if ( 0 < count )
				this._sndQueue = Slice( this._sndQueue, count, this._sndQueue.Length );

			// calculate resent
			uint resent = ( uint )this._fastresend;
			if ( this._fastresend <= 0 ) resent = 0xffffffff;
			uint rtomin = this._rxRto >> 3;
			if ( this._nodelay != 0 ) rtomin = 0;

			// flush data segments
			foreach ( Segment segment in this._sndBuf )
			{
				bool needsend = false;
				int debug = _itimediff( current, segment.resendts );
				if ( 0 == segment.xmit )
				{
					needsend = true;
					segment.xmit++;
					segment.rto = this._rxRto;
					segment.resendts = current + segment.rto + rtomin;
				}
				else if ( _itimediff( current, segment.resendts ) >= 0 )
				{
					needsend = true;
					segment.xmit++;
					this._xmit++;
					if ( 0 == this._nodelay )
						segment.rto += this._rxRto;
					else
						segment.rto += this._rxRto / 2;
					segment.resendts = current + segment.rto;
					lost = 1;
				}
				else if ( segment.fastack >= resent )
				{
					needsend = true;
					segment.xmit++;
					segment.fastack = 0;
					segment.resendts = current + segment.rto;
					change++;
				}

				if ( needsend )
				{
					segment.ts = current;
					segment.wnd = seg.wnd;
					segment.una = this._rcvNxt;

					int need = IKCP_OVERHEAD + segment.data.Length;
					if ( offset + need > this._mtu )
					{
						this._output( this._buffer, offset );
						//Array.Clear(buffer, 0, offset);
						offset = 0;
					}

					offset += segment.Encode( this._buffer, offset );
					if ( segment.data.Length > 0 )
					{
						Array.Copy( segment.data, 0, this._buffer, offset, segment.data.Length );
						offset += segment.data.Length;
					}
				}
			}

			// flash remain segments
			if ( offset > 0 )
			{
				this._output( this._buffer, offset );
				//Array.Clear(buffer, 0, offset);
				offset = 0;
			}

			// update ssthresh
			if ( change != 0 )
			{
				uint inflight = this._sndNxt - this._sndUna;
				this._ssthresh = inflight / 2;
				if ( this._ssthresh < IKCP_THRESH_MIN )
					this._ssthresh = IKCP_THRESH_MIN;
				this._cwnd = this._ssthresh + resent;
				this._incr = this._cwnd * this._mss;
			}

			if ( lost != 0 )
			{
				this._ssthresh = this._cwnd / 2;
				if ( this._ssthresh < IKCP_THRESH_MIN )
					this._ssthresh = IKCP_THRESH_MIN;
				this._cwnd = 1;
				this._incr = this._mss;
			}

			if ( this._cwnd < 1 )
			{
				this._cwnd = 1;
				this._incr = this._mss;
			}
		}

		// update state (call it repeatedly, every 10ms-100ms), or you can ask
		// ikcp_check when to call it again (without ikcp_input/_send calling).
		// 'current' - current timestamp in millisec.
		public void Update( uint current )
		{
			this._current = current;

			if ( 0 == this._updated )
			{
				this._updated = 1;
				this._tsFlush = this._current;
			}

			int slap = _itimediff( this._current, this._tsFlush );

			if ( slap >= 10000 || slap < -10000 )
			{
				this._tsFlush = this._current;
				slap = 0;
			}

			if ( slap >= 0 )
			{
				this._tsFlush += this._interval;
				if ( _itimediff( this._current, this._tsFlush ) >= 0 )
					this._tsFlush = this._current + this._interval;
				this.Flush();
			}
		}

		// Determine when should you invoke ikcp_update:
		// returns when you should invoke ikcp_update in millisec, if there
		// is no ikcp_input/_send calling. you can call ikcp_update in that
		// time, instead of call update repeatly.
		// Important to reduce unnacessary ikcp_update invoking. use it to
		// schedule ikcp_update (eg. implementing an epoll-like mechanism,
		// or optimize ikcp_update when handling massive kcp connections)
		public uint Check( uint current )
		{
			if ( 0 == this._updated )
				return current;

			uint tsFlush = this._tsFlush;
			int tmPacket = 0x7fffffff;
			int minimal = 0;

			if ( _itimediff( current, tsFlush ) >= 10000 ||
				 _itimediff( current, tsFlush ) < -10000 )
				tsFlush = current;

			if ( _itimediff( current, tsFlush ) >= 0 )
				return current;

			int tmFlush = _itimediff( tsFlush, current );
			foreach ( Segment seg in this._sndBuf )
			{
				int diff = _itimediff( seg.resendts, current );
				if ( diff <= 0 ) return current;
				if ( diff < tmPacket ) tmPacket = diff;
			}

			minimal = tmPacket;
			if ( tmPacket >= tmFlush ) minimal = tmFlush;
			if ( minimal >= this._interval ) minimal = ( int )this._interval;

			return current + ( uint )minimal;
		}

		// change MTU size, default is 1400
		public int SetMtu( int mtu )
		{
			if ( mtu < 50 || mtu < IKCP_OVERHEAD )
				return -1;
			byte[] buffer = new byte[( mtu + IKCP_OVERHEAD ) * 3];
			this._mtu = ( uint )mtu;
			this._mss = this._mtu - IKCP_OVERHEAD;
			this._buffer = buffer;
			return 0;
		}

		public int Interval( int interval )
		{
			if ( interval > 5000 )
				interval = 5000;
			else if ( interval < 10 )
				interval = 10;
			this._interval = ( uint )interval;
			return 0;
		}

		// fastest: ikcp_nodelay(kcp, 1, 20, 2, 1)
		// nodelay: 0:disable(default), 1:enable
		// interval: internal update timer interval in millisec, default is 100ms
		// resend: 0:disable fast resend(default), 1:enable fast resend
		// nc: 0:normal congestion control(default), 1:disable congestion control
		public int NoDelay( int nodelay, int interval, int resend, int nc )
		{
			if ( nodelay > 0 )
			{
				this._nodelay = ( uint )nodelay;
				this._rxMinrto = nodelay != 0 ? IKCP_RTO_NDL : ( uint )IKCP_RTO_MIN;
			}

			if ( interval >= 0 )
			{
				if ( interval > 5000 )
					interval = 5000;
				else if ( interval < 10 )
					interval = 10;

				this._interval = ( uint )interval;
			}

			if ( resend >= 0 ) this._fastresend = resend;
			if ( nc >= 0 ) this._nocwnd = nc;
			return 0;
		}

		// set maximum window size: sndwnd=32, rcvwnd=32 by default
		public int WndSize( int sndwnd, int rcvwnd )
		{
			if ( sndwnd > 0 )
				this._sndWnd = ( uint )sndwnd;
			if ( rcvwnd > 0 )
				this._rcvWnd = ( uint )rcvwnd;
			return 0;
		}

		// get how many packet is waiting to be sent
		public int WaitSnd() => this._sndBuf.Length + this._sndQueue.Length;
	}
}