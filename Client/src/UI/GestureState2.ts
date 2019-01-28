import { Joystick } from "./Joystick";
import { Vec2 } from "../RC/Math/Vec2";

export class GestureState2 {
	public get joystick(): Joystick {
		return this._joystick;
	}

	public set joystick(value: Joystick) {
		if (this._joystick == value)
			return;

		this._joystick = value;
		if (this._joystick != null) {
			this._joystick.touchable = false;
			this._joystick.radius = this._joystick.width * 0.5;
		}
	}

	public set onChanged(value: (vev: Vec2) => void) {
		if (this._joystick != null) {
			this._joystick.onChanged = value;
		}
	}

	public showDuration: number = 20;
	public hideDuration: number = 50;

	private _root: fairygui.GComponent;
	private _joystick: Joystick;
	private _touchID: number = -1;

	constructor(root: fairygui.GComponent) {
		this._root = root;
		this._joystick = <Joystick>root.getChild("joystick");
		this._joystick.core = root.getChild("joystick").asCom.getChild("n1").asCom;
		this._joystick.cen = new Vec2(100, 100);
		this._joystick.radius = 100;
		this._joystick.resetDuration = 60;
		this._joystick.visible = true;
	}

	public Dispose(): void {
		this._joystick.dispose();
		this._joystick = null;
		this._root = null;
	}

	public OnEnter(): void {
		this._touchID = -1;
		this._joystick.on(Laya.Event.MOUSE_DOWN, this, this.OnDragStart);
	}

	public OnExit(): void {
		this._joystick.Reset();
		this._touchID = -1;
		this._joystick.off(Laya.Event.MOUSE_DOWN, this, this.OnDragStart);
		this._root.off(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
		this._root.off(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
	}

	public OnUpdate(dt: number): void {
	}

	private OnDragStart(e: laya.events.Event): void {
		if (this._touchID != -1)
			return;
		this._touchID = e.touchId;
		this._root.on(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
		this._root.on(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
	}

	private OnDragEnd(e: laya.events.Event): void {
		if (e.touchId == this._touchID) {
			this._touchID = -1;
			this._joystick.Reset();
			this._root.off(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
			this._root.off(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
		}
	}

	private OnDrag(e: laya.events.Event): void {
		if (e.touchId == this._touchID) {
			let point = new laya.maths.Point();
			this._joystick.globalToLocal(e.stageX, e.stageY, point);
			this._joystick.touchPosition = new Vec2(point.x, point.y);
		}
	}
}