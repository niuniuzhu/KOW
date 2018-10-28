using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Core.Misc;

namespace Core.Net
{
	public class WSConnection : TCPConnection
	{
		private enum OPCode : byte
		{
			Continuation,
			Text,
			Binary,
			Close = 8,
			Ping = 9,
			Pong = 10,
		}

		internal string scheme;
		internal HashSet<string> subProtocols;

		private bool _handshakeComplete;

		public WSConnection( INetSession session ) : base( session )
		{
		}

		public override void Close()
		{
			lock ( this._lockObj )
			{
				this._handshakeComplete = false;
				base.Close();
			}
		}

		public override bool Send( byte[] data, int offset, int size )
		{
			if ( this.socket == null || !this.connected )
				return false;
			StreamBuffer buffer = this._bufferPool.Pop();
			MakeHeader( buffer, data, offset, size, OPCode.Binary );
			this._sendQueue.Push( buffer );
			return true;
		}

		protected override void ProcessData( StreamBuffer cache )
		{
			do
			{
				if ( cache.length == 0 )
					break;

				if ( !this._handshakeComplete )
				{
					WSHttpRequest request = ProcessHandShakeData( cache.GetBuffer(), 0, cache.length, this.scheme );
					if ( request == null )
						break;
					Logger.Log( request );
					string subProtocol = Negotiate( this.subProtocols, request.subProtocols );
					byte[] responseData = ProcessHybi13Handshake( request, subProtocol );
					if ( responseData == null )
						break;

					this._handshakeComplete = true;
					this.Send( responseData, 0, responseData.Length );
					cache.Clear();

					NetEvent netEvent = NetworkMgr.instance.PopEvent();
					netEvent.type = NetEvent.Type.Establish;
					netEvent.session = this.session;
					NetworkMgr.instance.PushEvent( netEvent );
				}
				else
				{
					byte[] data = ProcessClientData( cache.GetBuffer(), 0, cache.length, out OPCode op );
					if ( data == null )
					{
						if ( op == OPCode.Close )
							this.OnError( $"client close with opcode:{OPCode.Close}" );
						break;
					}

					//截断当前缓冲区
					cache.Strip();

					NetEvent netEvent = NetworkMgr.instance.PopEvent();
					netEvent.type = NetEvent.Type.Recv;
					netEvent.session = this.session;
					netEvent.data = data;
					NetworkMgr.instance.PushEvent( netEvent );

					//缓冲区里可能还有未处理的数据,递归处理
					this.ProcessData( cache );
				}
			} while ( false );
			this._reading = false;
		}

		private static WSHttpRequest ProcessHandShakeData( byte[] data, int offset, int size, string scheme )
		{
			string body = Encoding.ASCII.GetString( data, offset, size );
			Match match = ProtoConfig.REQUEST_REGEX.Match( body );

			if ( !match.Success )
				return null;

			WSHttpRequest request = new WSHttpRequest
			{
				method = match.Groups["method"].Value,
				path = match.Groups["path"].Value,
				body = match.Groups["body"].Value,
				bytes = data,
				offset = offset,
				size = size,
				scheme = scheme
			};

			CaptureCollection fields = match.Groups["field_name"].Captures;
			CaptureCollection values = match.Groups["field_value"].Captures;
			int count = fields.Count;
			for ( int i = 0; i < count; i++ )
			{
				string name = fields[i].ToString();
				string value = values[i].ToString();
				request.headers[name] = value;
			}
			return request;
		}

		private static string Negotiate( IEnumerable<string> server, IEnumerable<string> client )
		{
			string[] matches = server.Intersect( client ).ToArray();
			return matches.Length == 0 ? string.Empty : matches[0];
		}

