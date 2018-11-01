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
		private readonly Dictionary<int, FrameAction> _histroy = new Dictionary<int, FrameAction>();

		/// <summary>
		/// 初始化
		/// </summary>
		public void Init( Battle battle )
		{
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
		}

		/// <summary>
		/// 从收到的玩家数据合并到帧行为
		/// 主线程调用
		/// </summary>
		public void MergeFromProto( ulong gcNID, Protos.GC2BS_Action action )
		{
			lock ( this._gcNIDToAction )
			{
				FrameAction frameAction = this._gcNIDToAction[gcNID];
				frameAction.MergeFromProto( action );
			}
		}

		/// <summary>
		/// 把帧行为保存到历史列表
		/// 战场线程调用
		/// </summary>
		internal void Save( int frame )
		{
			lock ( this._gcNIDToAction )
			{
				foreach ( KeyValuePair<ulong, FrameAction> kv in this._gcNIDToAction )
					this._histroy[frame] = kv.Value;
			}
		}

		/// <summary>
		/// 把两关键帧之间的帧行为填充到协议
		/// 战场线程调用
		/// </summary>
		internal void Pull( Google.Protobuf.Collections.MapField<ulong, Protos.BS2GC_FrameActon> actions )
		{
			lock ( this._gcNIDToAction )
			{
				foreach ( KeyValuePair<ulong, FrameAction> kv in this._gcNIDToAction )
				{
					FrameAction frameAction = kv.Value;
					if ( !frameAction.isValid )
						continue;
					Protos.BS2GC_FrameActon pAction = new Protos.BS2GC_FrameActon
					{
						InputFlag = ( int ) frameAction.inputFlag,
						Dx = ( float ) frameAction.dx,
						Dy = ( float ) frameAction.dy
					};
					actions[kv.Key] = pAction;
					frameAction.Clear();
				}
			}
		}
	}
}