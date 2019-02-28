import { Consts } from "../../Consts";
import { Global } from "../../Global";
import { ModelLayer } from "../../Graphic";
import * as $protobuf from "../../Libs/protobufjs";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { AnimationProxy } from "./AnimationProxy";
import { Shaker } from "./Shaker";
import { VBattle } from "./VBattle";

export abstract class VEntity {
	public get rid(): Long { return this._rid; }
	public get id(): number { return this._id; }
	public get battle(): VBattle { return this._battle; }
	public get hudOffsetY(): number { return this._hudOffsetY; }
	public get root(): fairygui.GComponent { return this._root; }
	public get animationProxy(): AnimationProxy { return this._animationProxy; }
	public get markToDestroy(): boolean { return this._markToDestroy; }
	public set markToDestroy(value: boolean) { this._markToDestroy = value; }

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

	public get logicPos(): Vec2 { return this._logicPos.Clone(); }
	public get logicRot(): number { return this._logicRot; }

	public get visible(): boolean { return this._root.visible; }
	public set visible(value: boolean) { this._root.visible = value; }

	private readonly _battle: VBattle;
	private _rid: Long;
	protected _id: number;
	private _modelLevel: ModelLayer;
	private _hudOffsetY: number;
	private _pivot: Vec2;
	private _shaker: Shaker;
	private readonly _root = new fairygui.GComponent();
	private _animationProxy: AnimationProxy = null;

	private readonly _position: Vec2 = Vec2.zero;
	private readonly _worldPosition: Vec2 = Vec2.zero;
	private _rotation: number = 0;
	private _logicPos: Vec2 = Vec2.zero;
	private _logicRot: number = 0;
	private _markToDestroy: boolean;

	constructor(battle: VBattle) {
		this._battle = battle;
		this._root.setSize(0, 0);
		this._root.setPivot(0.5, 0.5, true);
	}

	public Destroy(): void {
		if (this._animationProxy != null) {
			this._animationProxy.dispose();
			this._animationProxy = null;
		}
		this._root.dispose();
	}

	protected LoadDefs(): void {
		const defs = this.LoadDef();
		this.AfterLoadDef(defs);

		const cdefs = this.LoadCDef();

		this._modelLevel = Hashtable.GetNumber(cdefs, "model_layer");
		this._hudOffsetY = Hashtable.GetNumber(cdefs, "hud_offset_y");
		this._pivot = Hashtable.GetVec2(cdefs, "pivot") || new Vec2(0.5, 0.5);
		//加载动画数据
		const modelID = Hashtable.GetNumber(cdefs, "model", -1);
		if (modelID >= 0) {
			this._animationProxy = new AnimationProxy(this, modelID);
			this._animationProxy.setPivot(this._pivot.x, this._pivot.y);
			this._root.addChild(this._animationProxy);
		}

		this.AfterLoadCDef(cdefs);
	}

	protected LoadDef(): Hashtable {
		return null;
	}

	protected AfterLoadDef(defs: Hashtable): void {
	}

	protected LoadCDef(): Hashtable {
		return null;
	}

	protected AfterLoadCDef(cdefs: Hashtable): void {
	}

	protected DisplayRoot(): void {
		switch (this._modelLevel) {
			case ModelLayer.EntityLow:
				Global.graphic.entityLow.addChild(this._root);
				break;
			case ModelLayer.EntityHigh:
				Global.graphic.entityHigh.addChild(this._root);
				break;
			case ModelLayer.EffectLow:
				Global.graphic.lowEffectRoot.addChild(this._root);
				break;
			case ModelLayer.EffectHigh:
				Global.graphic.highEffectRoot.addChild(this._root);
				break;
		}
	}

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

	public Update(dt: number): void {
		this.position = Vec2.Lerp(this._position, this._logicPos, 0.012 * dt);
		this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.015);
		if (this._shaker != null) {
			this._shaker.Update(dt);
		}
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

	public Shake(amplitude: number, frequency: number, damping: number, duration: number): Shaker {
		this._shaker = new Shaker(this._animationProxy.x, this._animationProxy.y, amplitude, frequency,
			damping, duration, true);
		this._shaker.onUpdate = (x, y) => {
			this._animationProxy.x = x;
			this._animationProxy.y = y;
		}
		this._shaker.onComplete = () => this._shaker = null;
		return this._shaker;
	}
}