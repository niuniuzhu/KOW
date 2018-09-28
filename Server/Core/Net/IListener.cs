namespace Core.Net
{
	public delegate byte[] PacketEncodeHandler( byte[] data, int offset, int size );
	public delegate int PacketDecodeHandler( byte[] buf, int offset, int size, out byte[] data );
	public delegate INetSession SessionCreater( ProtoType type );

	public interface IListener
	{
		uint id { get; }

		/// <summary>
		/// 当有连接到达时调用该委托创建session
		/// </summary>
		SessionCreater sessionCreater { get; set; }

		/// <summary>
		/// 连接建立后的接收缓冲区大小
		/// </summary>
		int recvBufSize { get; set; }

		/// <summary>
		/// 销毁此实例
		/// </summary>
		void Dispose();

		/// <summary>
		/// 开始监听
		/// </summary>
		/// <param name="port">本地端口</param>
		/// <returns>操作是否成功</returns>
		bool Start( int port );

		/// <summary>
		/// 停止监听
		/// </summary>
		/// <returns></returns>
		bool Stop();
	}
}