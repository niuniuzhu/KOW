using System;
using System.Net;
using Core.Misc;

namespace Core.Net
{
	public static class Tools
	{
		public static bool GetNetIP( ref string ipaddr, int pos )
		{
			string host_name;
			try
			{
				host_name = Dns.GetHostName();
			}
			catch ( Exception e )
			{
				Logger.Error( e );
				return false;
			}

			IPAddress[] ipAddresses = Dns.GetHostAddresses( host_name );
			ipaddr = ipAddresses[pos].ToString();
			return true;
		}

		public static byte[] ToBigEndianBytes( this byte source )
		{
			byte[] bytes = BitConverter.GetBytes( source );
			if ( BitConverter.IsLittleEndian )
				Array.Reverse( bytes );
			return bytes;
		}

		public static byte[] ToBigEndianBytes( this ushort source )
		{
			byte[] bytes = BitConverter.GetBytes( source );
			if ( BitConverter.IsLittleEndian )
				Array.Reverse( bytes );
			return bytes;
		}

		public static byte[] ToBigEndianBytes( this ulong source )
		{
			byte[] bytes = BitConverter.GetBytes( source );
			if ( BitConverter.IsLittleEndian )
				Array.Reverse( bytes );
			return bytes;
		}

		public static int ToLittleEndianInt( this byte[] source )
		{
			if ( BitConverter.IsLittleEndian )
				Array.Reverse( source );

			if ( source.Length == 2 )
				return BitConverter.ToUInt16( source, 0 );

			if ( source.Length == 8 )
				return ( int )BitConverter.ToUInt64( source, 0 );

			throw new ArgumentException( "Unsupported Size" );
		}
	}
}