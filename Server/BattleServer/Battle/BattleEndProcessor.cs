using BattleServer.Battle.Snapshot;
using Core.Crypto;
using Google.Protobuf;
using System.Collections.Generic;

namespace BattleServer.Battle
{
	public class BattleEndProcessor
	{
		private Battle _battle;
		private readonly Dictionary<ulong, Protos.GC2BS_EndBattle> _record = new Dictionary<ulong, Protos.GC2BS_EndBattle>();

		public bool vaild => this._record.Count > 0;

		public void Init( Battle battle )
		{
			this._battle = battle;
		}

		public void Clear()
		{
			this._battle = null;
			this._record.Clear();
		}

		public void Add( ulong gcNID, Protos.GC2BS_EndBattle endBattle )
		{
			this._record.Add( gcNID, endBattle );
		}

		public void Process()
		{
			uint crc = 0;
			bool success = true;
			//todo 目前只检查提交了的玩家的快照
			List<PlayerSnapshot> playerSnapshots = new List<PlayerSnapshot>();
			foreach ( var kv in this._record )
			{
				//检查快照crc值
				Protos.GC2BS_EndBattle endBattle = kv.Value;
				PlayerSnapshot playerSnapshot = new PlayerSnapshot();
				playerSnapshot.gcNID = kv.Key;
				playerSnapshot.data = endBattle.Snapshot;
				playerSnapshot.crc = CRC32.Compute( endBattle.Snapshot.ToByteArray() );
				if ( crc != 0 &&
					 playerSnapshot.crc != crc )
				{
					success = false;
					break;
				}
				crc = playerSnapshot.crc;
				playerSnapshots.Add( playerSnapshot );
			}

			if ( success )
			{
				ByteString data = playerSnapshots[0].data;
				this.AnalysisResult( data );
			}
			else
			{
				//todo 数据不同步
			}
		}

		private void AnalysisResult( ByteString data )
		{
		}
	}
}