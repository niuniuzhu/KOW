using Core.Misc;
using Core.Net;
using Shared.Net;
using System;
using System.Text;

namespace Shell
{
	public abstract class MasterSession : CliSession
	{
		protected abstract string key { get; }

		protected MasterSession( uint id, ProtoType type ) : base( id, type )
		{
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
			this.HandleReturn( cmdData );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			//make handshake
			byte[] handShake = Encoding.UTF8.GetBytes( this.key );
			byte[] data = new byte[handShake.Length + 1];
			data[0] = 0;
			Buffer.BlockCopy( handShake, 0, data, 1, handShake.Length );
			this.Send( data, 0, data.Length );
		}

		private bool CheckFlag( byte flag ) => flag == 255;

		internal void HandleInput( string cmd )
		{
			byte[] cmdData = Encoding.UTF8.GetBytes( cmd );
			byte[] data = new byte[cmdData.Length + 1];
			data[0] = 255;
			Buffer.BlockCopy( cmdData, 0, data, 1, cmdData.Length );
			this.Send( data, 0, data.Length );
		}

		private void HandleReturn( byte[] data )
		{
			string ret = Encoding.UTF8.GetString( data );
			Logger.Log( ret );
		}
	}
}