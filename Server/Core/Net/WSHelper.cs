using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Core.Net
{
    public enum WSOPCode : byte
    {
        Continuation,
        Text,
        Binary,
        Close = 8,
        Ping = 9,
        Pong = 10,
    }

    public static class WSHelper
    {
        public static WSHttpRequest ProcessHandShakeData( byte[] data, int offset, int size )
        {
            string body = Encoding.ASCII.GetString( data, offset, size );
            Match match = ProtoConfig.REQUEST_REGEX.Match( body );

            if ( !match.Success )
                return null;

            WSHttpRequest request = new WSHttpRequest
            {
                method = match.Groups["method"].Value,
                path = match.Groups["path"].Value,
                body = match.Groups["body"].Value
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

        public static string Negotiate( IEnumerable<string> server, IEnumerable<string> client )
        {
            string[] matches = server.Intersect( client ).ToArray();
            return matches.Length == 0 ? string.Empty : matches[0];
        }

        public static byte[] ProcessHybi13Handshake( WSHttpRequest request, string subProtocol )
        {
            StringBuilder builder = new StringBuilder();
            builder.Append( "HTTP/1.1 101 Switching Protocols\r\n" );
            builder.Append( "Upgrade: websocket\r\n" );
            builder.Append( "Connection: Upgrade\r\n" );

            if ( !string.IsNullOrEmpty( subProtocol ) )
                builder.Append( $"Sec-WebSocket-Protocol: {subProtocol}\r\n" );

            string responseKey =
                Convert.ToBase64String(
                    SHA1.Create().ComputeHash( Encoding.ASCII.GetBytes( request["Sec-WebSocket-Key"] + ProtoConfig.WSRespGuid ) ) );

            builder.Append( $"Sec-WebSocket-Accept: {responseKey}\r\n" );
            builder.Append( "\r\n" );
            // Logger.Info( builder.ToString() );
            return Encoding.ASCII.GetBytes( builder.ToString() );
        }

        /// <summary>
        /// 处理接收的数据
        /// 参考 http://www.cnblogs.com/smark/archive/2012/11/26/2789812.html
        /// </summary>
        public static bool ProcessClientData( byte[] data, int offset, int size, StreamBuffer readState, out int len, out WSOPCode op )
        {
            len = -1;
            op = WSOPCode.Binary;
            // 如果有数据则至少包括3位
            if ( size < 2 )
                return false;
            // 判断是否为结束帧
            byte value = data[offset];
            //如果是1,表示这是消息的最后一个分片,如果是0,表示不是是消息的最后一个分片
            bool isEof = ( value & 128 ) != 0;
            op = ( WSOPCode )( value & 15 );
            //if ( op == WSOPCode.Close || op == WSOPCode.Ping || op == WSOPCode.Pong )
            //	return false;
            offset++;

            value = data[offset];
            // 是否包含掩码
            bool hasMask = ( value & 128 ) != 0;
            // 获取数据长度
            int packageLength = value & 127;
            offset++;
            // 存储数据
            if ( packageLength == 126 )
            {
                if ( size < offset + 2 )
                    return false;
                // 等于126 随后的两个字节16位表示数据长度
                // 调换字节序
                packageLength = 0;
                packageLength |= data[1 + offset];
                packageLength |= data[0 + offset] << 8;
                offset += 2;
            }
            else if ( packageLength == 127 )
            {
                if ( size < offset + 8 )
                    return false;
                // 等于127 随后的八个字节64位表示数据长度
                // 调换字节序
                packageLength = 0;
                packageLength |= data[7 + offset];
                packageLength |= data[6 + offset] << 8;
                packageLength |= data[5 + offset] << 16;
                packageLength |= data[4 + offset] << 24;
                packageLength |= data[3 + offset] << 32;
                packageLength |= data[2 + offset] << 40;
                packageLength |= data[1 + offset] << 48;
                packageLength |= data[0 + offset] << 56;
                offset += 8;
            }
            // 存储4位掩码值
            byte[] maskingKey = null;
            if ( hasMask )
            {
                if ( size < offset + 4 )
                    return false;
                maskingKey = new byte[4];
                Buffer.BlockCopy( data, offset, maskingKey, 0, 4 );
                offset += 4;
            }
            //判断数据长度是否满足
            if ( size < offset + packageLength )
                return false;

            //处理掩码
            if ( maskingKey != null )
            {
                for ( int i = 0; i < packageLength; i++ )
                    data[i + offset] = ( byte )( data[i + offset] ^ maskingKey[i % 4] );
            }

            readState.Write( data, offset, packageLength );

            len = offset + packageLength;

            return isEof;
        }

        public static void MakeHeader( StreamBuffer inBuffer, byte[] data, int offset, int size, WSOPCode opCode = WSOPCode.Binary )
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