using Core.Misc;
using System.IO;
using System.Text;

namespace Core.Net
{
	public class StreamBuffer : IPoolObject
	{
		public MemoryStream ms { get; }
		public BinaryWriter bw { get; }
		public BinaryReader br { get; }

		/// <summary>
		/// 获取当前位置
		/// </summary>
		public int position
		{
			get => ( int )this.ms.Position;
			set => this.ms.Position = value;
		}

		/// <summary>
		/// 获取当前数据长度
		/// </summary>
		public int length
		{
			get => ( int )this.ms.Length;
			set => this.ms.SetLength( value );
		}

		/// <summary>
		/// 当前是否还有数据可以读取
		/// </summary>
		public bool readable => this.ms.Length > this.ms.Position;

		/// <summary>
		/// 可读数据长度
		/// </summary>
		public long bytesAvailable => this.ms.Length - this.ms.Position;

		public object data;

		public StreamBuffer()
		{
			this.ms = new MemoryStream();
			this.bw = new BinaryWriter( this.ms, Encoding.UTF8 );
			this.br = new BinaryReader( this.ms, Encoding.UTF8 );
		}

		public StreamBuffer( int capacity )
		{
			this.ms = new MemoryStream( capacity );
			this.bw = new BinaryWriter( this.ms, Encoding.UTF8 );
			this.br = new BinaryReader( this.ms, Encoding.UTF8 );
		}

		public StreamBuffer( byte[] buff )
		{
			this.ms = new MemoryStream( buff );
			this.bw = new BinaryWriter( this.ms );
			this.br = new BinaryReader( this.ms );
		}

		public void Close()
		{
			this.bw.Close();
			this.br.Close();
			this.ms.Close();
		}

		public void Clear()
		{
			this.ms.SetLength( 0 );
		}

		/// <summary>
		/// 从当前位置截断
		/// </summary>
		public void Strip()
		{
			byte[] bytes = this.ReadBytes( this.position, this.length - this.position );
			this.Clear();
			this.Write( bytes );
			this.position = 0;
		}

		/// <summary>
		/// 从指定位置开始截断指定长度
		/// </summary>
		public void Strip( int pos, int count )
		{
			byte[] bytes = this.ReadBytes( pos, count );
			this.Clear();
			this.Write( bytes );
			this.position = 0;
		}

		public void Write( StreamBuffer streamBuffer )
		{
			this.bw.Write( streamBuffer.ToArray() );
		}

		public void Write( int value )
		{
			this.bw.Write( value );
		}

		public void Write( byte value )
		{
			this.bw.Write( value );
		}

		public void Write( bool value )
		{
			this.bw.Write( value );
		}

		public void Write( string value )
		{
			this.bw.Write( value );
		}

		public void Write( byte[] value )
		{
			this.bw.Write( value );
		}

		public void Write( byte[] value, int index, int count )
		{
			this.bw.Write( value, index, count );
		}

		public void Write( char[] chars, int index, int count )
		{
			this.bw.Write( chars, index, count );
		}

		public void Write( char[] chars )
		{
			this.bw.Write( chars );
		}

		public void Write( double value )
		{
			this.bw.Write( value );
		}

		public void Write( float value )
		{
			this.bw.Write( value );
		}

		public void Write( long value )
		{
			this.bw.Write( value );
		}

		public void Write( ushort value )
		{
			this.bw.Write( value );
		}

		public void Write( uint value )
		{
			this.bw.Write( value );
		}

		public void Write( ulong value )
		{
			this.bw.Write( value );
		}

		public void WriteUTF8( string value )
		{
			if ( string.IsNullOrEmpty( value ) )
			{
				this.Write( 0 );
				return;
			}
			byte[] bytes = Encoding.UTF8.GetBytes( value );
			this.Write( bytes.Length );
			this.Write( bytes );
		}

