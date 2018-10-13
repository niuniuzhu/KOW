namespace Core.Net
{
	public interface INetSession
	{
		/// <summary>
		/// ID
		/// </summary>
		uint id { get; }

		/// <summary>
		/// 此实例持有的连接实例
		/// </summary>
		IConnection connection { get; }

		/// <summary>
		/// 是否被动创建
		/// </summary>
		bool isPassive { get; set; }

		/// <summary>
		/// 销毁此实例
		/// </summary>
		void Dispose();

		/// <summary>
		/// 发送数据
		/// </summary>
		void Send( byte[] data, int offset, int size );

		/// <summary>
		/// 延时关闭Session
		/// </summary>
		/// <param name="delay"></param>
		/// <param name="reason"></param>
		void DelayClose( long delay, string reason );

		/// <summary>
		/// 关闭Session
		/// </summary>
		void Close( string reason );

		/// <summary>
		/// 连接失败后调用
		/// </summary>
		void _OnConnError( string error );

		/// <summary>
		/// 连接建立后调用
		/// </summary>
		void _OnEstablish();

		/// <summary>
		/// 收到数据后调用
		/// </summary>
		void _OnRecv( byte[] data, int offset, int size );

		/// <summary>
		/// 发送数据后调用
		/// </summary>
		void _OnSend();

		/// <summary>
		/// 通信过程出现错误后调用
		/// </summary>
		void _OnError( string error );

		/// <summary>
		/// 内部更新
		/// </summary>
		void Update( UpdateContext updateContext );

		/// <summary>
		/// 心跳
		/// </summary>
		void HeartBeat( long dt );
	}
}