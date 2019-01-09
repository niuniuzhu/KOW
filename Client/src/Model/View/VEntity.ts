import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { AnimationProxy } from "./AnimationProxy";
import { VBattle } from "./VBattle";
import { Consts } from "../../Consts";

export abstract class VEntity {
	public get rid(): Long { return this._rid; }
	public get id(): number { return this._id; }
	public get root(): fairygui.GComponent { return this._root; }
	public get animationProxy(): AnimationProxy { return this._animationProxy; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

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

	protected readonly _battle: VBattle;
	protected _rid: Long;
	protected _id: number;

	private readonly _position: Vec2 = Vec2.zero;
	private readonly _worldPosition: Vec2 = Vec2.zero;
	private _rotation: number = 0;
	private _logicPos: Vec2 = Vec2.zero;
	private _logicRot: number = 0;
	private _markToDestroy: boolean;

	private readonly _root = new fairygui.GComponent();
	protected readonly _animationProxy: AnimationProxy = new AnimationProxy();

	constructor(battle: VBattle) {
		this._battle = battle;
		this._root.setSize(0, 0);
		this._root.setPivot(0.5, 0.5, true);
		this._root.addChild(this._animationProxy);
		Global.graphic.entityRoot.addChild(this._root);
	}

	public Destroy(): void {
		this._root.dispose();
	}

	public Update(dt: number): void {
		this.position = Vec2.Lerp(this._position, this._logicPos, 0.012 * dt);
		this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.015);
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

	protected abstract LoadDefs(): void;

	/**
	 * 解码快照
	 */
	public DecodeSync(rid: Long, reader: $protobuf.Reader | $protobuf.BufferReader, isNew: boolean): void {
		//read properties
		this._rid = rid;
		this._id = reader.int32();
		if (isNew) {
			this.LoadDefs();
		}
		this._markToDestroy = reader.bool();

		this._logicPos = new Vec2(reader.double() * Consts.LOGIC_TO_PIXEL_RATIO, reader.double() * Consts.LOGIC_TO_PIXEL_RATIO);
		const logicDir = new Vec2(reader.double(), reader.double());
		this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(Vec2.down)));
		if (logicDir.x < 0) {
			this._logicRot = 360 - this._logicRot;
		}
		if (isNew) {
			this.position = this._logicPos.Clone();
			this.rotation = this._logicRot;
		}
	}
}