using Core.Misc;
using System;

namespace CentralServer.Rooms
{
	public class Room : IPoolObject
	{
		private static uint _rid;

		private RoomManager _manager;
		private int _numTeams;
		private int _numUserPerTeam;
		private BattleUser[] _users;

		public readonly uint id;
		public int maxPlayers => this._numTeams * this._numUserPerTeam;
		public int currUserCount { get; private set; }
		public bool isFull => this.currUserCount >= this.maxPlayers;
		public bool isEmpty => this.currUserCount == 0;

		public Room()
		{
			this.id = _rid++;
		}

		public void Init( RoomManager manager )
		{
			this._manager = manager;
		}

		public void Clear()
		{
			this._numTeams = 0;
			this._numUserPerTeam = 0;
			this._users = null;
			this._manager = null;
		}

		internal void Setup( int numTeams, int numUserPerTeam )
		{
			this._numTeams = numTeams;
			this._numUserPerTeam = numUserPerTeam;
			this._users = new BattleUser[numTeams * numUserPerTeam];
		}

		internal bool AddUser( BattleUser user )
		{
			int index = Array.IndexOf( this._users, null );
			if ( index < 0 )
				return false;
			this._users[index] = user;
			++this.currUserCount;
			return true;
		}

		internal bool RemoveUser( BattleUser user )
		{
			int index = Array.IndexOf( this._users, user );
			if ( index < 0 )
				return false;
			this._users[index] = null;
			--this.currUserCount;
			return true;
		}

		internal BattleUserInfo GetBattleUserInfo()
		{
			BattleUserInfo roomInfo = new BattleUserInfo( this._numTeams, this._numUserPerTeam, this._users );
			return roomInfo;
		}
	}
}
