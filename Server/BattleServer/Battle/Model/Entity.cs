using BattleServer.Battle.FiniteStateMachine;
using BattleServer.Battle.Snapshot;
using Core.FiniteStateMachine;
using Core.FMath;
using Core.Misc;
using Shared.Battle;
using System;
using System.Collections;

namespace BattleServer.Battle.Model
{
	public class Entity : ISnapshotable
	{
		public ulong id { get; protected set; }
		public int actorID { get; protected set; }
		public int team { get; protected set; }
		public string name { get; protected set; }

		/// <summary>
		/// 属性管理器
		/// </summary>
		public readonly Attribute attribute = new Attribute();
		/// <summary>
		/// 状态机
		/// </summary>
		public readonly FSM fsm = new FSM();

		public FVec2 position;
		public FVec2 direction;
		
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

		public void Dispose()
		{
			//暂时没有非托管资源
		}

		/// <summary>
		/// 制作快照
		/// </summary>
		public virtual void MakeSnapshot( Google.Protobuf.CodedOutputStream writer )
		{
			writer.WriteUInt64( this.id );
			writer.WriteInt32( this.actorID );
			writer.WriteInt32( this.team );
			writer.WriteString( this.name );
			writer.WriteFloat( ( float ) this.position.x );
			writer.WriteFloat( ( float ) this.position.y );
			writer.WriteFloat( ( float ) this.direction.y );
			writer.WriteFloat( ( float ) this.direction.y );
			writer.WriteInt32( this.fsm.currentState.type );
			writer.WriteInt32( ( ( EntityState ) this.fsm.currentState ).time );
			writer.WriteInt32( this.attribute.count );
			this.attribute.Foreach( ( attr, value ) =>
			{
				writer.WriteInt32( ( int ) attr );
				writer.WriteFloat( ( float ) value );
			} );
		}
	}
}