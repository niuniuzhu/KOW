using Core.Crypto;
using Core.Misc;
using Google.Protobuf;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BattleServer.Battle.Snapshot
{
	/// <summary>
	/// 快照管理器
	/// </summary>
	public class SnapshotMgr
	{
		private Battle _battle;

		/// <summary>
		/// 帧数到快照的映射表,作为快照的历史记录
		/// </summary>
		private readonly SortedList<int, FrameSnapshot> _frameToSnapshot = new SortedList<int, FrameSnapshot>();

		/// <summary>
		/// 记录相同帧数下每个玩家提交的快照数据
		/// </summary>
		private readonly Dictionary<int, List<PlayerSnapshot>> _frameToSnapshots = new Dictionary<int, List<PlayerSnapshot>>();


		internal void Init( Battle battle )
		{
			this._battle = battle;
		}

		internal void Clear()
		{
			this._frameToSnapshot.Clear();
			this._frameToSnapshots.Clear();
		}

		/// <summary>
		/// 获取指定帧数下的快照实例
		/// </summary>
		/// <param name="frame">指定帧数下的快照,-1表示最近的快照</param>
		public FrameSnapshot Get( int frame = -1 )
		{
			if ( frame < 0 )
			{
				IList<FrameSnapshot> values = this._frameToSnapshot.Values;
				int count = values.Count;
				return count == 0 ? null : values[count - 1];
			}
			this._frameToSnapshot.TryGetValue( frame, out FrameSnapshot snapshot );
			return snapshot;
		}

		/// <summary>
		/// 保存快照到历史记录
		/// </summary>
		internal void Set( FrameSnapshot snapshot )
		{
			this._frameToSnapshot[snapshot.frame] = snapshot;
		}

		/// <summary>
		/// 处理玩家提交的快照数据
		/// </summary>
		internal bool Commit( int frame, ulong gcNID, ByteString data )
		{
			if ( !this._frameToSnapshots.TryGetValue( frame, out List<PlayerSnapshot> playerSnapshots ) )
			{
				playerSnapshots = new List<PlayerSnapshot>();
				this._frameToSnapshots[frame] = playerSnapshots;
			}

			//检查玩家是否重复提交
			if ( playerSnapshots.Any( snapshot => snapshot.gcNID == gcNID ) )
			{
				Logger.Error( $"user:{gcNID} duplicate commit snapshot!" );
				return false;
			}

			PlayerSnapshot playerSnapshot = new PlayerSnapshot();
			playerSnapshot.gcNID = gcNID;
			playerSnapshot.data = data;
			playerSnapshot.crc = CRC32.Compute( data.ToByteArray() );
			playerSnapshots.Add( playerSnapshot );
			return this.CheckPlayerSnapshots( frame, playerSnapshots );
		}

		private bool CheckPlayerSnapshots( int frame, List<PlayerSnapshot> playerSnapshots )
		{
			//判断是否所有玩家都提交了快照
			if ( playerSnapshots.Count < this._battle.numChampions )
				return false;
			//检查crc一致性
			//先找出crc多数一致的组
			bool success = true;
			var group = playerSnapshots.GroupBy( s => s.crc );
			//如果只有一个分组,则代表全部玩家的crc值一致
			//否则每个玩家进行判断
			if ( group.Count() > 1 )
			{
				IGrouping<uint, PlayerSnapshot> maxGroup = null;
				int max = 0;
				foreach ( var e in group )
				{
					int c = e.Count();
					if ( c <= max )
						continue;
					maxGroup = e;
					max = c;
				}
				System.Diagnostics.Debug.Assert( maxGroup != null );
				//正确的crc值
				uint crc = maxGroup.Key;
				int count = playerSnapshots.Count;
				for ( int i = 0; i < count; i++ )
				{
					PlayerSnapshot playerSnapshot = playerSnapshots[i];
					if ( playerSnapshot.crc == crc )
						continue;

					Logger.Log( PrintSnapshot( maxGroup.First().data ) );
					Logger.Log( PrintSnapshot( playerSnapshot.data ) );
					Logger.Warn( $"{playerSnapshot.gcNID} different snapshot crc32 value, expect:{crc} but:{playerSnapshot.crc} at frame:{frame}" );

					success = false;

					//发生不同步,触发回调函数
					this._battle.OnOutOfSync( playerSnapshot.gcNID, frame, maxGroup.First().data, playerSnapshot.data );
				}
			}
			//如果crc正确
			if ( success )
			{
				ByteString data = playerSnapshots[0].data;
				//把快照数据保存到历史记录里
				FrameSnapshot frameSnapshot = new FrameSnapshot { data = data, frame = frame };
				this.Set( frameSnapshot );
				//该帧的检查已经完成,可以不保留在内存了
				this._frameToSnapshots.Remove( frame );
				Logger.Log( $"success,f{frame},snap count:{this._frameToSnapshot.Count},wcount:{this._frameToSnapshots.Count}" );
			}
			return success;
		}

		internal static string PrintSnapshot( ByteString data ) => BitConverter.ToString( data.ToByteArray() );
	}

	public class PlayerSnapshot
	{
		public ulong gcNID;
		public ByteString data;
		public uint crc;
	}
}