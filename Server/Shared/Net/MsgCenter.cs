using System.Collections.Generic;

namespace Shared.Net
{
	/// <summary>
	/// 消息处理中心
	/// </summary>
	public class MsgCenter
	{
		public delegate ErrorCode GeneralHandler( Google.Protobuf.IMessage message );

		private readonly Dictionary<Protos.MsgID, GeneralHandler> _generalHandlers = new Dictionary<Protos.MsgID, GeneralHandler>();

		public void Register( Protos.MsgID msgID, GeneralHandler handler )
		{
			if ( this._generalHandlers.ContainsKey( msgID ) )
				return;
			this._generalHandlers[msgID] = handler;
		}

		public bool TryGetHandler( Protos.MsgID msgID, out GeneralHandler handler )
		{
			return this._generalHandlers.TryGetValue( msgID, out handler );
		}
	}
}