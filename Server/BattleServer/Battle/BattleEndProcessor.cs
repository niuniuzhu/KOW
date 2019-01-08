using BattleServer.Battle.Snapshot;
using Core.Crypto;
using Core.Misc;
using System.Collections.Generic;
using System.Linq;
using Google.Protobuf;

namespace BattleServer.Battle
{
	public class BattleEndProcessor
	{
		private Battle _battle;
		private long _time;

		private readonly List<PlayerSnapshot> _playerSnapshots = new List<PlayerSnapshot>();

		public bool hasRecord => this._playerSnapshots.Count > 0;

		internal void Init( Battle battle )
		{
			this._battle = battle;
			this._time = 0;
		}

		internal void Clear()
		{
			this._battle = null;
			this._playerSnapshots.Clear();
		}

		internal void Add( ulong gcNID, Protos.GC2BS_EndBattle endBattle )
		{
			//检查玩家是否重复提交
			if ( this._playerSnapshots.Any( snapshot => snapshot.gcNID == gcNID ) )
			{
				Logger.Error( $"user:{gcNID} duplicate commit snapshot!" );
				return;
			}

			PlayerSnapshot playerSnapshot = new PlayerSnapshot();
			playerSnapshot.gcNID = gcNID;
			playerSnapshot.data = endBattle.Snapshot;
			playerSnapshot.crc = CRC32.Compute( endBattle.Snapshot.ToByteArray() );
			this._playerSnapshots.Add( playerSnapshot );
		}

		internal ByteString Process( int frame, long dt )
		{
			this._time += dt;
			int count = this._playerSnapshots.Count;
			//延迟一段时间等待所有玩家提交结束快照
			//todo 如果超时暂不处理
			if ( count < this._battle.numChampions &&
				 this._time < BS.instance.config.waitUserCommitSSTimeout )
				return null;

			//检查crc一致性,参考SnapshotMgr
			bool success = true;
			var group = this._playerSnapshots.GroupBy( s => s.crc );
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
				uint crc = maxGroup.Key;
				for ( int i = 0; i < count; i++ )
				{
					PlayerSnapshot playerSnapshot = this._playerSnapshots[i];
					if ( playerSnapshot.crc == crc )
						continue;

					Logger.Log( SnapshotMgr.PrintSnapshot( maxGroup.First().data ) );
					Logger.Log( SnapshotMgr.PrintSnapshot( playerSnapshot.data ) );
					Logger.Warn( $"{playerSnapshot.gcNID} different snapshot crc32 value, expect:{crc} but:{playerSnapshot.crc} at frame:{frame}" );

					success = false;

					//发生不同步,触发回调函数
					this._battle.OnOutOfSync( playerSnapshot.gcNID, frame, maxGroup.First().data, playerSnapshot.data );
				}
			}
			if ( success )
				return this._playerSnapshots[0].data;

			//清空所有结束请求,因为不合法
			this._playerSnapshots.Clear();
			this._time = 0;
			return null;
		}
	}
}