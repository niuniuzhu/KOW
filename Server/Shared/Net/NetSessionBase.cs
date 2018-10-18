﻿using Core.Misc;
using Core.Net;
using Google.Protobuf;
using System;
using System.Collections.Generic;

namespace Shared.Net
{
	public class NetSessionBase : NetSession
	{
		public NetSessionMgr owner { get; set; }
		public uint logicID { get; set; }
		public SessionType type { get; set; }

		protected readonly MsgCenter _msgCenter;

		private uint _pid;
		private readonly Dictionary<uint, Action<IMessage>> _rpcHandlers = new Dictionary<uint, Action<IMessage>>();//可能是异步写入,但必定是同步读取,不用加锁
		private readonly ObjectPool<StreamBuffer> _bufferPool = new ObjectPool<StreamBuffer>( 10, 5 );

		protected NetSessionBase( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter = new MsgCenter();
		}

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
			buffer.Write( ( int ) message.GetMsgID() );

			Protos.MsgOpts opts = message.GetMsgOpts();
			System.Diagnostics.Debug.Assert( opts != null, "invalid message options" );
			if ( transTarget != Protos.MsgOpts.Types.TransTarget.Undefine )
			{
				opts.Flag |= 1 << 3; //mark as transpose
				opts.Flag |= ( uint ) ( 1 << ( 3 + ( int ) transTarget ) ); //mark trans target
			}
			if ( nsid > 0 )
				opts.Transid = nsid;

			message.WriteTo( buffer.ms );
		}

		/// <summary>
		/// 发送数据
		/// </summary>
		/// <param name="message">消息体</param>
		/// <param name="rpcHandler">RPC回调函数</param>
		/// <param name="transTarget">转发目标</param>
		/// <param name="nsid">转发的网络ID</param>
		public void Send( IMessage message, Action<IMessage> rpcHandler = null,
						  Protos.MsgOpts.Types.TransTarget transTarget = Protos.MsgOpts.Types.TransTarget.Undefine,
						  ulong nsid = 0 )
		{
			StreamBuffer buffer = this._bufferPool.Pop();
			buffer.Write( ( int ) message.GetMsgID() );

			Protos.MsgOpts opts = message.GetMsgOpts();
			System.Diagnostics.Debug.Assert( opts != null, "invalid message options" );
			if ( transTarget != Protos.MsgOpts.Types.TransTarget.Undefine )
			{
				opts.Flag |= 1 << 3; //mark as transpose
				opts.Flag |= ( uint ) ( 1 << ( 3 + ( int ) transTarget ) ); //mark trans target
			}
			if ( nsid > 0 )
				opts.Transid = nsid;

			if ( ( opts.Flag & ( 1 << ( int ) Protos.MsgOpts.Types.Flag.Rpc ) ) > 0 ) //如果是rpc消息,记下消息序号等待回调
			{
				//只有rpc才写入序号
				if ( nsid == 0 )
					opts.Pid = this._pid++;

				if ( rpcHandler != null )
				{
					if ( this._rpcHandlers.ContainsKey( opts.Pid ) )
						Logger.Warn( "packet id collision!!" );
					this._rpcHandlers[opts.Pid] = rpcHandler;
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

		protected override void OnEstablish()
		{
			if ( this.isPassive )
				this.owner.AddSession( this );
		}

		protected override void OnClose( string reason )
		{
			this._pid = 0;
			this._rpcHandlers.Clear();
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
			Protos.MsgID msgID = ( Protos.MsgID ) ByteUtils.Decode32i( data, offset );
			offset += sizeof( int );
			size -= offset;

			//解码消息
			IMessage message = ProtoCreator.DecodeMsg( msgID, data, offset, size );
			//检查第一个字段是否Protos.MsgOpts类型
			Protos.MsgOpts opts = message.GetMsgOpts();
			System.Diagnostics.Debug.Assert( opts != null, "invalid msg options" );

			if ( ( opts.Flag & ( 1 << ( int ) Protos.MsgOpts.Types.Flag.Trans ) ) > 0 ) //这是一条转发消息
			{
				//去掉转发标记
				//opts.Flag &= ~( uint ) Protos.MsgOpts.Types.Flag.Trans;
				//后2位为转发目标
				Protos.MsgOpts.Types.TransTarget transTarget = ( Protos.MsgOpts.Types.TransTarget ) ( ( opts.Flag >> 4 ) & 0xf );
				//如果不是转发的目标
				if ( !this.owner.IsTransTarget( transTarget ) )
				{
					this.TransMsg( transTarget, opts.Transid, message );
					return;
				}
			}

			if ( ( opts.Flag & ( 1 << ( int ) Protos.MsgOpts.Types.Flag.Resp ) ) > 0 )//这是一条rpc消息
			{
				bool find = this._rpcHandlers.TryGetValue( opts.Rpid, out Action<IMessage> rcpHandler );
				System.Diagnostics.Debug.Assert( find, $"RPC handler not found with message:{msgID}" );
				this._rpcHandlers.Remove( opts.Rpid );
				rcpHandler( message );//调用回调函数
			}
			else
			{
				if ( this._msgCenter.TryGetHandler( msgID, out MsgCenter.GeneralHandler msgHandler ) )
				{
					ErrorCode errorCode = msgHandler.Invoke( message );
					if ( errorCode != ErrorCode.Success )
						Logger.Warn( errorCode );
				}
				else
					Logger.Warn( $"unhandle msg:{msgID}." );
			}
		}

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
	}
}