using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Protos;
using System.Security.Cryptography.X509Certificates;

namespace Shared.Net
{
	public abstract class SecureSession : SrvCliSession
	{
		/// <summary>
		/// 标记该Session是否已受信任
		/// </summary>
		public bool accredited;

		/// <summary>
		/// 认证消息的ID
		/// 这是唯一能在未认真的连接中通行的消息
		/// </summary>
		protected MsgID _accreditedMsgID;

		protected SecureSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
		}

		protected override bool ShouldBlockMsg( MsgID msgID )
		{
			bool shouldBlock = this._accreditedMsgID != msgID && !this.accredited;
			if ( shouldBlock )
				this.Close( true, $"illegal session, msgID:{msgID}" );
			return shouldBlock;
		}

		protected override void DispatchMessage( MsgID msgID, IMessage message )
		{
			MessageHandler handler = this.GetMsgHandler( msgID );
			if ( handler != null )
			{
				ErrorCode errorCode = handler.Invoke( this, message );
				if ( errorCode != ErrorCode.Success )
					Logger.Warn( errorCode );
			}
			else
				this.Close( true, $"unhandle msg:{msgID}." );
		}
	}
}