using System.Collections.Generic;
using System.IO;

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
		private readonly MemoryStream _ms = new MemoryStream();
		private readonly Google.Protobuf.CodedOutputStream _writer;

		/// <summary>
		/// 获取最新的帧行为历史记录
		/// </summary>
		public Google.Protobuf.ByteString latestHistory => this._histroy.Values[this._histroy.Count - 1];

		public FrameActionMgr()
		{
			this._writer = new Google.Protobuf.CodedOutputStream( this._ms );
		}

		/// <summary>
		/// 初始化
		/// </summary>
		public void Init( Battle battle )
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
		public void Clear()
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
			this._writer.WriteRawTag( 0 );
			byte count = 0;
			lock ( this._gcNIDToAction )
			{
				foreach ( KeyValuePair<ulong, FrameAction> kv in this._gcNIDToAction )
				{
					FrameAction frameAction = kv.Value;
					if ( !frameAction.isValid )
						continue;
					frameAction.Serialize( this._writer );
					++count;
				}
			}
			this._ms.Position = 0;
			this._ms.WriteByte( count );
			Google.Protobuf.ByteString data = Google.Protobuf.ByteString.CopyFrom( this._ms.GetBuffer(), 0, ( int ) this._ms.Length );
			this._ms.SetLength( 0 );
			this._histroy[frame] = data;
		}

		/// <summary>
		/// 从收到的玩家数据合并到帧行为
		/// 主线程调用
		/// </summary>
		public void MergeFromProto( ulong gcNID, Protos.GC2BS_FrameAction action )
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
		public void FillHistoryToMessage( int from, int to, Protos.BS2GC_RequestFrameActionsRet ret )
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