import { UIBattle } from "./UIBattle";
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
			this._joystick.resetDuration = 0.2;
			this._joystick.onChanged = this.onChanged;
		}
	}

	public onChanged: (vec: Vec2) => void;

	private _joystick: Joystick;
	private _active: boolean;
	private _touchTime: number;
	private _touchPosition: Vec2;
	private readonly _tween: laya.utils.Tween;

	constructor() {
		this._tween = new laya.utils.Tween();
	}

	public Dispose(): void {
		this._joystick.dispose
		this._joystick = null;
	}

	public OnTouchBegin(px: number, py: number): void {
		this._active = true;
		this._touchTime = 0;
		this._touchPosition = new Vec2(px, py);
	}

	public OnTouchEnd(): void {
		this._active = false;
		this.HideJoystick();
	}

	public OnDrag(px: number, py: number): void {
		this._active = true;
		this.ShowJoystick(this._touchPosition);
		let point: laya.maths.Point;
		this._joystick.globalToLocal(px, py, point);
		this._joystick.touchPosition = new Vec2(point.x, point.y);
	}

	private ShowJoystick(point: Vec2): void {
		this._joystick.visible = true;
		let point2: laya.maths.Point;
		this._joystick.parent.globalToLocal(point.x, point.y, point2);
		this._joystick.x = point2.x - this._joystick.width * 0.5;
		this._joystick.y = point2.y - this._joystick.height * 0.5;
		this._tween.to(this._joystick.sprite, { alpha: 1 }, 0.2, laya.utils.Ease.quadOut);
	}

	private HideJoystick(): void {
		this._joystick.Reset(true);
		this._tween.to(this._joystick.sprite, { alpha: 0 }, 0.2, laya.utils.Ease.quadOut, Laya.Handler.create(this, this.OnJoystickHideComplete));
	}

	private OnJoystickHideComplete(): void {
		this._joystick.visible = false;
	}

	public Update(dt: number): void {
		if (!this._active)
			return;

		if (!this._joystick.visible) {
			this._touchTime += dt;
			if (this._touchTime >= GestureState.TIME_TO_SHOW_JOYSTICK) {
				this.ShowJoystick(this._touchPosition);
				this._joystick.Reset();
			}
		}
	}
}