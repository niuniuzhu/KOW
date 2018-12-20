import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { EntityFSM } from "../FSM/EntityFSM";
import { EntityState } from "../FSM/EntityState";
import { StateType } from "../FSM/StateEnums";
import { ISnapshotable } from "../ISnapshotable";
import { Skill } from "../Skill";
import { EAttr } from "./Attribute";
import { Entity, EntityInitParams } from "./Entity";

export class Champion extends Entity implements ISnapshotable {
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }
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

	private _team: number;
	private _name: string;
	private _skills: Skill[];
	private _moveSpeed: FVec2 = FVec2.zero;

	public Init(params: EntityInitParams): void {
		super.Init(params);
		this._team = params.team;
		this._name = params.name;
	}

	/**
	 * 在初始化或解码快照后执行
	 */
	protected OnInit(): void {
		this._def = Defs.GetEntity(this._id);
		this.attribute.Set(EAttr.RADIUS, new Decimal(Hashtable.GetNumber(this._def, "radius")));
		this.attribute.Set(EAttr.MHP, new Decimal(Hashtable.GetNumber(this._def, "mhp")));
		this.attribute.Set(EAttr.HP, this.attribute.Get(EAttr.MHP));
		this.attribute.Set(EAttr.MMP, new Decimal(Hashtable.GetNumber(this._def, "mmp")));
		this.attribute.Set(EAttr.MP, this.attribute.Get(EAttr.MMP));
		this.attribute.Set(EAttr.MOVE_SPEED, new Decimal(Hashtable.GetNumber(this._def, "move_speed")));

		this._skills = [];
		const skillsDef = Hashtable.GetNumberArray(this._def, "skills");
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}

		this._fsm = new EntityFSM();
		this._fsm.AddState(new EntityState(StateType.Idle, this));
		this._fsm.AddState(new EntityState(StateType.Move, this));
		this._fsm.AddState(new EntityState(StateType.Attack, this));
		this._fsm.AddState(new EntityState(StateType.Die, this));
		this._fsm.Init();
		this._fsm.ChangeState(StateType.Idle);
	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);

		//encode params
		writer.int32(this._team);
		writer.string(this._name);

		//encode properties
		writer.float(this._moveSpeed.x.toNumber()).float(this._moveSpeed.y.toNumber());

		//encode skills
		writer.int32(this._skills.length);
		for (const skill of this._skills) {
			writer.int32(skill.id);
		}
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);

		//decode params
		this._team = reader.int32();
		this._name = reader.string();
		this.OnInit();

		//decode properties
		this._moveSpeed = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));

		//decode skills
		const count = reader.int32();
		for (let i = 0; i < count; ++i) {
			const skill = new Skill();
			skill.Init(reader.int32());
			this._skills.push(skill);
		}
	}

	/**
	 * 同步数据编码
	 */
	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSync(writer);

		//sync params
		writer.int32(this._team);
		writer.string(this._name);

		//sync properties
		writer.float(this._moveSpeed.x.toNumber()).float(this._moveSpeed.y.toNumber());

		//sync skills
		writer.int32(this._skills.length);
		for (const skill of this._skills) {
			writer.int32(skill.id);
		}
	}


	public Update(dt: Decimal): void {
		super.Update(dt);
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
		if (direction.SqrMagnitude().lessThan(FMathUtils.D_SMALL)) {
			this._moveSpeed = FVec2.zero;
		}
		else {
			if (this.canTurn) {
				this.direction.CopyFrom(direction);
			}
			this._moveSpeed = FVec2.MulN(direction, this.attribute.Get(EAttr.MOVE_SPEED));
		}
	}

	private MoveStep(dt: Decimal): void {
		if (this._moveSpeed.SqrMagnitude().lessThan(FMathUtils.D_SMALL)) {
			this._fsm.ChangeState(StateType.Idle);
			return;
		}
		if (this.canMove) {
			const moveDelta = FVec2.MulN(this._moveSpeed, FMathUtils.D_SMALL1.mul(dt));
			const pos = FVec2.Add(this.position, moveDelta);
			//限制活动范围
			const radius = this.attribute.Get(EAttr.RADIUS);
			pos.x = Decimal.max(Decimal.add(this._battle.bounds.xMin, radius), pos.x);
			pos.x = Decimal.min(Decimal.sub(this._battle.bounds.xMax, radius), pos.x);
			pos.y = Decimal.max(Decimal.add(this._battle.bounds.yMin, radius), pos.y);
			pos.y = Decimal.min(Decimal.sub(this._battle.bounds.yMax, radius), pos.y);
			this.position.CopyFrom(pos);
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
		this.fsm.ChangeState(skill.connectedState, [this.rid, skill.id]);
		return true;
	}
}