		public void WriteUTF8E( string value )
		{
			if ( string.IsNullOrEmpty( value ) )
				return;
			byte[] bytes = Encoding.UTF8.GetBytes( value );
			this.Write( bytes );
		}

		public int ReadInt()
		{
			return this.br.ReadInt32();
		}

		public byte ReadByte()
		{
			return this.br.ReadByte();
		}

		public bool ReadBool()
		{
			return this.br.ReadBoolean();
		}

		public string ReadString()
		{
			return this.br.ReadString();
		}

		public string ReadUTF8()
		{
			int len = this.ReadInt();
			if ( len == 0 )
				return string.Empty;
			byte[] bytes = this.ReadBytes( len );
			return Encoding.UTF8.GetString( bytes );
		}

		public string ReadUTF8E()
		{
			if ( this.bytesAvailable <= 0 )
				return string.Empty;
			byte[] bytes = this.ReadBytes( ( int )this.bytesAvailable );
			return Encoding.UTF8.GetString( bytes );
		}

		public byte[] ReadBytes( int length )
		{
			return this.br.ReadBytes( length );
		}

		public double ReadDouble()
		{
			return this.br.ReadDouble();
		}

		public float ReadFloat()
		{
			return this.br.ReadSingle();
		}

		public long ReadLong()
		{
			return this.br.ReadInt64();
		}

		public short ReadShort()
		{
			return this.br.ReadInt16();
		}

		public ushort ReadUShort()
		{
			return this.br.ReadUInt16();
		}

		public uint ReadUInt()
		{
			return this.br.ReadUInt32();
		}

		public ulong ReadULong()
		{
			return this.br.ReadUInt64();
		}

		public void Write( int pos, int value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, byte value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, bool value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, string value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, byte[] value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, byte[] value, int index, int count )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value, index, count );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, char[] chars, int index, int count )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( chars, index, count );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, char[] chars )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( chars );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, double value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, float value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, long value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, ushort value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, uint value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void Write( int pos, ulong value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			this.bw.Write( value );
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public void WriteUTF8( int pos, string value )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			if ( string.IsNullOrEmpty( value ) )
				this.Write( 0 );
			else
			{
				byte[] bytes = Encoding.UTF8.GetBytes( value );
				this.Write( bytes.Length );
				this.Write( bytes );
			}
			this.bw.Seek( p, SeekOrigin.Begin );
		}

		public int ReadInt( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			int value = this.br.ReadInt32();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public byte ReadByte( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			byte value = this.br.ReadByte();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public bool ReadBool( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			bool value = this.br.ReadBoolean();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public string ReadString( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			string value = this.br.ReadString();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public string ReadUTF8( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			int len = this.ReadInt();
			string str;
			if ( len == 0 )
				str = string.Empty;
			else
			{
				byte[] bytes = this.ReadBytes( len );
				str = Encoding.UTF8.GetString( bytes );
			}
			this.bw.Seek( p, SeekOrigin.Begin );
			return str;
		}

		public byte[] ReadBytes( int pos, int count )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			byte[] value = this.br.ReadBytes( count );
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public double ReadDouble( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			double value = this.br.ReadDouble();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public float ReadFloat( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			float value = this.br.ReadSingle();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public long ReadLong( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			long value = this.br.ReadInt64();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public short ReadShort( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			short value = this.br.ReadInt16();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public ushort ReadUShort( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			ushort value = this.br.ReadUInt16();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public uint ReadUInt( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			uint value = this.br.ReadUInt32();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public ulong ReadULong( int pos )
		{
			int p = this.position;
			this.bw.Seek( pos, SeekOrigin.Begin );
			ulong value = this.br.ReadUInt64();
			this.bw.Seek( p, SeekOrigin.Begin );
			return value;
		}

		public byte[] GetBuffer()
		{
			return this.ms.GetBuffer();
		}

		public byte[] ToArray()
		{
			return this.ms.ToArray();
		}
	}
}
