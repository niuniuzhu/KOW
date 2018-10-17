using System.Collections.Generic;
using Core.Misc;

namespace BattleServer.Battle
{
	public class WaitingRoomMgr
	{
		private static readonly ObjectPool<WaitingRoom> POOL = new ObjectPool<WaitingRoom>();

		private readonly List<WaitingRoom> _waitingRooms = new List<WaitingRoom>();
		private readonly Dictionary<ulong, WaitingRoom> _gcNIDToRoom = new Dictionary<ulong, WaitingRoom>();

		public void CreateWaitingRoom()
		{
			//Protos.CS2BS_BattleInfo
		}
	}
}