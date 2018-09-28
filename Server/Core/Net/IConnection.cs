using System.Net;

namespace Core.Net
{
	public interface IConnection
	{
		/// <summary>
		/// 此连接持有的Socket实例
		/// </summary>
		SocketWrapper socket { get; set; }

		/// <summary>
		/// 远程终端
		/// </summary>
		EndPoint remoteEndPoint { get; set; }

		/// <summary>
		/// 此连接关联的session
		/// </summary>
		INetSession session { get; }

		/// <summary>
		/// 接收缓冲区大小
		/// </summary>
		int recvBufSize { set; }

		/// <summary>
		/// 销毁此实例
		/// </summary>
		void Dispose();

		/// <summary>
		/// 关闭此连接
		/// </summary>
		void Close();

		/// <summary>
		/// 开始接收数据
		/// </summary>
		/// <returns></returns>
		void StartReceive();

		/// <summary>
		/// 异步发送数据
		/// </summary>
		/// <returns></returns>
		bool Send( byte[] data, int offset, int size );

		/// <summary>
		/// 内部更新
		/// </summary>
		void Update( UpdateContext updateContext );

		/// <summary>
		/// 心跳
		/// </summary>
		/// <param name="dt"></param>
		void OnHeartBeat( long dt );
	}
}