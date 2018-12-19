import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { StateType } from "../FSM/StateEnums";
import { VEntityState } from "../FSM/VEntityState";
import { Skill } from "../Skill";
import { AnimationProxy } from "./AnimationProxy";
import { VAttribute } from "./VAttribute";
import { VBattle } from "./VBattle";

export class VEntity {
	public get id(): Long { return this._id; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }
	public get def(): Hashtable { return this._def; }
	public get cdef(): Hashtable { return this._cdef; }
	public get root(): fairygui.GComponent { return this._root; }
	public get animationProxy(): AnimationProxy { return this._animationProxy; }

	public readonly attribute: VAttribute = new VAttribute();

	public get position(): Vec2 { return this._position; }
	public set position(value: Vec2) {
		if (this._position.EqualsTo(value))
			return;
		const delta = Vec2.Sub(value, this._position);
		this._position = value;
		this.OnPositionChanged(delta);
	}

	public get rotation(): number { return this._rotation; }
	public set rotation(value: number) {
		if (this._rotation == value)
			return;
		const delta = value - this._rotation;
		this._rotation = value;
		this.OnRatationChanged(delta);
	}

	public get worldPosition(): Vec2 { return this._worldPosition; }

	private _battle: VBattle;
	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;
	private _def: Hashtable;
	private _cdef: Hashtable;
	private readonly _skills: Skill[] = [];

	private _position: Vec2 = Vec2.zero;
	private _worldPosition: Vec2 = Vec2.zero;
	private _rotation: number = 0;
	private _logicPos: Vec2 = Vec2.zero;
	private _logicRot: number = 0;

	private readonly _fsm: FSM = new FSM();
	private readonly _root = new fairygui.GComponent();
	private readonly _animationProxy: AnimationProxy = new AnimationProxy();

	constructor() {
		this._root.setSize(0, 0);
		this._root.setPivot(0.5, 0.5, true);
		Global.graphic.entityRoot.addChild(this._root);
		this._fsm.AddState(new VEntityState(StateType.Idle, this));
		this._fsm.AddState(new VEntityState(StateType.Move, this));
		this._fsm.AddState(new VEntityState(StateType.Attack, this));
		this._fsm.AddState(new VEntityState(StateType.Die, this));
	}

	public Init(id: Long, battle: VBattle): void {
		this._id = id;
		this._battle = battle;
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Update(dt: number): void {
		this.position = Vec2.Lerp(this._position, this._logicPos, 0.012 * dt);
		this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.018);
	}

	private OnPositionChanged(delta: Vec2): void {
		this._root.setXY(this._position.x, this._position.y);
		let point = new Laya.Point();
		this._root.localToGlobal(0, 0, point);
		this._worldPosition.x = point.x;
		this._worldPosition.y = point.y;
	}

	private OnRatationChanged(delta: number): void {
		this._root.rotation = this._rotation;
	}

	/**
	 * 初始化快照
	 */
	public InitSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();

		//加载配置
		this._def = Defs.GetEntity(this._actorID);
		this._cdef = CDefs.GetEntity(this._actorID);

		//加载动画数据
		this._animationProxy.Init(this._actorID, this._cdef);
		this._root.addChild(this._animationProxy);

		//init properties
		this._team = reader.int32();
		this._name = reader.string();
		this.position = new Vec2(reader.float(), reader.float());
		this._logicPos.CopyFrom(this.position);
		const logicDir = new Vec2(reader.float(), reader.float());
		this.rotation = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(Vec2.down)));
		if (logicDir.x < 0)
			this.rotation = 360 - this.rotation;
		this._logicRot = this.rotation;
		const speed = new Vec2(reader.float(), reader.float());

		//init attribues
		let count = reader.int32();
		for (let i = 0; i < count; ++i) {
			this.attribute.Set(reader.int32(), reader.float());
		}

		//init skills
		count = reader.int32();
		for (let i = 0; i < count; ++i) {
			const skill = new Skill();
			skill.Init(reader.int32());
			this._skills.push(skill);
		}

		//init fsmstates
		this._fsm.ChangeState(reader.int32(), null);
		(<VEntityState>this._fsm.currentState).time = reader.float();
	}

	/**
	 * 解码快照
	 */
	public DecodeSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		//read properties
		this._actorID = reader.int32();
		this._team = reader.int32();
		this._name = reader.string();
		this._logicPos = new Vec2(reader.float(), reader.float());
		const logicDir = new Vec2(reader.float(), reader.float());
		this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(Vec2.down)));
		if (logicDir.x < 0)
			this._logicRot = 360 - this._logicRot;
		const speed = new Vec2(reader.float(), reader.float());

		//read attribues
		let count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.float());
		}

		//read skills
		count = reader.int32();
		for (let i = 0; i < count; ++i) {
			reader.int32()
		}

		//read fsmstates
		this._fsm.ChangeState(reader.int32(), null);
		(<VEntityState>this._fsm.currentState).time = reader.float();
	}

	/**
	 * 播放动画
	 * @param name 动画名称
	 * @param timeScale 时间缩放
	 * @param force 是否强制重新播放
	 */
	public PlayAnim(name: string, timeScale: number = 1, force: boolean = false): void {
		this._animationProxy.Play(name, 0, timeScale, force);
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
}