		private static byte[] ProcessHybi13Handshake( WSHttpRequest request, string subProtocol )
		{
			StringBuilder builder = new StringBuilder();
			builder.AppendLine( "HTTP/1.1 101 Switching Protocols" );
			builder.AppendLine( "Upgrade: websocket" );
			builder.AppendLine( "Connection: Upgrade" );
			string responseKey =
				Convert.ToBase64String(
					SHA1.Create().ComputeHash( Encoding.ASCII.GetBytes( request["Sec-WebSocket-Key"] + ProtoConfig.WSRespGuid ) ) );
			builder.AppendLine( $"Sec-WebSocket-Accept: {responseKey}" );
			if ( !string.IsNullOrEmpty( subProtocol ) )
				builder.AppendLine( $"Sec-WebSocket-Protocol: {subProtocol}" );
			builder.AppendLine();
			// Logger.Info( builder.ToString() );
			return Encoding.ASCII.GetBytes( builder.ToString() );
		}

		/// <summary>
		/// 处理接收的数据
		/// 参考 http://www.cnblogs.com/smark/archive/2012/11/26/2789812.html
		/// </summary>
		private static byte[] ProcessClientData( byte[] data, int offset, int size, out OPCode op )
		{
			op = OPCode.Binary;
			// 如果有数据则至少包括3位
			if ( size < 2 )
				return null;
			// 判断是否为结束针
			byte value = data[offset];
			int isEof = value >> 7;
			op = ( OPCode )( value & 0xf );
			if ( op == OPCode.Close || op == OPCode.Ping || op == OPCode.Pong )
				return null;
			offset++;

			value = data[offset];
			// 是否包含掩码
			bool hasMask = value >> 7 > 0;
			// 获取数据长度
			ulong packageLength = ( ulong )value & 0x7F;
			offset++;
			// 存储数据
			if ( packageLength == 126 )
			{
				// 等于126 随后的两个字节16位表示数据长度
				packageLength = BitConverter.ToUInt16( data, offset );
				offset += 2;
			}
			if ( packageLength == 127 )
			{
				// 等于127 随后的八个字节64位表示数据长度
				packageLength = BitConverter.ToUInt64( data, offset );
				offset += 8;
			}
			// 存储4位掩码值
			byte[] maskingKey = null;
			if ( hasMask )
			{
				maskingKey = new byte[4];
				Buffer.BlockCopy( data, offset, maskingKey, 0, 4 );
				offset += 4;
			}

			byte[] outData = new byte[packageLength];
			if ( packageLength > int.MaxValue )
				for ( ulong i = 0; i < packageLength; i++ )
					outData[i] = data[i + ( ulong )offset];
			else
				Buffer.BlockCopy( data, offset, outData, 0, ( int )packageLength );

			if ( maskingKey != null )
			{
				for ( ulong i = 0; i < packageLength; i++ )
					outData[i] = ( byte )( outData[i] ^ maskingKey[i % 4] );
			}
			return outData;
		}

		private static void MakeHeader( StreamBuffer inBuffer, byte[] data, int offset, int size, OPCode opCode )
		{
			const int fin = 1, rsv1 = 0, rsv2 = 0, rsv3 = 0;
			int op = ( int )opCode;
			int ctrlFrame = op | rsv3 << 4 | rsv2 << 5 | rsv1 << 6 | fin << 7;
			inBuffer.Write( ( byte )ctrlFrame );

			//服务端不需要mask
			if ( size > ushort.MaxValue )
			{
				inBuffer.Write( ( byte )127 );
				byte[] lengthBytes = ( ( ulong )size ).ToBigEndianBytes();
				inBuffer.Write( lengthBytes, 0, lengthBytes.Length );
			}
			else if ( size > 125 )
			{
				inBuffer.Write( ( byte )126 );
				byte[] lengthBytes = ( ( ushort )size ).ToBigEndianBytes();
				inBuffer.Write( lengthBytes, 0, lengthBytes.Length );
			}
			else
				inBuffer.Write( ( byte )size );

			inBuffer.Write( data, offset, size );
		}
	}
}