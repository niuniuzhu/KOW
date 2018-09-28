using System.Text.RegularExpressions;

namespace Core.Net
{
	/*kcp协议
	 uint connID
	 byte 消息头控制码
	 	bit1 是否kcp传输
		bit2-8保留
	 byte 消息体控制码
	 	bit1 是否内部协议
		bit2-8保留
	 ...	内容
	 */
	public static class ProtoConfig
	{
		public const string WSRespGuid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
		private const string PATTERN = @"^(?<method>[^\s]+)\s(?<path>[^\s]+)\sHTTP\/1\.1\r\n" +
									   @"((?<field_name>[^:\r\n]+):(?([^\r\n])\s)*(?<field_value>[^\r\n]*)\r\n)+" +
									   @"\r\n" +
									   @"(?<body>.+)?";
		public static readonly Regex REQUEST_REGEX = new Regex( PATTERN, RegexOptions.IgnoreCase | RegexOptions.Compiled );

		public const ushort HANDSHAKE_SIGNATURE = 0;
		public const ushort HANDSHAKE_ACK_SIGNATURE = 1;
		public const ushort PING_SIGNATURE = 2;
		public const ushort PONG_SIGNATURE = 3;
		public const ushort TIMEOUT_SIGNATURE = 4;

		public const int SIZE_OF_SIGNATURE = sizeof( ushort );
		public const int SIZE_OF_CONN_KEY = sizeof( uint );
		public const int SIZE_OF_SESSION_ID = sizeof( uint );
		public const int SIZE_OF_HEAD = sizeof( byte ) + SIZE_OF_SESSION_ID;

		public const uint CONN_KEY = 0x11223344;
		public const byte INVALID_SESSION_ID = 0;

		public static int KCP_NO_DELAY = 1;
		public static int KCP_INTERVAL = 20;
		public static int KCP_RESEND = 2;
		public static int KCP_NC = 1;
		public static int KCP_SND_WIN = 128;
		public static int KCP_REV_WIN = 128;
		public static int KCP_MTU = 512;

		public static int PING_INTERVAL = 5000;
		public static int PING_TIMEOUT = 10000;
	}
}