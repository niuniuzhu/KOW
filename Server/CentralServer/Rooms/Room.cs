using CentralServer.User;
using Core.Misc;
using System.Collections.Generic;

namespace CentralServer.Rooms
{
	public class Room : IPoolObject
	{
		private RoomManager _manager;
		private int _numTeams;
		private int _numPlayerPerTeam;
		private readonly List<CSUser> _users = new List<CSUser>();

		public int maxPlayers => this._numTeams * this._numPlayerPerTeam;
		public int numPlayers => this._users.Count;
		public bool isFull => this.numPlayers >= this.maxPlayers;
		public bool isEmpty => this.numPlayers == 0;

		public void Init( RoomManager manager )
		{
			this._manager = manager;
		}

		public void Clear()
		{
			this._numTeams = 0;
			this._numPlayerPerTeam = 0;
			this._users.Clear();
			this._manager = null;
		}

		public void Setup( int numTeams, int numPlayerPerTeam )
		{
			this._numTeams = numTeams;
			this._numPlayerPerTeam = numPlayerPerTeam;
		}

		public bool AddUser( CSUser user )
		{
			if ( this._users.Contains( user ) )
				return false;
			this._users.Add( user );
			return true;
		}

		public bool RemoveUser( CSUser user )
		{
			if ( !this._users.Remove( user ) )
				return false;
			return true;
		}
	}
}
