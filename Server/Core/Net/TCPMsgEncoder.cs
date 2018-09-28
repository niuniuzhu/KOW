using Core.Misc;

namespace Core.Net
{
	public static class TCPMsgEncoder
	{
		public const int LENGTH_SIZE = sizeof( ushort );

		public static int Decode( byte[] data, int offset, int size, out byte[] result )
		{
			if ( size < LENGTH_SIZE )//长度还没有收完
			{
				result = null;
				return -1;
			}
			ushort length = 0;
			ByteUtils.Decode16u( data, offset, ref length );
			if ( size < length )//还没有足够长度
			{
				result = null;
				return -1;
			}
			result = new byte[length - LENGTH_SIZE];
			System.Buffer.BlockCopy( data, offset + LENGTH_SIZE, result, 0, length - LENGTH_SIZE );
			return length;
		}
	}
}