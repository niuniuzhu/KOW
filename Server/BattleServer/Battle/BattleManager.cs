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
		/// <param name="waitingRoom"></param>
		public void CreateBattle( WaitingRoom waitingRoom )
		{
			Battle battle = POOL.Pop();

			BattleDescript battleDesc;
			battleDesc.id = waitingRoom.id;
			battleDesc.mapID = waitingRoom.mapID;
			battleDesc.frameRate = BS.instance.config.frameRate;
			battleDesc.keyframeStep = BS.instance.config.keyframeStep;
			battleDesc.players = waitingRoom.GetPlayerDescripts();
			battleDesc.battleTime = BS.instance.config.battleTime;

			int count = battleDesc.players.Count;
			for ( int i = 0; i < count; i++ )
				this._gcNIDToBattle[battleDesc.players[i].gcNID] = battle;

			battle.Init( battleDesc );
			this._runningBattles.Add( battle );

			Logger.Log( $"battle:{battle.id} start" );

			Protos.BS2CS_BattleStart toCSBattleStart = ProtoCreator.Q_BS2CS_BattleStart();
			toCSBattleStart.Bid = battle.id;
			BS.instance.netSessionMgr.Send( SessionType.ServerB2CS, toCSBattleStart, msgRet =>
			{
				//通知客户端战场开始
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
			} );
		}

		public void Update( long dt )
		{
			int count = this._runningBattles.Count;
			for ( int i = 0; i < count; i++ )
			{
				Battle battle = this._runningBattles[i];
				if ( battle.finished )
				{
					this.OnBattleEnd( battle );
				}
			}
		}
	}
}