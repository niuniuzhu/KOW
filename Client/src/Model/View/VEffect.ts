import { Global } from "../../Global";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { AnimationProxy } from "./AnimationProxy";
import { VBattle } from "./VBattle";
import { ModelLayer } from "../../Graphic";

export class VEffect {
	public get id(): number { return this._id; }
	public get lifeTime(): number { return this._lifeTime; }

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
	public markToDestroy: boolean = false;

	private readonly _position: Vec2 = Vec2.zero;
	private readonly _worldPosition: Vec2 = Vec2.zero;
	private _rotation: number = 0;

	private readonly _battle: VBattle;
	private readonly _root = new fairygui.GComponent();

	private _id: number;
	private _effectRootLevel: ModelLayer;
	private _animationID: number;
	private _lifeTime: number;

	private _animationProxy: AnimationProxy = null;
	private _time: number;

	constructor(battle: VBattle, id: number) {
		this._battle = battle;
		this._id = id;
		this.LoadDefs();
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
		const cdefs = CDefs.GetEffect(this._id);
		const modelID = Hashtable.GetNumber(cdefs, "model", -1);
		if (modelID >= 0) {
			this._animationProxy = new AnimationProxy(modelID);
			this._root.addChild(this._animationProxy);
		}
		this._effectRootLevel = Hashtable.GetNumber(cdefs, "model_layer");
		this._animationID = Hashtable.GetNumber(cdefs, "animation");
		const setting = this._animationProxy.GetSetting(this._animationID);
		this._lifeTime = setting.length * setting.interval;
	}

	public Update(dt: number): void {
		if (this._lifeTime >= 0 && this._time >= this._lifeTime) {
			this.markToDestroy = true;
		}
		if (!this.markToDestroy) {
			this._time += dt;
		}
	}

	public OnSpawn(): void {
		this._time = 0;
		this.markToDestroy = false;
		switch (this._effectRootLevel) {
			case ModelLayer.EffectLow:
				Global.graphic.lowEffectRoot.addChild(this._root);
				break;
			case ModelLayer.EffectHigh:
				Global.graphic.highEffectRoot.addChild(this._root);
				break;
		}
		this._animationProxy.Play(this._animationID, 0, 1, true);
	}

	public OnDespawn(): void {
		this._root.removeFromParent();
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
}