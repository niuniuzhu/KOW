using System.Collections.Generic;
using Core.Misc;

namespace BattleServer.Battle
{
	public class BattleManager
	{
		private static readonly ObjectPool<Battle> POOL = new ObjectPool<Battle>();

		private readonly Dictionary<ulong, Battle> _gcNIDToBattle = new Dictionary<ulong, Battle>();

		/// <summary>
		/// 检查是否存在指定ID的客户端
		/// </summary>
		public bool HasGC( ulong gcNID ) => this._gcNIDToBattle.ContainsKey( gcNID );

		/// <summary>
		/// 开始战斗
		/// </summary>
		/// <param name="waitingRoom"></param>
		public void CreateBattle( WaitingRoom waitingRoom )
		{
			Battle battle = POOL.Pop();

			BattleDescript battleDesc;
			battleDesc.mapID = waitingRoom.mapID;
			battleDesc.frameRate = BS.instance.config.frameRate;
			battleDesc.keyframeStep = BS.instance.config.keyframeStep;
			battleDesc.players = waitingRoom.GetPlayerDescripts();
			int count = battleDesc.players.Count;
			for ( int i = 0; i < count; i++ )
				this._gcNIDToBattle[battleDesc.players[i].gcNID] = battle;

			battle.Init( battleDesc );

			Logger.Log( $"battle:{battle.id} start" );

			//通知客户端战斗开始
			Protos.BS2GC_BattleStart battleStart = ProtoCreator.Q_BS2GC_BattleStart();
			battleStart.Id = battle.id;
			battle.Broadcast( battleStart );
		}
	}
}