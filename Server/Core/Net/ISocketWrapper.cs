using System;
using System.Net.Sockets;
using System.Security.Cryptography.X509Certificates;

namespace Core.Net
{
	public interface ISocketWrapper
	{
		bool Connected { get; }
		void SetSocketOption( SocketOptionLevel optionLevel, SocketOptionName optionName, object optionValue );
		void BeginAuthenticate( X509Certificate2 certificate, AsyncCallback callback );
		void EndAuthenticate( IAsyncResult ar );
		void BeginSend( byte[] buffer, int offset, int size, AsyncCallback callback );
		void EndSend( IAsyncResult ar );
		void BeginReceive( byte[] buffer, int offset, int size, AsyncCallback callback );
		int EndReceive( IAsyncResult ar );
		bool SendAsync( SocketAsyncEventArgs e );
		bool ReceiveAsync( SocketAsyncEventArgs e );
		bool SendToAsync( SocketAsyncEventArgs e );
		bool ReceiveFromAsync( SocketAsyncEventArgs e );
		void Shutdown( SocketShutdown how );
		void Close();
		void Release();
	}
}