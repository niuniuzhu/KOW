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
	public get fsm(): EntityFSM { return this._fsm; }

	/**
	 * 获取当前状态下是否可移动
	 */
	public get canMove(): boolean { return this.attribute.Get(EAttr.S_DISABLE_MOVE) <= 0; }
	/**
	 * 获取当前状态下是否可转身
	 */
	public get canTurn(): boolean { return this.attribute.Get(EAttr.S_DISABLE_TURN) <= 0; }
	/**
	 * 获取当前状态下是否可使用技能
	 */
	public get canUseSkill(): boolean { return this.attribute.Get(EAttr.S_DISABLE_SKILL) <= 0; }
	/**
	 * 获取当前状态下是否霸体
	 */
	public get isSuperArmor(): boolean { return this.attribute.Get(EAttr.S_SUPPER_ARMOR) > 0; }
	/**
	 * 获取当前状态下是否无敌
	 */
	public get isInvulnerability(): boolean { return this.attribute.Get(EAttr.S_INVULNER_ABILITY) > 0; }

	private _team: number;
	private _name: string;
	private _skills: Skill[];
	protected readonly _fsm = new EntityFSM();
	private readonly _moveSpeed: FVec2 = FVec2.zero;

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
		this.attribute.Set(EAttr.RADIUS, Hashtable.GetNumber(this._def, "radius"));
		this.attribute.Set(EAttr.MHP, Hashtable.GetNumber(this._def, "mhp"));
		this.attribute.Set(EAttr.HP, this.attribute.Get(EAttr.MHP));
		this.attribute.Set(EAttr.MMP, Hashtable.GetNumber(this._def, "mmp"));
		this.attribute.Set(EAttr.MP, this.attribute.Get(EAttr.MMP));
		this.attribute.Set(EAttr.MOVE_SPEED, Hashtable.GetNumber(this._def, "move_speed"));

		this._skills = [];
		const skillsDef = Hashtable.GetNumberArray(this._def, "skills");
		if (skillsDef != null) { }
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}

		const statesDef = Hashtable.GetMap(this._def, "states");
		if (statesDef != null) {
			for (const type in statesDef) {
				this._fsm.AddState(new EntityState(Number.parseInt(type), this));
			}
			this._fsm.Init();
			this._fsm.ChangeState(Hashtable.GetNumber(this._def, "default_state"));
		}
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
		writer.double(this._moveSpeed.x).double(this._moveSpeed.y);

		//encode fsmstates
		this._fsm.EncodeSnapshot(writer);
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);

		//decode params
		this._team = reader.int32();
		this._name = reader.string();

		//decode properties
		this._moveSpeed.Set(reader.double(), reader.double());

		//decode fsmstates
		this._fsm.DecodeSnapshot(reader);
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
		writer.double(this._moveSpeed.x).double(this._moveSpeed.y);

		//sync fsmstates
		writer.bool(this._fsm.currentState != null);
		if (this._fsm.currentState != null) {
			writer.int32(this._fsm.currentState.type);
			writer.double((<EntityState>this._fsm.currentState).time);
		}
	}


	public Update(dt: number): void {
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
		const direction = new FVec2(FMathUtils.ToFixed(dx), FMathUtils.ToFixed(dy));
		if (direction.SqrMagnitude() < FMathUtils.EPSILON) {
			this._moveSpeed.Set(0, 0);
		}
		else {
			if (this.canTurn) {
				this.direction.CopyFrom(direction);
			}
			this._moveSpeed.CopyFrom(FVec2.MulN(direction, this.attribute.Get(EAttr.MOVE_SPEED)));
		}
	}

	private MoveStep(dt: number): void {
		if (this._moveSpeed.SqrMagnitude() < FMathUtils.EPSILON) {
			this._fsm.ChangeState(StateType.Idle);
			return;
		}
		if (this.canMove) {
			const moveDelta = FVec2.MulN(this._moveSpeed, FMathUtils.Mul(0.001, dt));
			const pos = FVec2.Add(this.position, moveDelta);
			//限制活动范围
			const radius = this.attribute.Get(EAttr.RADIUS);
			pos.x = FMathUtils.Max(FMathUtils.Add(this._battle.bounds.xMin, radius), pos.x);
			pos.x = FMathUtils.Min(FMathUtils.Sub(this._battle.bounds.xMax, radius), pos.x);
			pos.y = FMathUtils.Max(FMathUtils.Add(this._battle.bounds.yMin, radius), pos.y);
			pos.y = FMathUtils.Min(FMathUtils.Sub(this._battle.bounds.yMax, radius), pos.y);
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

	public Dump(): string {
		let str = super.Dump();
		str += `team:${this._team}\n`;
		str += `name:${this._name}\n`;
		str += `move speed${this._moveSpeed}\n`;
		str += `skill count${this._skills.length}\n`;
		str += this._fsm.Dump();
		return str;
	}
}