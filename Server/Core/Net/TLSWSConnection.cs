using System.Collections.Generic;

namespace Core.Net
{
    public class TLSWSConnection : TLSConnection
    {
        public HashSet<string> subProtocols;

        private readonly StreamBuffer _readState;
        private bool _handshakeComplete;

        public TLSWSConnection( INetSession session ) : base( session )
        {
            this._readState = new StreamBuffer( this.recvBufSize );
        }

        public override void Close()
        {
            this._handshakeComplete = false;
            base.Close();
        }

        public override bool Send( byte[] data, int offset, int size )
        {
            if ( this.socket == null || !this.connected )
                return false;
            StreamBuffer buffer = this._bufferPool.Pop();
            WSHelper.MakeHeader( buffer, data, offset, size );
            this._sendQueue.Push( buffer );
            return true;
        }

        public bool SendWithoutHeader( byte[] data, int offset, int size )
        {
            if ( this.socket == null || !this.connected )
                return false;
            StreamBuffer buffer = this._bufferPool.Pop();
            buffer.Write( data, offset, size );
            this._sendQueue.Push( buffer );
            return true;
        }

        protected override void ProcessData( StreamBuffer cache )
        {
            while ( true )
            {
                if ( cache.length == 0 )
                    break;

                if ( !this._handshakeComplete )
                {
                    WSHttpRequest request = WSHelper.ProcessHandShakeData( cache.GetBuffer(), 0, cache.length );
                    if ( request == null )
                        break;

                    //Logger.Log( request );
                    string subProtocol = WSHelper.Negotiate( this.subProtocols, request.subProtocols );
                    byte[] responseData = WSHelper.ProcessHybi13Handshake( request, subProtocol );
                    if ( responseData == null )
                        break;

                    this._handshakeComplete = true;
                    this.SendWithoutHeader( responseData, 0, responseData.Length );

                    cache.Clear();

                    NetEvent netEvent = NetworkMgr.instance.PopEvent();
                    netEvent.type = NetEvent.Type.Establish;
                    netEvent.session = this.session;
                    NetworkMgr.instance.PushEvent( netEvent );

                    break;
                }

                {
                    bool isEof = WSHelper.ProcessClientData( cache.GetBuffer(), 0, cache.length, this._readState, out int len, out WSOPCode op );
                    if ( len < 0 )//载体没有读取完
                        break;

                    //截断当前缓冲区
                    cache.Strip( len, cache.length - len );
                    if ( isEof )//分片已结束
                    {
                        if ( op != WSOPCode.Binary && op != WSOPCode.Continuation )
                        {
                            //到这里代表连接关闭了
                            this._readState.Clear();
                            break;
                        }

                        byte[] data = this._readState.ToArray();
                        this._readState.Clear();

                        NetEvent netEvent = NetworkMgr.instance.PopEvent();
                        netEvent.type = NetEvent.Type.Recv;
                        netEvent.session = this.session;
                        netEvent.data = data;
                        NetworkMgr.instance.PushEvent( netEvent );
                    }
                }
            }
        }
    }
}