using Core.Misc;
using Core.Net;
using System;
using System.Text;

namespace Shared.Net
{
	public class ShellSession : SecureSession
	{
		public static string key = string.Empty;

		public delegate string ShellCommandHandler( string command );

		public ShellCommandHandler shellCommandHandler;

		private ShellSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"shell({this.id}) from {this.connection.remoteEndPoint} connected" );
		}

		protected override void OnClose( string reason )
		{
			Logger.Info( $"shell({this.id}) from {this.connection.remoteEndPoint} disconnected with msg:{reason}" );
			base.OnClose( reason );
		}

		protected override void OnRecv( byte[] data, int offset, int size )
		{
			byte flag = data[0];
			if ( !this.CheckFlag( flag ) )
			{
				this.Close( true, "invalid flag" );
				return;
			}
			byte[] cmdData = new byte[data.Length - 1];
			Buffer.BlockCopy( data, 1, cmdData, 0, cmdData.Length );
			if ( flag == 0 ) //处理handshake
				this.HandleShellHandShake( cmdData );
			else
				this.HandleShellCommand( cmdData );
		}

		private bool CheckFlag( byte flag ) => flag == 0 || flag == 255;

		private void HandleShellHandShake( byte[] data )
		{
			if ( Encoding.UTF8.GetString( data ) != key )
				this.Close( true, "invalid key" );
		}

		private void HandleShellCommand( byte[] data )
		{
			string cmd = Encoding.UTF8.GetString( data );
			string s;
			try
			{
				s = this.shellCommandHandler?.Invoke( cmd );
			}
			catch ( Exception e )
			{
				s = e.ToString();
			}
			if ( !string.IsNullOrEmpty( s ) )
			{
				byte[] strData = Encoding.UTF8.GetBytes( s );
				data = new byte[1 + strData.Length];
				data[0] = 255;
				Buffer.BlockCopy( strData, 0, data, 1, strData.Length );
				this.Send( data, 0, data.Length );
			}
		}
	}
}