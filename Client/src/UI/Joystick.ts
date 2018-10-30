import { Vec2 } from "../RC/Math/Vec2";

export class Joystick extends fairygui.GComponent {
	public radius: number = 100;
	public cen: Vec2 = Vec2.zero;
	public resetDuration: number = 1;
	public set touchPosition(value: Vec2) { this.axis = value.Sub(this.cen); }
	public get axis(): Vec2 { return this._axis; }
	public set axis(value: Vec2) {
		let length = value.Magnitude();
		let normalAxis = length < 0.0001 ? Vec2.zero : value.DivN(length);

		if (this._core != null) {
			let touchAxis = value;
			if (touchAxis.SqrMagnitude() >= this.radius * this.radius)
				touchAxis = normalAxis.MulN(this.radius);

			this._core.x = touchAxis.x + this.cen.x;
			this._core.y = touchAxis.y + this.cen.y;
		}

		if (this._axis == normalAxis)
			return;

		this._axis = normalAxis;

		this.onChanged(this._axis);
	}

	public get worldAxis(): Vec2 {
		let point: laya.maths.Point;
		this.localToGlobal(this._axis.x, this._axis.y, point);
		return new Vec2(point.x, point.y);
	}

	public get sprite(): laya.display.Sprite { return this.displayObject; }

	public onChanged: (vec: Vec2) => void;

	private _core: fairygui.GComponent;
	private _axis: Vec2 = Vec2.zero;
	private readonly _tween: laya.utils.Tween;

	public constructor() {
		super();
		this.draggable = true;
		this._tween = new laya.utils.Tween();
	}

	public constructFromXML(xml: Object): void {
		super.constructFromXML(xml)
		this.cen = new Vec2(this.width * 0.5, this.height * 0.5);
		this.displayObject.on(laya.events.Event.MOUSE_DOWN, this, this.OnPointerDown);
	}

	public dispose(): void {
		this._tween.clear();
		super.dispose();
	}

	public Reset(fadeOut: boolean = false): void {
		if (fadeOut) {
			this._tween.to(this.axis, { x: 0, y: 0 }, this.resetDuration, laya.utils.Ease.quadOut);
		}
		else {
			this.axis = Vec2.zero;
		}
	}

	public SetAxis(position: Vec2): void {
		let point: laya.maths.Point;
		this.globalToLocal(position.x, position.y, point);
		this.touchPosition = new Vec2(point.x, point.y);
	}

	private OnPointerDown(e: laya.events.Event): void {
		this.SetAxis(new Vec2(e.stageX, e.stageY));
	}

	protected OnDrag(e: laya.events.Event): void {
		this.SetAxis(new Vec2(e.stageX, e.stageY));
	}

	protected OnPointerUp(e: laya.events.Event): void {
		this.Reset(true);
	}
}