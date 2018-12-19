import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { EntityFSM } from "../FSM/EntityFSM";
import { EntityState } from "../FSM/EntityState";
import { StateType } from "../FSM/StateEnums";
import { ISnapshotable } from "../ISnapshotable";
import { Skill } from "../Skill";
import { Attribute, EAttr } from "./Attribute";
import { Battle } from "./Battle";

export class Entity implements ISnapshotable {
	public get type(): EntityType { return EntityType.Undefined; }
	public get id(): Long { return this._id; }
	public get battle(): Battle { return this._battle; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }
	public get def(): Hashtable { return this._def; }
	public get fsm(): EntityFSM { return this._fsm; }
	/**
	 * 获取当前状态下是否可移动
	 */
	public get canMove(): boolean { return this.attribute.Get(EAttr.S_DISABLE_MOVE).lessThanOrEqualTo(FMathUtils.D_ZERO); }
	/**
	 * 获取当前状态下是否可转身
	 */
	public get canTurn(): boolean { return this.attribute.Get(EAttr.S_DISABLE_TURN).lessThanOrEqualTo(FMathUtils.D_ZERO); }
	/**
	 * 获取当前状态下是否可使用技能
	 */
	public get canUseSkill(): boolean { return this.attribute.Get(EAttr.S_DISABLE_SKILL).lessThanOrEqualTo(FMathUtils.D_ZERO); }
	/**
	 * 获取当前状态下是否霸体
	 */
	public get isSuperArmor(): boolean { return this.attribute.Get(EAttr.S_SUPPER_ARMOR).greaterThan(FMathUtils.D_ZERO); }
	/**
	 * 获取当前状态下是否无敌
	 */
	public get isInvulnerability(): boolean { return this.attribute.Get(EAttr.S_INVULNER_ABILITY).greaterThan(FMathUtils.D_ZERO); }

	public readonly attribute: Attribute = new Attribute();
	public position: FVec2 = FVec2.zero;
	public direction: FVec2 = FVec2.zero;

	private _battle: Battle;
	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;
	private _def: Hashtable;
	private readonly _skills: Skill[] = [];

	private _speed: FVec2 = FVec2.zero;

	private readonly _fsm: EntityFSM = new EntityFSM();

	constructor() {
		this._fsm.AddState(new EntityState(StateType.Idle, this));
		this._fsm.AddState(new EntityState(StateType.Move, this));
		this._fsm.AddState(new EntityState(StateType.Attack, this));
		this._fsm.AddState(new EntityState(StateType.Die, this));
	}

	public Init(battle: Battle, id: Long, actorID: number, team: number, name: string): void {
		this._battle = battle;
		this._id = id;
		this._actorID = actorID;
		this._team = team;
		this._name = name;
		this.LoadDef();
		this._fsm.Init();
		this._fsm.ChangeState(StateType.Idle);
	}

	public Dispose(): void {
	}

	private LoadDef(): void {
		this._def = Defs.GetEntity(this.actorID);
		this.attribute.Set(EAttr.RADIUS, new Decimal(Hashtable.GetNumber(this._def, "radius")));
		this.attribute.Set(EAttr.MHP, new Decimal(Hashtable.GetNumber(this._def, "mhp")));
		this.attribute.Set(EAttr.HP, this.attribute.Get(EAttr.MHP));
		this.attribute.Set(EAttr.MMP, new Decimal(Hashtable.GetNumber(this._def, "mmp")));
		this.attribute.Set(EAttr.MP, this.attribute.Get(EAttr.MMP));
		this.attribute.Set(EAttr.MOVE_SPEED, new Decimal(Hashtable.GetNumber(this._def, "move_speed")));
		const skillsDef = Hashtable.GetNumberArray(this._def, "skills");
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}
	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		//encode properties
		writer.int32(this.type);
		writer.uint64(this._id);
		writer.int32(this._actorID);
		writer.int32(this._team);
		writer.string(this._name);
		writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
		writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
		writer.float(this._speed.x.toNumber()).float(this._speed.y.toNumber());

		//encode attributes
		const count = this.attribute.count;
		writer.int32(count);
		this.attribute.Foreach((v, k) => {
			writer.int32(k).float(v.toNumber());
		});

		//encode skills
		writer.int32(this._skills.length);
		for (const skill of this._skills) {
			writer.int32(skill.id);
		}

		//encode fsmstates
		this._fsm.EncodeSnapshot(writer);
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		//decode properties
		this._actorID = reader.int32();
		this._team = reader.int32();
		this._name = reader.string();
		this.position = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this.direction = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
		this._speed = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));

		//decode attributes
		let count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), new Decimal(reader.float()));
		}

		//decode skills
		count = reader.int32();
		for (let i = 0; i < count; ++i) {
			const skill = new Skill();
			skill.Init(reader.int32());
			this._skills.push(skill);
		}

		//decode fsmstates
		this._fsm.DecodeSnapshot(reader);
	}

	/**
	 * 同步数据编码
	 */
	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		//sync properties
		writer.int32(this.type);
		writer.uint64(this._id);
		writer.int32(this._actorID);
		writer.int32(this._team);
		writer.string(this._name);
		writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
		writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
		writer.float(this._speed.x.toNumber()).float(this._speed.y.toNumber());

		//sync attributes
		const count = this.attribute.count;
		writer.int32(count);
		this.attribute.Foreach((v, k, map) => {
			writer.int32(k).float(v.toNumber());
		});

		//sync skills
		writer.int32(this._skills.length);
		for (const skill of this._skills) {
			writer.int32(skill.id);
		}

		//sync fsmstates
		writer.int32(this._fsm.currentState.type);
		writer.float((<EntityState>this._fsm.currentState).time.toNumber());
	}


	public Update(dt: Decimal): void {
		this._fsm.Update(dt);
		this.MoveStep(dt);
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

	/**
	 * 开始移动
	 * @param dx x分量
	 * @param dy y分量
	 */
	public BeginMove(dx: number, dy: number): void {
		const direction = new FVec2(new Decimal(dx), new Decimal(dy));
		if (this.canTurn) {
			this.direction = direction;
		}
		this._speed = direction.MulN(this.attribute.Get(EAttr.MOVE_SPEED));
	}

	private MoveStep(dt: Decimal): void {
		if (this._speed.SqrMagnitude().lessThan(FMathUtils.D_SMALL)) {
			this._fsm.ChangeState(StateType.Idle);
			return;
		}
		if (this.canMove) {
			const moveDelta = FVec2.MulN(this._speed, FMathUtils.D_SMALL1.mul(dt));
			const pos = FVec2.Add(this.position, moveDelta);
			//限制活动范围
			const radius = this.attribute.Get(EAttr.RADIUS);
			pos.x = Decimal.max(Decimal.add(this._battle.bounds.xMin, radius), pos.x);
			pos.x = Decimal.min(Decimal.sub(this._battle.bounds.xMax, radius), pos.x);
			pos.y = Decimal.max(Decimal.add(this._battle.bounds.yMin, radius), pos.y);
			pos.y = Decimal.min(Decimal.sub(this._battle.bounds.yMax, radius), pos.y);
			this.position = pos;
			this._fsm.ChangeState(StateType.Move);
		}
	}

	public UseSkill(sid: number): boolean {
		if (!this.canUseSkill)
			return false;
		const skill = this.GetSkill(sid);
		if (skill == null)
			return false;
		if (!this.fsm.HasState(skill.connectedState))
			return false;
		this.fsm.ChangeState(skill.connectedState, skill);
		return true;
	}
}