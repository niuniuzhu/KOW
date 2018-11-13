using System.Collections.Generic;

namespace Shared.Net
{
	public delegate ErrorCode MessageHandler( uint sid, Google.Protobuf.IMessage message );

	/// <summary>
	/// 消息处理中心
	/// </summary>
	public class MessageCenter
	{
		private readonly Dictionary<Protos.MsgID, MessageHandler> _handlers = new Dictionary<Protos.MsgID, MessageHandler>();

		internal void Register( Protos.MsgID msgID, MessageHandler handler ) => this._handlers[msgID] = handler;

		internal void Unregister( Protos.MsgID msgID ) => this._handlers.Remove( msgID );

		internal MessageHandler GetHandler( Protos.MsgID msgID )
		{
			this._handlers.TryGetValue( msgID, out MessageHandler handler );
			return handler;
		}
	}
}