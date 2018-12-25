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
import { Entity, EntityInitParams } from "./Entity";

export class Champion extends Entity implements ISnapshotable {
	public get fsm(): EntityFSM { return this._fsm; }
	public get radius(): number { return this._radius; }
	public get moveSpeed(): number { return this._moveSpeed; }

	//static properties
	private _radius: number;
	private _moveSpeed: number;
	private _skills: Skill[];
	protected readonly _fsm = new EntityFSM();

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
	 * 当前速率
	 */
	public velocity: number;

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
		this._radius = Hashtable.GetNumber(this._defs, "radius");
		this._moveSpeed = Hashtable.GetNumber(this._defs, "move_speed");

		this._skills = [];
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

		//encode fsmstates
		this._fsm.EncodeSnapshot(writer);
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

		//decode fsmstates
		this._fsm.DecodeSnapshot(reader);
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
			this.moveDirection.Set(0, 0);
		}
		else {
			this.moveDirection.CopyFrom(direction);
		}
	}

	private MoveStep(dt: number): void {
		const moveVector = FVec2.zero;
		if (this.disableMove <= 0) {
			moveVector.CopyFrom(this.moveDirection);
		}

		if (moveVector.x == 0 && moveVector.y == 0) {
			this._fsm.ChangeState(StateType.Idle);
		} else {
			if (this.disableTurn <= 0) {
				this.direction.CopyFrom(this.moveDirection);
			}
			moveVector.MulN(this._moveSpeed);
			this._fsm.ChangeState(StateType.Move);
		}

		moveVector.Add(this.intersectVector);
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
			const deltaFactor = FMathUtils.Mul(this.velocity, 0.15);//因子
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
		this.fsm.ChangeState(skill.connectedState, [this.rid, skill.id]);
		return true;
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