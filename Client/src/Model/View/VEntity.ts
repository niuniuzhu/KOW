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
import { AnimationProxy } from "./AnimationProxy";
import { VAttribute } from "./VAttribute";
import { VBattle } from "./VBattle";

export abstract class VEntity {
	public get rid(): Long { return this._rid; }
	public get id(): number { return this._id; }
	public get def(): Hashtable { return this._def; }
	public get cdef(): Hashtable { return this._cdef; }
	public get root(): fairygui.GComponent { return this._root; }
	public get animationProxy(): AnimationProxy { return this._animationProxy; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

	public readonly attribute: VAttribute = new VAttribute();

	public get position(): Vec2 { return this._position; }
	public set position(value: Vec2) {
		if (this._position.EqualsTo(value))
			return;
		const delta = Vec2.Sub(value, this._position);
		this._position.CopyFrom(value);
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

	private readonly _battle: VBattle;
	private _rid: Long;
	private _id: number;
	private _def: Hashtable;
	private _cdef: Hashtable;

	private readonly _position: Vec2 = Vec2.zero;
	private readonly _worldPosition: Vec2 = Vec2.zero;
	private _rotation: number = 0;
	private _logicPos: Vec2 = Vec2.zero;
	private _logicRot: number = 0;
	private _markToDestroy: boolean;

	private readonly _fsm: FSM = new FSM();
	private readonly _root = new fairygui.GComponent();
	private readonly _animationProxy: AnimationProxy = new AnimationProxy();

	constructor(battle: VBattle) {
		this._battle = battle;
		this._root.setSize(0, 0);
		this._root.setPivot(0.5, 0.5, true);
		Global.graphic.entityRoot.addChild(this._root);
		this._fsm.AddState(new VEntityState(StateType.Idle, this));
		this._fsm.AddState(new VEntityState(StateType.Move, this));
		this._fsm.AddState(new VEntityState(StateType.Attack, this));
		this._fsm.AddState(new VEntityState(StateType.Die, this));
	}

	public Destroy(): void {
		this._root.dispose();
	}

	public Update(dt: number): void {
		this.position = Vec2.Lerp(this._position, this._logicPos, 0.012 * dt);
		this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.008);
	}

	private OnPositionChanged(delta: Vec2): void {
		this._root.setXY(this._position.x, this._position.y);
		let point = new Laya.Point();
		this._root.localToGlobal(0, 0, point);
		this._worldPosition.Set(point.x, point.y);
	}

	private OnRatationChanged(delta: number): void {
		this._root.rotation = this._rotation;
	}

	/**
	 * 初始化快照
	 */
	public InitSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._rid = <Long>reader.uint64();
		this._id = reader.int32();

		//加载配置
		this._def = Defs.GetEntity(this._id);
		this._cdef = CDefs.GetEntity(this._id);

		//加载动画数据
		this._animationProxy.Init(this._id, this._cdef);
		this._root.addChild(this._animationProxy);

		this._markToDestroy = reader.bool();

		//init properties
		this.position = new Vec2(reader.float(), reader.float());
		this._logicPos.CopyFrom(this.position);
		const logicDir = new Vec2(reader.float(), reader.float());
		this.rotation = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(Vec2.down)));
		if (logicDir.x < 0) {
			this.rotation = 360 - this.rotation;
		}
		this._logicRot = this.rotation;

		//init attribues
		const count = reader.int32();
		for (let i = 0; i < count; ++i) {
			this.attribute.Set(reader.int32(), reader.float());
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
		// this._rid = <Long>reader.uint64();
		this._id = reader.int32();
		this._markToDestroy = reader.bool();

		this._logicPos = new Vec2(reader.float(), reader.float());
		const logicDir = new Vec2(reader.float(), reader.float());
		this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(Vec2.down)));
		if (logicDir.x < 0) {
			this._logicRot = 360 - this._logicRot;
		}

		//read attribues
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.float());
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
}