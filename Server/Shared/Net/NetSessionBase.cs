using Core.Misc;
using Core.Net;
using Google.Protobuf;
using System.Collections.Generic;

namespace Shared.Net
{
	public class NetSessionBase : NetSession
	{
		/// <summary>
		/// 所属管理器
		/// </summary>
		public NetSessionMgr owner { get; set; }
		/// <summary>
		/// 逻辑ID
		/// </summary>
		public uint logicID { get; set; }
		/// <summary>
		/// 类型
		/// </summary>
		public SessionType type { get; set; }
		/// <summary>
		/// 消息id自增量
		/// </summary>
		private uint _pid;
		/// <summary>
		/// 消息ID到RPC的映射
		/// 可能是异步写入,但必定是同步读取,不用加锁
		/// </summary>
		private readonly Dictionary<uint, RPCEntry> _pidToRPCEntries = new Dictionary<uint, RPCEntry>();
		/// <summary>
		/// RPC回调函数的容器
		/// </summary>
		private readonly List<RPCEntry> _rpcEntries = new List<RPCEntry>();
		/// <summary>
		/// 数据缓冲区池
		/// </summary>
		private readonly ObjectPool<StreamBuffer> _bufferPool = new ObjectPool<StreamBuffer>( 10, 5 );
		/// <summary>
		/// 消息处理中心
		/// </summary>
		private readonly MessageCenter _messageCenter = new MessageCenter();

		protected NetSessionBase( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected void RegMsgHandler( Protos.MsgID msgID, MessageHandler handler ) => this._messageCenter.Register( msgID, handler );

		protected MessageHandler GetMsgHandler( Protos.MsgID msgID ) => this._messageCenter.GetHandler( msgID );

		/// <summary>
		/// 把消息体编码到缓冲区
		/// </summary>
		/// <param name="buffer">待写入的缓冲区</param>
		/// <param name="message">消息体</param>
		/// <param name="transTarget">转发目标</param>
		/// <param name="nsid">转发的网络ID</param>
		public static void EncodeMessage( StreamBuffer buffer, IMessage message,
										  Protos.MsgOpts.Types.TransTarget transTarget =
											  Protos.MsgOpts.Types.TransTarget.Undefine, ulong nsid = 0 )
		{
			buffer.Write( ( int )message.GetMsgID() );

			Protos.MsgOpts opts = message.GetMsgOpts();
			System.Diagnostics.Debug.Assert( opts != null, "invalid message options" );
			if ( transTarget != Protos.MsgOpts.Types.TransTarget.Undefine )
			{
				opts.Flag |= 1 << 3; //mark as transpose
				opts.Flag |= ( uint )( 1 << ( 3 + ( int )transTarget ) ); //mark trans target
			}
			if ( nsid > 0 )
				opts.Transid = nsid;

			message.WriteTo( buffer.ms );
		}

		/// <summary>
		/// 发送数据
		/// 线程不安全,不建议异步调用
		/// </summary>
		/// <param name="message">消息体</param>
		/// <param name="rpcEntry">RPC回调函数</param>
		/// <param name="transTarget">转发目标</param>
		/// <param name="nsid">转发的网络ID</param>
		public void Send( IMessage message, RPCEntry rpcEntry = null,
						  Protos.MsgOpts.Types.TransTarget transTarget = Protos.MsgOpts.Types.TransTarget.Undefine,
						  ulong nsid = 0 )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( ( int )message.GetMsgID() );

			Protos.MsgOpts opts = message.GetMsgOpts();
			System.Diagnostics.Debug.Assert( opts != null, "invalid message options" );

			if ( transTarget != Protos.MsgOpts.Types.TransTarget.Undefine )
			{
				opts.Flag |= 1 << 3; //mark as transpose
				opts.Flag |= ( uint )( 1 << ( 3 + ( int )transTarget ) ); //mark trans target
			}
			if ( nsid > 0 )
				opts.Transid = nsid;

			if ( ( opts.Flag & ( 1 << ( int )Protos.MsgOpts.Types.Flag.Rpc ) ) > 0 ) //如果是rpc消息,记下消息序号等待回调
			{
				//只有rpc才写入序号
				if ( nsid == 0 )
				{
					opts.Pid = this._pid++; //注意这里线程不安全
					Logger.Log( $"send pid:{opts.Pid},msg:{message.GetMsgID()}" );
				}

				if ( rpcEntry != null )
				{
					if ( this._pidToRPCEntries.ContainsKey( opts.Pid ) )
						Logger.Warn( "message id collision!!" );
					else
					{
						//rpcEntry.time = 0;
						//记录回调函数
						this._pidToRPCEntries[opts.Pid] = rpcEntry;
						this._rpcEntries.Add( rpcEntry );
					}
				}
			}

			message.WriteTo( buffer.ms );

			this.Send( buffer.GetBuffer(), 0, buffer.length );
			this._bufferPool.Push( buffer );
		}

		protected override void OnHeartBeat( long dt )
		{
		}

		protected override void OnConnError( string error )
		{
		}

		/// <summary>
		/// 连接到达后回调
		/// </summary>
		protected override void OnEstablish()
		{
			if ( this.isPassive )
				this.owner.AddSession( this );
		}

