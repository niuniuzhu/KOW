using Core.Misc;
using Google.Protobuf;

namespace Shared.Net
{
	/// <summary>
	/// RPC委托
	/// </summary>
	/// <param name="message">消息体</param>
	public delegate void RPCHandler( NetSessionBase session, IMessage message, object[] args );

	/// <summary>
	/// RPC发生回调时的状态
	/// </summary>
	public enum RPCState
	{
		Normal,//正常
		Close,//连接断开
	}

	public class RPCEntry : IPoolObject
	{
		private static readonly ObjectPool<RPCEntry> POOL = new ObjectPool<RPCEntry>();

		/// <summary>
		/// 回调函数
		/// </summary>
		public RPCHandler handler;
		/// <summary>
		/// 携带参数
		/// </summary>
		public object[] args;

		public static RPCEntry Pop( RPCHandler handler, params object[] args )
		{
			RPCEntry rpcEntry = POOL.Pop();
			rpcEntry.handler = handler;
			rpcEntry.args = args;
			return rpcEntry;
		}

		public static void Push( RPCEntry rpcEntry ) => POOL.Push( rpcEntry );

		public void Clear()
		{
			this.handler = null;
			this.args = null;
		}
	}
}