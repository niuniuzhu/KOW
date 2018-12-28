import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { FrameAction } from "../FrameAction";
import { EntityFSM } from "../FSM/EntityFSM";
import { EntityState } from "../FSM/EntityState";
import { ISnapshotable } from "../ISnapshotable";
import { Skill } from "../Skill";
import { EAttr } from "./Attribute";
import { Battle } from "./Battle";
import { Entity, EntityInitParams } from "./Entity";
import { InputAgent, InputType } from "./InputAagent";

export class Champion extends Entity implements ISnapshotable {
	public get fsm(): EntityFSM { return this._fsm; }
	public get inputAgent(): InputAgent { return this._inputAgent; }
	public get radius(): number { return this._radius; }
	public get moveSpeed(): number { return this._moveSpeed; }
	public get numSkills(): number { return this._skills.length; }

	//static properties
	private _radius: number;
	private _moveSpeed: number;
	private readonly _skills: Skill[] = [];
	private readonly _fsm = new EntityFSM();
	private readonly _inputAgent = new InputAgent();

	//run time properties
	/**
	 * 队伍
	 */
	public team: number;
	/**
	 * 名字
	 */
	public name: string;
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
	public readonly intersectVector: FVec2 = FVec2.zero
	/**
	 * 物理速度
	 */
	public phyxSpeed: FVec2 = FVec2.zero;
	/**
	 * 当前速率
	 */
	public velocity: number;

	//临时属性
	public t_hp_add: number = 0;
	public t_mp_add: number = 0;
	public t_atk_add: number = 0;
	public t_def_add: number = 0;
	public t_speed_add: number = 0;

	constructor(battle: Battle) {
		super(battle);
		this._inputAgent.handler = this.HandleInput.bind(this);
	}

	public Init(params: EntityInitParams): void {
		super.Init(params);
		this.team = params.team;
		this.name = params.name;
	}

	protected LoadDefs(): void {
		this._defs = Defs.GetEntity(this._id);
	}

	/**
	 * 在初始化或解码快照后执行
	 */
	protected OnInit(): void {
		super.OnInit();
		this._radius = Hashtable.GetNumber(this._defs, "radius");
		this._moveSpeed = Hashtable.GetNumber(this._defs, "move_speed");

		const skillsDef = Hashtable.GetNumberArray(this._defs, "skills");
		if (skillsDef != null) { }
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}

		const statesDef = Hashtable.GetMap(this._defs, "states");
		if (statesDef != null) {
			for (const type in statesDef) {
				this._fsm.AddState(new EntityState(Number.parseInt(type), this));
			}
			this._fsm.Init();
			this._fsm.ChangeState(Hashtable.GetNumber(this._defs, "default_state"));
		}

		this.hp = this.mhp = Hashtable.GetNumber(this._defs, "mhp");
		this.mp = this.mmp = Hashtable.GetNumber(this._defs, "mmp");
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
		writer.int32(this.mp);
		writer.int32(this.mmp);
		writer.int32(this.atk);
		writer.int32(this.def);
		writer.int32(this.disableMove);
		writer.int32(this.disableTurn);
		writer.int32(this.disableSkill);
		writer.int32(this.supperArmor);
		writer.int32(this.invulnerAbility);
		writer.double(this.moveDirection.x).double(this.moveDirection.y);
		writer.double(this.intersectVector.x).double(this.intersectVector.y);
		writer.double(this.phyxSpeed.x).double(this.phyxSpeed.y);
		writer.double(this.velocity);
		writer.int32(this.t_hp_add);
		writer.int32(this.t_mp_add);
		writer.int32(this.t_atk_add);
		writer.int32(this.t_def_add);
		writer.int32(this.t_speed_add);

		//encode fsmstates
		this._fsm.EncodeSnapshot(writer);
		this._inputAgent.EncodeSnapshot(writer);
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
		this.mp = reader.int32();
		this.mmp = reader.int32();
		this.atk = reader.int32();
		this.def = reader.int32();
		this.disableMove = reader.int32();
		this.disableTurn = reader.int32();
		this.disableSkill = reader.int32();
		this.supperArmor = reader.int32();
		this.invulnerAbility = reader.int32();
		this.moveDirection.Set(reader.double(), reader.double());
		this.intersectVector.Set(reader.double(), reader.double());
		this.phyxSpeed.Set(reader.double(), reader.double());
		this.velocity = reader.double();
		this.t_hp_add = reader.int32();
		this.t_mp_add = reader.int32();
		this.t_atk_add = reader.int32();
		this.t_def_add = reader.int32();
		this.t_speed_add = reader.int32();

