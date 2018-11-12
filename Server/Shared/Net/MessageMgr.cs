using System.Collections.Generic;

namespace Shared.Net
{
	public delegate ErrorCode MessageHandler( Google.Protobuf.IMessage message );

	/// <summary>
	/// 消息处理中心
	/// </summary>
	public class MessageMgr
	{

		private readonly Dictionary<Protos.MsgID, MessageHandler> _generalHandlers = new Dictionary<Protos.MsgID, MessageHandler>();

		internal void Register( Protos.MsgID msgID, MessageHandler handler )
		{
			if ( this._generalHandlers.ContainsKey( msgID ) )
				return;
			this._generalHandlers[msgID] = handler;
		}

		internal MessageHandler GetHandler( Protos.MsgID msgID )
		{
			this._generalHandlers.TryGetValue( msgID, out MessageHandler handler );
			return handler;
		}
	}
}