using System;
using System.Collections;
using BattleServer.Battle.FiniteStateMachine;
using BattleServer.Battle.Snapshot;
using Core.FiniteStateMachine;
using Core.FMath;
using Core.Misc;
using Shared.Battle;

namespace BattleServer.Battle.Model
{
	public class Entity : ISnapshotable
	{
		public ulong id { get; protected set; }
		public int actorID { get; protected set; }
		public int team { get; protected set; }
		public string name { get; protected set; }

		public FVec2 position;
		public FVec2 direction;

		public readonly Attribute attribute = new Attribute();
		public readonly FSM fsm = new FSM();

		public bool Init( BattleEntry.Player entry )
		{
			this.id = entry.gcNID;
			this.actorID = entry.actorID;
			this.team = entry.team;
			this.name = entry.name;
			if ( !this.LoadDef() )
				return false;
			this.fsm.AddState( new EntityState( ( int ) EntityState.Type.Idle, this ) );
			this.fsm.AddState( new EntityState( ( int ) EntityState.Type.Move, this ) );
			this.fsm.AddState( new EntityState( ( int ) EntityState.Type.Attack, this ) );
			this.fsm.AddState( new EntityState( ( int ) EntityState.Type.Die, this ) );
			this.fsm.ChangeState( ( int ) EntityState.Type.Idle );
			return true;
		}

		public bool LoadDef()
		{
			Hashtable mapDef = Defs.GetEntity( this.actorID );
			if ( mapDef == null )
			{
				Logger.Error( $"invalid actorID:{this.actorID}" );
				return false;
			}
			try
			{
				this.attribute.Set( Attr.MHP, ( Fix64 ) mapDef.GetInt( "mhp" ) );
				this.attribute.Set( Attr.MMP, ( Fix64 ) mapDef.GetInt( "mmp" ) );
				this.attribute.Set( Attr.MOVE_SPEED, ( Fix64 ) mapDef.GetInt( "move_speed" ) );
				this.attribute.Set( Attr.TURN_SPEED, ( Fix64 ) mapDef.GetInt( "turn_speed" ) );
				//todo more....
			}
			catch ( Exception e )
			{
				Logger.Error( $"entity:{this.actorID} load def error:{e}" );
				return false;
			}
			return true;
		}

		public virtual ISnapshotObject MakeSnapshot( object data )
		{
			throw new System.NotImplementedException();
		}
	}
}