		/// <summary>
		/// 连接断开后回调
		/// </summary>
		/// <param name="reason">断开原因</param>
		protected override void OnClose( string reason )
		{
			//连接关闭,中断所有RPC回调
			//int count = this._rpcEntries.Count;
			//for ( int i = 0; i < count; i++ )
			//	this._rpcEntries[i].handler( null, RPCState.Close );
			this._pid = 0;
			this._pidToRPCEntries.Clear();
			this._rpcEntries.Clear();
			if ( this.isPassive )
				this.owner.RemoveSession( this );
		}

		/// <summary>
		/// 接收消息后的处理函数
		/// </summary>
		/// <param name="data">接收的数据</param>
		/// <param name="offset">数据偏移量</param>
		/// <param name="size">数据长度</param>
		protected override void OnRecv( byte[] data, int offset, int size )
		{
			int len = data.Length;
			if ( len - offset < sizeof( int ) )
			{
				Logger.Warn( "invalid msg." );
				return;
			}
			//剥离消息ID
			Protos.MsgID msgID = ( Protos.MsgID )ByteUtils.Decode32i( data, offset );
			//判断是否需要阻断该消息
			if ( this.ShouldBlockMsg( msgID ) )
				return;
			offset += sizeof( int );
			size -= offset;

			//解码消息
			IMessage message = ProtoCreator.DecodeMsg( msgID, data, offset, size );
			//检查第一个字段是否Protos.MsgOpts类型
			Protos.MsgOpts opts = message.GetMsgOpts();
			System.Diagnostics.Debug.Assert( opts != null, "invalid msg options" );
			Logger.Log( $"recv pid:{opts.Rpid}, msg:{msgID}" );

			if ( ( opts.Flag & ( 1 << ( int )Protos.MsgOpts.Types.Flag.Trans ) ) > 0 ) //这是一条转发消息
			{
				//去掉转发标记
				//opts.Flag &= ~( uint ) Protos.MsgOpts.Types.Flag.Trans;

				//后2位为转发目标
				Protos.MsgOpts.Types.TransTarget transTarget = ( Protos.MsgOpts.Types.TransTarget )( ( opts.Flag >> 4 ) & 0xf );
				//如果不是转发的目标
				if ( !this.owner.IsTransTarget( transTarget ) )
				{
					this.TransMsg( transTarget, opts.Transid, message );
					return;
				}
			}
			//是否RPC消息
			if ( ( opts.Flag & ( 1 << ( int )Protos.MsgOpts.Types.Flag.Resp ) ) > 0 )
			{
				if ( this._pidToRPCEntries.TryGetValue( opts.Rpid, out RPCEntry rpcEntry ) )
				{
					this._pidToRPCEntries.Remove( opts.Rpid );
					this._rpcEntries.Remove( rpcEntry );
					rpcEntry.handler( this, message, rpcEntry.args );//调用回调函数
					RPCEntry.Push( rpcEntry );
				}
				else
					Logger.Warn( $"RPC handler not found with message:{msgID}" );
			}
			else
			{
				this.DispatchMessage( msgID, message );
			}
		}

		/// <summary>
		/// 是否需要阻断该消息
		/// 子类可重写该方法以判断该消息是否合法
		/// </summary>
		protected virtual bool ShouldBlockMsg( Protos.MsgID msgID ) => false;

		/// <summary>
		/// 从消息中心获取消息的回调函数
		/// </summary>
		protected virtual void DispatchMessage( Protos.MsgID msgID, IMessage message )
		{
			MessageHandler handler = this._messageCenter.GetHandler( msgID );
			if ( handler != null )
			{
				ErrorCode errorCode = handler.Invoke( this, message );
				if ( errorCode != ErrorCode.Success )
					Logger.Warn( errorCode );
			}
			else
				Logger.Warn( $"unhandle msg:{msgID}." );
		}

		/// <summary>
		/// 发送转发消息(自动调用)
		/// 该方法在收到消息后,被判断为转发消息时调用
		/// 由于各服务实现方式不相同,该方法需要被重写
		/// </summary>
		/// <param name="transTarget">转发目标</param>
		/// <param name="transID">网络ID</param>
		/// <param name="message">消息体</param>
		protected virtual void TransMsg( Protos.MsgOpts.Types.TransTarget transTarget, ulong transID, IMessage message )
		{
			Logger.Warn( "override this method to transpose message" );
		}

		protected override void OnSend()
		{
		}

		protected override void OnError( string error )
		{
		}

		//public override void Update( UpdateContext updateContext )
		//{
		//	base.Update( updateContext );
		//	//检查rpc超时
		//	int count = this._rpcEntries.Count;
		//	for ( int i = 0; i < count; i++ )
		//	{
		//		RPCEntry rpcEntry = this._rpcEntries[i];
		//		rpcEntry.time += updateContext.deltaTime;
		//		if ( rpcEntry.time >= Consts.RPC_TIMEOUT )
		//		{
		//			this._pidToRPCEntries.Remove( rpcEntry.pid );
		//			this._rpcEntries.RemoveAt( i );
		//			--i;
		//			--count;
		//			Logger.Warn( $"timeout!! RPC:{rpcEntry.pid} no response!!" );
		//			rpcEntry.handler( null, RPCState.Timeout );
		//		}
		//	}
		//}
	}
}