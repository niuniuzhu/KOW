using Core.Misc;
using System.Collections.Generic;

namespace BattleServer.Battle
{
	public class WaitingRoomMgr
	{
		private static readonly ObjectPool<WaitingRoom> POOL = new ObjectPool<WaitingRoom>( 100, 20 );

		private readonly List<WaitingRoom> _waitingRooms = new List<WaitingRoom>();
		private readonly Dictionary<ulong, WaitingRoom> _gcNIDToRoom = new Dictionary<ulong, WaitingRoom>();

		/// <summary>
		/// 检查是否存在指定ID的客户端
		/// </summary>
		public bool CheckClient( ulong gcNID ) => this._gcNIDToRoom.ContainsKey( gcNID );

		/// <summary>
		/// CS通知有房间已完成
		/// </summary>
		/// <param name="battleInfo"></param>
		public WaitingRoom CreateWaitingRoom( Protos.CS2BS_BattleInfo battleInfo )
		{
			WaitingRoom waitingRoom = POOL.Pop();
			this._waitingRooms.Add( waitingRoom );

			waitingRoom.mapID = battleInfo.MapID;
			waitingRoom.timeout = battleInfo.Timeout;
			int count = battleInfo.PlayerInfo.Count;
			for ( int i = 0; i < count; i++ )
			{
				Protos.CS2BS_PlayerInfo playerInfo = battleInfo.PlayerInfo[i];
				WaitingClient gc = new WaitingClient( playerInfo.GcNID, playerInfo.Name, playerInfo.ActorID );
				waitingRoom.AddClient( gc );
				this._gcNIDToRoom[playerInfo.GcNID] = waitingRoom;
			}
			Logger.Log( $"room:{waitingRoom.id} was created" );
			return waitingRoom;
		}

		/// <summary>
		/// 客户端连接后调用
		/// </summary>
		public void OnGCLogin( ulong gcNID )
		{
			//这里不用检查是否存在key,调用者已经确保存在
			WaitingRoom waitingRoom = this._gcNIDToRoom[gcNID];
			waitingRoom.GCConnected( gcNID );
		}

		/// <summary>
		/// 所有客户端准备完成,开始战斗
		/// </summary>
		/// <param name="waitingRoom"></param>
		private void StartBattle( WaitingRoom waitingRoom )
		{
			BS.instance.battleManager.CreateBattle( waitingRoom );
		}

		public void Update( long dt )
		{
			int count = this._waitingRooms.Count;
			for ( int i = 0; i < count; i++ )
			{
				WaitingRoom waitingRoom = this._waitingRooms[i];
				waitingRoom.Update( dt );
				if ( waitingRoom.isTimeout || waitingRoom.isAllGCConnected )
				{
					waitingRoom.SetAllGCConnected();
					this.StartBattle( waitingRoom );
					this._waitingRooms.RemoveAt( i );
					--i;
					--count;
					POOL.Push( waitingRoom );
					Logger.Log( $"room:{waitingRoom.id} was destroied" );
				}
			}
		}
	}
}