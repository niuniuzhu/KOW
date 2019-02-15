using Google.Protobuf;
using System.Collections.Generic;

namespace BattleServer.Battle.Model
{
	public class Team
	{
		internal int id;
		internal int gladiatorTime;

		private readonly Battle _battle;
		private readonly List<ulong> _champions = new List<ulong>();

		public Team( Battle battle )
		{
			this._battle = battle;
		}

		internal void Dispose()
		{
			this._champions.Clear();
		}

		internal bool AddChampion( Champion champion )
		{
			if ( this._champions.Contains( champion.rid ) )
				return false;
			this._champions.Add( champion.rid );
			return true;
		}

		internal bool RemoveChampion( Champion champion )
		{
			return this._champions.Remove( champion.rid );
		}

		internal Champion GetChampionAt( int index )
		{
			return this._battle.GetChampion( this._champions[index] );
		}

		internal virtual void DecodeSnapshot( int id, CodedInputStream reader )
		{
			this.id = id;
			this.gladiatorTime = reader.ReadInt32();
			this._champions.Clear();
			int count = reader.ReadInt32();
			for ( int i = 0; i < count; i++ )
				this._champions.Add( reader.ReadUInt64() );
		}
	}
}