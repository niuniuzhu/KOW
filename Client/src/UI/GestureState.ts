import { Joystick } from "./Joystick";
import { Vec2 } from "../RC/Math/Vec2";

export class GestureState {
	private static readonly TIME_TO_SHOW_JOYSTICK: number = 500;

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

	public showDuration: number = 0.2;
	public hideDuration: number = 0.5;

	private readonly _root: fairygui.GComponent;
	private _joystick: Joystick;
	private _active: boolean;
	private _touchID: number = -1;
	private _touchTime: number;
	private _touchPosition: Vec2;

	constructor(root: fairygui.GComponent) {
		this._root = root;

		this._joystick = <Joystick>this._root.getChild("joystick");
		this._joystick.core = this._root.getChild("joystick").asCom.getChild("n1").asCom;
		this._joystick.cen = new Vec2(100, 100);
		this._joystick.radius = 100;
		this._joystick.resetDuration = 60;
		this._joystick.visible = false;
		this._joystick.alpha = 0;
	}

	public Dispose(): void {
		this._joystick.dispose();
		this._joystick = null;
	}

	public OnEnter(): void {
		this._touchID = -1;
		this._root.on(Laya.Event.MOUSE_DOWN, this, this.OnDragStart);
	}

	public OnExit(): void {
		this._active = false;
		this.HideJoystick();
		this._touchID = -1;
		this._root.off(Laya.Event.MOUSE_DOWN, this, this.OnDragStart);
		this._root.off(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
		this._root.off(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
	}

	public OnUpdate(dt: number): void {
		if (!this._active)
			return;
		if (!this._joystick.visible) {
			if (this._touchTime >= GestureState.TIME_TO_SHOW_JOYSTICK) {
				this.ShowJoystick(this._touchPosition);
				this._joystick.Reset();
				return;
			}
			this._touchTime += dt;
		}
	}

	private OnDragStart(e: laya.events.Event): void {
		if (this._touchID != -1 ||
			fairygui.GComponent.cast(e.currentTarget) != this._root)
			return;
		this._touchID = e.touchId;
		this._root.on(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
		this._root.on(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
		this._active = true;
		this._touchTime = 0;
		this._touchPosition = new Vec2(e.stageX, e.stageY);
	}

	private OnDragEnd(e: laya.events.Event): void {
		if (e.touchId == this._touchID) {
			this._touchID = -1;
			this._active = false;
			this.HideJoystick();
			this._root.off(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
			this._root.off(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
		}
	}

	private OnDrag(e: laya.events.Event): void {
		if (e.touchId == this._touchID) {
			this._active = true;
			this.ShowJoystick(this._touchPosition);
			let point = new laya.maths.Point();
			this._joystick.globalToLocal(e.stageX, e.stageY, point);
			this._joystick.touchPosition = new Vec2(point.x, point.y);
		}
	}

	private ShowJoystick(point?: Vec2): void {
		let point2 = new laya.maths.Point();
		this._joystick.parent.globalToLocal(point.x, point.y, point2);
		this._joystick.x = point2.x - this._joystick.width * 0.5;
		this._joystick.y = point2.y - this._joystick.height * 0.5;
		this._joystick.visible = true;
		this._joystick.TweenAlpha(null, 1, this.showDuration);
	}

	private HideJoystick(): void {
		this._joystick.Reset();
		this._joystick.TweenAlpha(null, 0, this.hideDuration, fairygui.tween.EaseType.Linear, this.OnJoystickHideComplete, this);
	}

	private OnJoystickHideComplete(): void {
		this._joystick.visible = false;
	}
}