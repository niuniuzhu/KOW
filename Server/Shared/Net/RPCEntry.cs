using Google.Protobuf;

namespace Shared.Net
{
	/// <summary>
	/// RPC委托
	/// </summary>
	/// <param name="message">消息体</param>
	public delegate void RPCHandler( IMessage message );

	/// <summary>
	/// RPC发生回调时的状态
	/// </summary>
	public enum RPCState
	{
		Normal,//正常
		Close,//连接断开
	}

	public class RPCEntry
	{
		/// <summary>
		/// 消息ID
		/// </summary>
		public uint pid;
		/// <summary>
		/// 回调函数
		/// </summary>
		public RPCHandler handler;
		/// <summary>
		/// 生存时间
		/// </summary>
		public long time;
	}
}