import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { StateType } from "../Defines";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { Skill } from "../Skill";
import { EAttr } from "./Attribute";
import { Battle } from "./Battle";
import { Entity, EntityInitParams } from "./Entity";
import { FrameAction } from "./FrameAction";
import { EntityFSM } from "./FSM/EntityFSM";
import { EntityState } from "./FSM/EntityState";
import { InputAgent, InputType } from "./InputAagent";
import { IntersectInfo } from "./IntersectInfo";
import { ISnapshotable } from "./ISnapshotable";

export class Champion extends Entity implements ISnapshotable {
	public get type(): EntityType { return EntityType.Champion; }
	public get fsm(): EntityFSM { return this._fsm; }
	public get inputAgent(): InputAgent { return this._inputAgent; }
	public get radius(): number { return this._radius; }
	public get moveSpeed(): number { return this._moveSpeed; }
	public get numSkills(): number { return this._skills.length; }
	public get isInGladiator(): boolean { return FVec2.DistanceSquared(this.position, this._battle.gladiatorPos) <= FMathUtils.Mul(this._battle.gladiatorRadius, this._battle.gladiatorRadius); }

	//static properties
	private readonly _skills: Skill[] = [];
	private readonly _fsm = new EntityFSM();
	private readonly _inputAgent = new InputAgent();
	private _radius: number;
	private _moveSpeed: number;

	//run time properties
	/**
	 * 名字
	 */
	public name: string;
	/**
	 * 队伍
	 */
	public team: number;
	/**
	 * 当前血量
	 */
	public hp: number;
	/**
	 * 最大血量
	 */
	public mhp: number;
	/**
	 * 当前怒气
	 */
	public mp: number;
	/**
	 * 最大怒气
	 */
	public mmp: number;
	/**
	 * 怒气恢复
	 */
	public mpRecover: number;
	/**
	 * 攻击力
	 */
	public atk: number;
	/**
	 * 防御力
	 */
	public def: number;
	/**
	 * 禁止移动
	 */
	public disableMove: number = 0;
	/**
	 * 禁止转身
	 */
	public disableTurn: number = 0;
	/**
	 * 禁止使用技能
	 */
	public disableSkill: number = 0;
	/**
	 * 进制碰撞
	 */
	public disableCollision: number = 0;
	/**
	 * 霸体
	 */
	public supperArmor: number = 0;
	/**
	 * 无敌
	 */
	public invulnerAbility: number = 0;
	/**
	 * 移动方向
	 */
	public readonly moveDirection: FVec2 = FVec2.zero;
	/**
	 * 相交向量
	 */
	public readonly intersectVector: FVec2 = FVec2.zero;
	/**
	 * 物理速度
	 */
	public readonly phyxSpeed: FVec2 = FVec2.zero;
	/**
	 * 当前速率
	 */
	public velocity: number;
	/**
	 * 是否已死亡
	 */
	public isDead: boolean;

	//临时属性
	public t_hp_add: number = 0;
	public t_mp_add: number = 0;
	public t_atk_add: number = 0;
	public t_def_add: number = 0;
	public t_speed_add: number = 0;

	/**
	 * 当前帧下相交信息缓存
	 */
	private readonly _intersectionCache: IntersectInfo[] = [];

	public get intersectionCache(): IntersectInfo[] { return this._intersectionCache; }

	constructor(battle: Battle) {
		super(battle);
		this._inputAgent.handler = this.HandleInput.bind(this);
	}

	public Init(params: EntityInitParams): void {
		super.Init(params);
		this.team = params.team;
		this.name = params.name;
	}
	/**
	 * 在初始化或解码快照后执行
	 */
	protected LoadDef(): void {
		const defs = Defs.GetEntity(this._id);
		this._radius = Hashtable.GetNumber(defs, "radius");
		this._moveSpeed = Hashtable.GetNumber(defs, "move_speed");

		const skillsDef = Hashtable.GetNumberArray(defs, "skills");
		if (skillsDef != null) { }
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}

		const statesDef = Hashtable.GetMap(defs, "states");
		if (statesDef != null) {
			for (const type in statesDef) {
				const state = new EntityState(Number.parseInt(type), this);
				state.Init(statesDef[type]);
				this._fsm.AddState(state);
			}
			this._fsm.ChangeState(Hashtable.GetNumber(defs, "default_state"));
		}

