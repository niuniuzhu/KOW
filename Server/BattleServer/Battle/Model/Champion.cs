using BattleServer.Battle.FiniteStateMachine;
using BattleServer.User;
using Core.FMath;
using Core.Misc;
using Google.Protobuf;
using System;
using System.Collections;
using Shared;

namespace BattleServer.Battle.Model
{
	public class Champion : Entity
	{
		public enum Result
		{
			Win,
			Draw,
			Lose
		}

		///<summary>
		/// 队伍
		/// </summary>
		public int team;
		///<summary>
		/// 名字
		/// </summary>
		public string name;
		///<summary>
		/// 当前血量
		/// </summary>
		public int hp;
		///<summary>
		/// 最大血量
		/// </summary>
		public int mhp;
		///<summary>
		/// 当前怒气
		/// </summary>
		public Fix64 mp;
		///<summary>
		/// 最大怒气
		/// </summary>
		public int mmp;
		///<summary>
		/// 怒气恢复值
		/// </summary>
		public int mpRecover;
		///<summary>
		/// 攻击力
		/// </summary>
		public int atk;
		///<summary>
		/// 防御力
		/// </summary>
		public int def;
		///<summary>
		/// 禁止移动
		/// </summary>
		public int disableMove;
		///<summary>
		/// 禁止转身
		/// </summary>
		public int disableTurn;
		///<summary>
		/// 禁止使用技能
		/// </summary>
		public int disableSkill;
		///<summary>
		/// 进制碰撞
		/// </summary>
		public int disableCollision;
		///<summary>
		/// 霸体
		/// </summary>
		public int supperArmor;
		///<summary>
		/// 无敌
		/// </summary>
		public int invulnerAbility;
		///<summary>
		/// 移动方向
		/// </summary>
		public FVec2 moveDirection;
		///<summary>
		/// 相交向量
		/// </summary>
		public FVec2 intersectVector;
		///<summary>
		/// 物理速度
		/// </summary>
		public FVec2 phyxSpeed;
		///<summary>
		/// 当前速率
		/// </summary>
		public Fix64 velocity;
		/// <summary>
		/// 是否已死亡
		/// </summary>
		public bool isDead;

		//临时属性
		public int t_hp_add;
		public int t_mp_add;
		public int t_atk_add;
		public int t_def_add;
		public int t_speed_add;

		public readonly EntityFSM fsm = new EntityFSM();

		public BSUser user { get; internal set; }

		public Result result;
		public uint damage;
		public uint hurt;
		public uint heal;
		public uint occupyTime;
		public uint skill0Used;
		public uint skill1Used;
		public uint skill0Damage;
		public uint skill1Damage;

		public Champion( Battle battle ) : base( battle )
		{
		}

		protected override void LoadDefs()
		{
			this._defs = Defs.GetEntity( this.id );
		}

		protected override void OnInit()
		{
			base.OnInit();

			Hashtable statesDef = this._defs.GetMap( "states" );
			if ( statesDef != null )
			{
				foreach ( DictionaryEntry de in statesDef )
					this.fsm.AddState( new EntityState( Convert.ToInt32( de.Key ), this ) );
			}
		}

		public override void DecodeSnapshot( ulong rid, bool isNew, CodedInputStream reader )
		{
			base.DecodeSnapshot( rid, isNew, reader );
			this.team = reader.ReadInt32();
			this.name = reader.ReadString();
			this.hp = reader.ReadInt32();
			this.mhp = reader.ReadInt32();
			this.mp = ( Fix64 )reader.ReadDouble();
			this.mmp = reader.ReadInt32();
			this.mpRecover = reader.ReadInt32();
			this.atk = reader.ReadInt32();
			this.def = reader.ReadInt32();
			this.disableMove = reader.ReadInt32();
			this.disableTurn = reader.ReadInt32();
			this.disableSkill = reader.ReadInt32();
			this.disableCollision = reader.ReadInt32();
			this.supperArmor = reader.ReadInt32();
			this.invulnerAbility = reader.ReadInt32();
			this.moveDirection = new FVec2( ( Fix64 )reader.ReadDouble(), ( Fix64 )reader.ReadDouble() );
			this.intersectVector = new FVec2( ( Fix64 )reader.ReadDouble(), ( Fix64 )reader.ReadDouble() );
			this.phyxSpeed = new FVec2( ( Fix64 )reader.ReadDouble(), ( Fix64 )reader.ReadDouble() );
			this.velocity = ( Fix64 )reader.ReadDouble();
			this.isDead = reader.ReadBool();
			this.t_hp_add = reader.ReadInt32();
			this.t_mp_add = reader.ReadInt32();
			this.t_atk_add = reader.ReadInt32();
			this.t_def_add = reader.ReadInt32();
			this.t_speed_add = reader.ReadInt32();

			this.fsm.DecodeSnapshot( reader );
			reader.ReadBytes();
		}

		public override string Dump()
		{
			string str = base.Dump();
			str += $"team:{ this.team}\n";
			str += $"name:{ this.name}\n";
			str += $"moveDirection:{ this.moveDirection}\n";
			str += $"phyxSpeed:{ this.phyxSpeed}\n";
			str += $"intersectVector:{ this.intersectVector}\n";
			str += $"velocity:{ this.velocity}\n";
			return str;
		}
	}
}