using Core.Misc;
using Shared.Net;
using System.Collections.Generic;

namespace BattleServer.Battle
{
	public class BattleManager
	{
		private static readonly ObjectPool<Battle> POOL = new ObjectPool<Battle>();

		private readonly Dictionary<ulong, Battle> _gcNIDToBattle = new Dictionary<ulong, Battle>();
		private readonly List<Battle> _runningBattles = new List<Battle>();

		/// <summary>
		/// 检查是否存在指定ID的客户端
		/// </summary>
		public bool CheckClient( ulong gcNID ) => this._gcNIDToBattle.ContainsKey( gcNID );

		/// <summary>
		/// 开始战斗
		/// </summary>
		public void CreateBattle( WaitingRoom waitingRoom )
		{
			Battle battle = POOL.Pop();

			BattleEntry battleEntry;
			battleEntry.id = waitingRoom.id;
			battleEntry.mapID = waitingRoom.mapID;
			battleEntry.frameRate = BS.instance.config.frameRate;
			battleEntry.keyframeStep = BS.instance.config.keyframeStep;
			battleEntry.players = waitingRoom.GetPlayerEntry();
			battleEntry.battleTime = BS.instance.config.battleTime;

			int count = battleEntry.players.Count;
			for ( int i = 0; i < count; i++ )
				this._gcNIDToBattle[battleEntry.players[i].gcNID] = battle;

			battle.Init( battleEntry );
			this._runningBattles.Add( battle );

			Logger.Log( $"battle:{battle.id} created" );

			Protos.BS2CS_BattleStart toCSBattleStart = ProtoCreator.Q_BS2CS_BattleStart();
			toCSBattleStart.Bid = battle.id;
			BS.instance.netSessionMgr.Send( SessionType.ServerB2CS, toCSBattleStart, msgRet =>
			{
				//通知GC战场开始
				Protos.BS2GC_BattleStart toGCBattleStart = ProtoCreator.Q_BS2GC_BattleStart();
				toGCBattleStart.Id = battle.id;
				battle.Broadcast( toGCBattleStart );
			} );
		}

		private void OnBattleEnd( Battle battle )
		{
			//通知CS战场结束
			Protos.BS2CS_BattleEnd toCSBattleEnd = ProtoCreator.Q_BS2CS_BattleEnd();
			toCSBattleEnd.Bid = battle.id;
			BS.instance.netSessionMgr.Send( SessionType.ServerB2CS, toCSBattleEnd, msgRet =>
			{
				//通知客户端战场结束
				Protos.BS2GC_BattleEnd toGCBattleEnd = ProtoCreator.Q_BS2GC_BattleEnd();
				toGCBattleEnd.Id = battle.id;
				battle.Broadcast( toGCBattleEnd );
				//所有玩家下线
				battle.ForeachPlayer( player =>
				{
					BS.instance.userMgr.Offline( player.gcNID );
				} );
			} );
		}

		public void Update( long dt )
		{
			int count = this._runningBattles.Count;
			for ( int i = 0; i < count; i++ )
			{
				Battle battle = this._runningBattles[i];
				//检查战场是否结束
				if ( battle.finished )
				{
					//处理战场结束
					this.OnBattleEnd( battle );
					this._runningBattles.RemoveAt( i );
					POOL.Push( battle );
					Logger.Log( $"battle:{battle.id} destroied" );
					--i;
					--count;
				}
			}
		}
	}
}