		this.hp = this.mhp = Hashtable.GetNumber(defs, "mhp");
		this.mmp = Hashtable.GetNumber(defs, "mmp");
		this.mp = 0;
		this.mpRecover = Hashtable.GetNumber(defs, "mp_recover");
		this.atk = Hashtable.GetNumber(defs, "atk");
		this.def = Hashtable.GetNumber(defs, "def");
	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);

		//encode params
		writer.int32(this.team);
		writer.string(this.name);
		writer.int32(this.hp);
		writer.int32(this.mhp);
		writer.double(this.mp);
		writer.int32(this.mmp);
		writer.int32(this.mpRecover);
		writer.int32(this.atk);
		writer.int32(this.def);
		writer.int32(this.disableMove);
		writer.int32(this.disableTurn);
		writer.int32(this.disableSkill);
		writer.int32(this.disableCollision);
		writer.int32(this.supperArmor);
		writer.int32(this.invulnerAbility);
		writer.double(this.moveDirection.x).double(this.moveDirection.y);
		writer.double(this.intersectVector.x).double(this.intersectVector.y);
		writer.double(this.phyxSpeed.x).double(this.phyxSpeed.y);
		writer.double(this.velocity);
		writer.bool(this.isDead);
		writer.int32(this.t_hp_add);
		writer.int32(this.t_mp_add);
		writer.int32(this.t_atk_add);
		writer.int32(this.t_def_add);
		writer.int32(this.t_speed_add);

		//encode fsmstates
		this._fsm.EncodeSnapshot(writer);

		//encode input
		writer.fork();
		this._inputAgent.EncodeSnapshot(writer);
		writer.ldelim();
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);

		//decode params
		this.team = reader.int32();
		this.name = reader.string();
		this.hp = reader.int32();
		this.mhp = reader.int32();
		this.mp = reader.double();
		this.mmp = reader.int32();
		this.mpRecover = reader.int32();
		this.atk = reader.int32();
		this.def = reader.int32();
		this.disableMove = reader.int32();
		this.disableTurn = reader.int32();
		this.disableSkill = reader.int32();
		this.disableCollision = reader.int32();
		this.supperArmor = reader.int32();
		this.invulnerAbility = reader.int32();
		this.moveDirection.Set(reader.double(), reader.double());
		this.intersectVector.Set(reader.double(), reader.double());
		this.phyxSpeed.Set(reader.double(), reader.double());
		this.velocity = reader.double();
		this.isDead = reader.bool();
		this.t_hp_add = reader.int32();
		this.t_mp_add = reader.int32();
		this.t_atk_add = reader.int32();
		this.t_def_add = reader.int32();
		this.t_speed_add = reader.int32();

		//decode fsmstates
		this._fsm.DecodeSnapshot(reader);

		//decode input
		reader.int32();
		this._inputAgent.DecodeSnapshot(reader);
	}

	/**
	 * 同步数据编码
	 */
	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSync(writer);

		//sync params
		writer.int32(this.team);
		writer.string(this.name);
		writer.int32(this.hp);
		writer.int32(this.mhp);
		writer.double(this.mp);
		writer.int32(this.mmp);
		writer.int32(this.mpRecover);
		writer.int32(this.atk);
		writer.int32(this.def);
		writer.int32(this.disableMove);
		writer.int32(this.disableTurn);
		writer.int32(this.disableSkill);
		writer.int32(this.disableCollision);
		writer.int32(this.supperArmor);
		writer.int32(this.invulnerAbility);
		writer.double(this.moveDirection.x).double(this.moveDirection.y);
		writer.int32(this.t_hp_add);
		writer.int32(this.t_mp_add);
		writer.int32(this.t_atk_add);
		writer.int32(this.t_def_add);
		writer.int32(this.t_speed_add);

		//sync fsmstates
		writer.bool(this._fsm.currentState != null);
		if (this._fsm.currentState != null) {
			writer.int32(this._fsm.currentState.type);
			writer.double((<EntityState>this._fsm.currentState).time);
		}
	}

	/**
	 * 是否存在指定id的技能
	 * @param id 技能id
	 */
	public HasSkill(id: number): boolean {
		for (const skill of this._skills) {
			if (skill.id == id)
				return true;
		}
		return false;
	}

	/**
	 * 获取指定id的技能
	 * @param id 技能id
	 */
	public GetSkill(id: number): Skill {
		for (const skill of this._skills) {
			if (skill.id == id)
				return skill;
		}
		return null;
	}

	/**
	 * 获取指定索引的技能
	 * @param index 索引
	 */
	public GetSkillAt(index: number): Skill {
		return this._skills[index];
	}

	public Update(dt: number): void {
		super.Update(dt);

		//update mp
		let v = FMathUtils.Add(this.mp, FMathUtils.Mul(this.mpRecover, FMathUtils.Mul(0.001, dt)));
		v = FMathUtils.Min(v, this.mmp);
		this.SetAttr(EAttr.MP, v);

		this._intersectionCache.splice(0);

		this._fsm.Update(dt);
	}

	public IntersectionTest(others: Champion[], from: number): void {
		if (this.disableCollision > 0)
			return;
		for (let i = from; i < others.length; ++i) {
			const other = others[i];
			if (other.disableCollision > 0)
				continue;
			//圆圆相交性检测
			const d = FVec2.Sub(this.position, other.position);
			const m = d.SqrMagnitude();
			const r = FMathUtils.Add(this._radius, other._radius);
			if (m >= r * r)
				continue;
			const sqrtM = FMathUtils.Sqrt(m);

			const intersectInfo0 = new IntersectInfo();
			intersectInfo0.rid = other.rid;
			intersectInfo0.distanceVector = d;
			intersectInfo0.tRadius = r;
			intersectInfo0.magnitude = sqrtM == 0 ? FMathUtils.EPSILON : sqrtM;
			this._intersectionCache.push(intersectInfo0);

			const intersectInfo1 = new IntersectInfo();
			intersectInfo1.rid = this.rid;
			intersectInfo1.distanceVector = FVec2.Negate(d);
			intersectInfo1.tRadius = r;
			intersectInfo1.magnitude = sqrtM == 0 ? FMathUtils.EPSILON : sqrtM;
			other._intersectionCache.push(intersectInfo1);
		}
	}

	public UpdatePhysic(dt: number): void {
		this._fsm.UpdatePhysic(dt);
		this.intersectVector.Set(0, 0);
		for (const intersectInfo of this._intersectionCache) {
			//相交深度
			const delta = FMathUtils.Div(intersectInfo.tRadius, intersectInfo.magnitude);
			const direction = intersectInfo.distanceVector.DivN(intersectInfo.magnitude);//归一
			//计算侧向力
			this.intersectVector.Add(FVec2.MulN(direction, delta));
		}
		//限制侧向力
		const sqrMagnitude = this.intersectVector.SqrMagnitude();
		if (sqrMagnitude > FMathUtils.Mul(this._moveSpeed, this._moveSpeed)) {
			this.intersectVector.DivN(FMathUtils.Sqrt(sqrMagnitude))//归一
			this.intersectVector.MulN(this._moveSpeed);
		}
	}

	public AfterUpdate(dt: number): void {
		this.MoveStep(dt);
	}

	private MoveStep(dt: number): void {
		const moveVector = FVec2.zero;
		if (this.disableMove <= 0) {
			moveVector.CopyFrom(this.moveDirection);
		}

		//根据移动方向旋转
		let sqrtDis = moveVector.SqrMagnitude();
		if (sqrtDis >= FMathUtils.EPSILON) {
			if (this.disableTurn <= 0) {
				this.direction.CopyFrom(this.moveDirection);
			}
			moveVector.MulN(this._moveSpeed);
		}

		//合速度
		moveVector.Add(this.intersectVector);
		moveVector.Add(this.phyxSpeed);

		sqrtDis = moveVector.SqrMagnitude();
		if (sqrtDis < FMathUtils.EPSILON) {
			this.velocity = 0;
			return;
		}
		this.velocity = FMathUtils.Sqrt(sqrtDis);
		//查找在dt时间段内最快碰到的实体
		// let time = dt;
		// let touch = null;
		// const others = this._battle.GetChampions();
		// for (const other of others) {
		// 	if (other == this)
		// 		continue;
		// 	const t = Intersection.IntersectsMovingCC(this.position, this.radius, other.position, other.radius, moveVector);
		// 	if (t >= 0 && t < time) {
		// 		time = t;
		// 		touch = other;
		// 	}
		// }
		// const moveDelta = FVec2.MulN(moveVector, FMathUtils.Mul(0.001, time));
		const moveDelta = FVec2.MulN(moveVector, FMathUtils.Mul(0.001, dt));

		const pos = FVec2.Add(this.position, moveDelta);
		//限制活动范围
		pos.x = FMathUtils.Max(this._battle.bounds.xMin, pos.x);
		pos.x = FMathUtils.Min(this._battle.bounds.xMax, pos.x);
		pos.y = FMathUtils.Max(this._battle.bounds.yMin, pos.y);
		pos.y = FMathUtils.Min(this._battle.bounds.yMax, pos.y);
		this.position.CopyFrom(pos);
	}

	public UpdateAfterHit(): void {
		if (this.hp <= 0) {
			this.Die();
		}
	}

	public Die(): void {
		this.isDead = true;
		this._fsm.ChangeState(StateType.Die, null, true, true);
	}

	public UseSkill(sid: number): boolean {
		if (this.disableSkill > 0)
			return false;
		const skill = this.GetSkill(sid);
		if (skill == null || this.mp < skill.mpCost)
			return false;
		if (!this.fsm.HasState(skill.connectState))
			return false;
		this.fsm.ChangeState(skill.connectState);
		return true;
	}

	public FrameAction(frameAction: FrameAction): void {
		this._inputAgent.SetFromFrameAction(frameAction);
	}

	public HandleInput(type: InputType, press: boolean): void {
		this._fsm.HandleInput(type, press);
	}

	public SetAttr(attr: EAttr, value: any): any {
		switch (attr) {
			case EAttr.HP:
				value = FMathUtils.Clamp(value, 0, this.mhp);
				this.hp = value;
				return this.hp;
			case EAttr.MHP:
				value = value < 0 ? 0 : value;
				this.mhp = value;
				return this.mhp;
			case EAttr.MP:
				value = FMathUtils.Clamp(value, 0, this.mmp);
				this.mp = value;
				return this.mp;
			case EAttr.MMP:
				value = value < 0 ? 0 : value;
				this.mmp = value;
				return this.mmp;
			case EAttr.ATK:
				value = value < 0 ? 0 : value;
				this.atk = value;
				return this.atk;
			case EAttr.DEF:
				value = value < 0 ? 0 : value;
				this.def = value;
				return this.def;
			case EAttr.S_DISABLE_MOVE:
				this.disableMove = value;
				return this.disableMove;
			case EAttr.S_DISABLE_TURN:
				this.disableTurn = value;
				return this.disableTurn;
			case EAttr.S_DISABLE_SKILL:
				this.disableSkill = value;
				return this.disableSkill;
			case EAttr.S_DISABLE_COLLISION:
				this.disableCollision = value;
				return this.disableCollision;
			case EAttr.S_SUPPER_ARMOR:
				this.supperArmor = value;
				return this.supperArmor;
			case EAttr.S_INVULNER_ABILITY:
				this.invulnerAbility = value;
				return this.invulnerAbility;
			case EAttr.S_HP_ADD:
				this.t_hp_add = value;
				return this.t_hp_add;
			case EAttr.S_MP_ADD:
				this.t_mp_add = value;
				return this.t_mp_add;
			case EAttr.S_ATK_ADD:
				this.t_atk_add = value;
				return this.t_atk_add;
			case EAttr.S_DEF_ADD:
				this.t_def_add = value;
				return this.t_def_add;
			case EAttr.S_SPEED_ADD:
				this.t_speed_add = value;
				return this.t_speed_add;
		}
	}

	public GetAttr(attr: EAttr): any {
		switch (attr) {
			case EAttr.HP:
				return this.hp;
			case EAttr.MHP:
				return this.mhp;
			case EAttr.MP:
				return this.mp;
			case EAttr.MMP:
				return this.mmp;
			case EAttr.ATK:
				return this.atk;
			case EAttr.DEF:
				return this.def;
			case EAttr.S_DISABLE_MOVE:
				return this.disableMove;
			case EAttr.S_DISABLE_TURN:
				return this.disableTurn;
			case EAttr.S_DISABLE_SKILL:
				return this.disableSkill;
			case EAttr.S_DISABLE_COLLISION:
				return this.disableCollision;
			case EAttr.S_SUPPER_ARMOR:
				return this.supperArmor;
			case EAttr.S_INVULNER_ABILITY:
				return this.invulnerAbility;
			case EAttr.S_HP_ADD:
				return this.t_hp_add;
			case EAttr.S_MP_ADD:
				return this.t_mp_add;
			case EAttr.S_ATK_ADD:
				return this.t_atk_add;
			case EAttr.S_DEF_ADD:
				return this.t_def_add;
			case EAttr.S_SPEED_ADD:
				return this.t_speed_add;
		}
	}

	public Dump(): string {
		let str = super.Dump();
		str += `team:${this.team}\n`;
		str += `name:${this.name}\n`;
		str += `moveDirection:${this.moveDirection.ToString()}\n`;
		str += `phyxSpeed:${this.phyxSpeed.ToString()}\n`;
		str += `velocity:${this.velocity}\n`;
		str += `skill count:${this._skills.length}\n`;
		str += this._fsm.Dump();
		return str;
	}
}