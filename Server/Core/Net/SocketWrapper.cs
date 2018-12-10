using System;
using System.Net.Sockets;
using System.Security.Cryptography.X509Certificates;

namespace Core.Net
{
	public class SocketWrapper : ISocketWrapper
	{
		public bool Connected => this._socket?.Connected ?? false;

		private Socket _socket;

		public SocketWrapper( Socket socket )
		{
			this._socket = socket;
		}

		public void SetSocketOption( SocketOptionLevel optionLevel, SocketOptionName optionName, object optionValue ) =>
			this._socket.SetSocketOption( optionLevel, optionName, optionValue );

		public void BeginAuthenticate( X509Certificate2 certificate, AsyncCallback callback )
		{
			throw new NotImplementedException();
		}

		public void EndAuthenticate( IAsyncResult ar )
		{
			throw new NotImplementedException();
		}

		public void BeginSend( byte[] buffer, int offset, int size, AsyncCallback callback )
		{
			throw new NotImplementedException();
		}

		public void EndSend( IAsyncResult ar )
		{
			throw new NotImplementedException();
		}

		public void BeginReceive( byte[] buffer, int offset, int size, AsyncCallback callback )
		{
			throw new NotImplementedException();
		}

		public int EndReceive( IAsyncResult ar )
		{
			throw new NotImplementedException();
		}

		public bool SendAsync( SocketAsyncEventArgs e ) => this._socket.SendAsync( e );

		public bool ReceiveAsync( SocketAsyncEventArgs e ) => this._socket.ReceiveAsync( e );

		public bool SendToAsync( SocketAsyncEventArgs e ) => this._socket.SendToAsync( e );

		public bool ReceiveFromAsync( SocketAsyncEventArgs e ) => this._socket.ReceiveFromAsync( e );

		public void Shutdown( SocketShutdown how ) => this._socket.Shutdown( how );

		public void Close() => this._socket?.Close();

		public void Release() => this._socket = null;
	}
}