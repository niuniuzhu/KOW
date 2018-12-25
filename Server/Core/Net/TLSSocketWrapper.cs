using System;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;

namespace Core.Net
{
    public class TLSSocketWrapper : ISocketWrapper
    {
        public bool Connected => this._socket?.Connected ?? false;

        private Socket _socket;
        private SslStream _sslStream;

        public TLSSocketWrapper( Socket socket )
        {
            this._socket = socket;
            this._sslStream = new SslStream( new NetworkStream( this._socket ), false );
        }

        public void SetSocketOption( SocketOptionLevel optionLevel, SocketOptionName optionName, object optionValue ) =>
            this._socket.SetSocketOption( optionLevel, optionName, optionValue );

        public void BeginAuthenticate( X509Certificate2 certificate, AsyncCallback callback ) =>
            this._sslStream.BeginAuthenticateAsServer( certificate, false, SslProtocols.None, false, callback, this );

        public void EndAuthenticate( IAsyncResult ar ) =>
            this._sslStream.EndAuthenticateAsServer( ar );

        public void BeginSend( byte[] buffer, int offset, int size, AsyncCallback callback ) =>
            this._sslStream.BeginWrite( buffer, offset, size, callback, this );

        public void EndSend( IAsyncResult ar ) => this._sslStream.EndWrite( ar );

        public void BeginReceive( byte[] buffer, int offset, int size, AsyncCallback callback ) =>
            this._sslStream.BeginRead( buffer, offset, size, callback, this );

        public int EndReceive( IAsyncResult ar ) => this._sslStream.EndRead( ar );

        public bool SendAsync( SocketAsyncEventArgs e )
        {
            throw new System.NotImplementedException();
        }

        public bool ReceiveAsync( SocketAsyncEventArgs e )
        {
            throw new System.NotImplementedException();
        }

        public bool SendToAsync( SocketAsyncEventArgs e )
        {
            throw new System.NotImplementedException();
        }

        public bool ReceiveFromAsync( SocketAsyncEventArgs e )
        {
            throw new System.NotImplementedException();
        }

        public void Shutdown( SocketShutdown how ) => this._socket.Shutdown( how );

        public void Close()
        {
            this._sslStream.Close();
            this._socket.Close();
        }

        public void Release()
        {
            this._socket = null;
            this._sslStream = null;
        }
    }
}