		//decode fsmstates
		this._fsm.DecodeSnapshot(reader);
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
		writer.int32(this.mp);
		writer.int32(this.mmp);
		writer.int32(this.atk);
		writer.int32(this.def);
		writer.int32(this.disableMove);
		writer.int32(this.disableTurn);
		writer.int32(this.disableSkill);
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

	public SetAttr(attr: EAttr, value: any) {
		switch (attr) {
			case EAttr.S_DISABLE_MOVE:
				this.disableMove = value;
				break;
			case EAttr.S_DISABLE_TURN:
				this.disableTurn = value;
				break;
			case EAttr.S_DISABLE_SKILL:
				this.disableSkill = value;
				break;
			case EAttr.S_SUPPER_ARMOR:
				this.supperArmor = value;
				break;
			case EAttr.S_INVULNER_ABILITY:
				this.invulnerAbility = value;
				break;
			case EAttr.S_HP_ADD:
				this.t_hp_add = value;
				break;
			case EAttr.S_MP_ADD:
				this.t_mp_add = value;
				break;
			case EAttr.S_ATK_ADD:
				this.t_atk_add = value;
				break;
			case EAttr.S_DEF_ADD:
				this.t_def_add = value;
				break;
			case EAttr.S_SPEED_ADD:
				this.t_speed_add = value;
				break;
		}
	}

	public GetAttr(attr: EAttr): any {
		switch (attr) {
			case EAttr.S_DISABLE_MOVE:
				return this.disableMove;
			case EAttr.S_DISABLE_TURN:
				return this.disableTurn;
			case EAttr.S_DISABLE_SKILL:
				return this.disableSkill;
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

	private MoveStep(dt: number): void {
		const moveVector = FVec2.zero;
		if (this.disableMove <= 0) {
			moveVector.CopyFrom(this.moveDirection);
		}

		//根据移动方向旋转
		if (moveVector.SqrMagnitude() >= FMathUtils.EPSILON) {
			if (this.disableTurn <= 0) {
				this.direction.CopyFrom(this.moveDirection);
			}
			moveVector.MulN(this._moveSpeed);
		}

		//合速度
		moveVector.Add(this.intersectVector);
		moveVector.Add(this.phyxSpeed);

		const sqrtDis = moveVector.SqrMagnitude();
		if (sqrtDis < FMathUtils.EPSILON) {
			this.velocity = 0;
			return;
		}
		this.velocity = FMathUtils.Sqrt(sqrtDis);
		const moveDelta = FVec2.MulN(moveVector, FMathUtils.Mul(0.001, dt));
		const pos = FVec2.Add(this.position, moveDelta);
		//限制活动范围
		pos.x = FMathUtils.Max(FMathUtils.Add(this._battle.bounds.xMin, this._radius), pos.x);
		pos.x = FMathUtils.Min(FMathUtils.Sub(this._battle.bounds.xMax, this._radius), pos.x);
		pos.y = FMathUtils.Max(FMathUtils.Add(this._battle.bounds.yMin, this._radius), pos.y);
		pos.y = FMathUtils.Min(FMathUtils.Sub(this._battle.bounds.yMax, this._radius), pos.y);
		this.position.CopyFrom(pos);
	}

	public Intersect(others: Champion[]): void {
		this.intersectVector.Set(0, 0);
		//todo 优化搜索范围
		for (const other of others) {
			if (other == this) {
				continue;
			}
			//todo 优化,两两检测完成不再进行检测F
			//圆圆相交性检测
			const d = FVec2.Sub(this.position, other.position);
			const magnitude = d.Magnitude();
			const r = FMathUtils.Add(this._radius, other._radius);
			if (magnitude >= r)
				continue;
			//相交深度
			const delta = r - magnitude;
			const deltaFactor = FMathUtils.Mul(this.velocity, 0.1);//因子
			const direction = d.DivN(magnitude);//归一
			//根据相交深度计算相交向量
			this.intersectVector.Add(FVec2.MulN(direction, FMathUtils.Mul(delta, deltaFactor)));
		}
	}

	public UseSkill(sid: number): boolean {
		if (this.disableSkill > 0)
			return false;
		const skill = this.GetSkill(sid);
		if (skill == null)
			return false;
		if (!this.fsm.HasState(skill.connectedState))
			return false;
		this.fsm.ChangeState(skill.connectedState);
		return true;
	}

	public FrameAction(frameAction: FrameAction): void {
		this._inputAgent.SetFromFrameAction(frameAction);
	}

	public HandleInput(type: InputType, press: boolean): void {
		this._fsm.HandleInput(type, press);
	}

	public Dump(): string {
		let str = super.Dump();
		str += `team:${this.team}\n`;
		str += `name:${this.name}\n`;
		str += `skill count${this._skills.length}\n`;
		str += this._fsm.Dump();
		return str;
	}
}