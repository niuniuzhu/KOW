using Core.Net;
using System.Collections.Generic;

namespace BattleServer.Battle
{
	/// <summary>
	/// 帧行为管理器
	/// </summary>
	public class FrameActionMgr
	{
		/// <summary>
		/// 玩家ID到帧行为的映射
		/// </summary>
		private readonly Dictionary<ulong, FrameAction> _gcNIDToAction = new Dictionary<ulong, FrameAction>();

		/// <summary>
		/// 帧行为历史列表
		/// </summary>
		private readonly SortedList<int, Google.Protobuf.ByteString> _histroy = new SortedList<int, Google.Protobuf.ByteString>();

		private Battle _battle;
		private readonly StreamBuffer _frameBuffer = new StreamBuffer();

		/// <summary>
		/// 获取最新的帧行为历史记录
		/// </summary>
		public Google.Protobuf.ByteString latestHistory => this._histroy.Values[this._histroy.Count - 1];

		/// <summary>
		/// 初始化
		/// </summary>
		internal void Init( Battle battle )
		{
			this._battle = battle;
			int count = battle.numPlayers;
			for ( int i = 0; i < count; i++ )
			{
				ulong id = battle.GetPlayerAt( i ).id;
				this._gcNIDToAction[id] = new FrameAction( id );
			}
		}

		/// <summary>
		/// 战场结束后清理
		/// 多线程调用
		/// </summary>
		internal void Clear()
		{
			lock ( this._gcNIDToAction )
			{
				this._gcNIDToAction.Clear();
			}
			this._battle = null;
		}

		/// <summary>
		/// 把帧行为保存到历史列表
		/// 填充后会清空当前帧的帧行为
		/// 战场线程调用
		/// </summary>
		internal void Save( int frame )
		{
			this._frameBuffer.Write( ( byte )0 );
			byte count = 0;
			lock ( this._gcNIDToAction )
			{
				foreach ( KeyValuePair<ulong, FrameAction> kv in this._gcNIDToAction )
				{
					FrameAction frameAction = kv.Value;
					if ( !frameAction.isValid )
						continue;
					frameAction.SerializeTo( this._frameBuffer );
					frameAction.Clear();
					++count;
				}
			}
			this._frameBuffer.Write( 0, count );
			Google.Protobuf.ByteString data = Google.Protobuf.ByteString.CopyFrom( this._frameBuffer.GetBuffer(), 0, this._frameBuffer.length );
			this._frameBuffer.Clear();
			this._histroy[frame] = data;
		}

		/// <summary>
		/// 从收到的玩家数据合并到帧行为
		/// 主线程调用
		/// </summary>
		internal void HandleFrameAction( ulong gcNID, Protos.GC2BS_FrameAction action )
		{
			lock ( this._gcNIDToAction )
			{
				FrameAction frameAction = this._gcNIDToAction[gcNID];
				frameAction.MergeFromProto( action );
			}
		}

		/// <summary>
		/// 获取指定范围内的帧行为集合
		/// </summary>
		/// <param name="from">开始帧数</param>
		/// <param name="to">结束帧数, -1表示最新帧数</param>
		/// <param name="ret">需要填充的消息</param>
		internal void FillHistoryToMessage( int from, int to, Protos.BS2GC_RequestFrameActionsRet ret )
		{
			from = from < 0 ? 0 : from;
			to = to < 0 ? this._battle.frame : ( to > this._battle.frame ? this._battle.frame : to );
			int fromIndex = from / this._battle.keyframeStep + 1;
			int toIndex = to / this._battle.keyframeStep;
			IList<int> keys = this._histroy.Keys;
			IList<Google.Protobuf.ByteString> values = this._histroy.Values;
			for ( int i = fromIndex; i <= toIndex; i++ )
			{
				ret.Frames.Add( keys[i] );
				ret.Actions.Add( values[i] );
			}
		}
	}
}