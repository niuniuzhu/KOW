using Core.Misc;

namespace Core.Net
{
	public class NetEvent : IPoolObject
	{
		public enum Type
		{
			Invalid = 0,
			Establish,
			ConnErr,
			Error,
			Recv,
			Send,
		}

		public Type type;
		public INetSession session;
		public string error;
		public byte[] data;

		public void Clear()
		{
			this.type = Type.Invalid;
			this.session = null;
			this.error = string.Empty;
			this.data = null;
		}
	}
}