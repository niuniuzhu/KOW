import { Vec2 } from "../RC/Math/Vec2";

export class Joystick extends fairygui.GComponent {
	public radius: number = 100;
	public cen: Vec2 = Vec2.zero;
	public resetDuration: number = 60;
	public set touchPosition(value: Vec2) { this.axis = Vec2.Sub(value, this.cen); }
	public get axis(): Vec2 { return this._axis; }
	public set axis(value: Vec2) {
		const length = value.Magnitude();
		const normalAxis = length < 0.0001 ? Vec2.zero : Vec2.DivN(value, length);
		if (this.core != null) {
			let touchAxis = value;
			if (touchAxis.SqrMagnitude() >= this.radius * this.radius)
				touchAxis = Vec2.MulN(normalAxis, this.radius);

			this.core.x = touchAxis.x + this.cen.x;
			this.core.y = touchAxis.y + this.cen.y;
		}

		if (this._axis == normalAxis)
			return;

		this._axis = normalAxis;

		if (this.onChanged != null)
			this.onChanged(this._axis);
	}

	public get worldAxis(): Vec2 {
		let point = new laya.maths.Point();;
		this.localToGlobal(this._axis.x, this._axis.y, point);
		return new Vec2(point.x, point.y);
	}

	public get sprite(): laya.display.Sprite { return this.displayObject; }

	public onChanged: (vec: Vec2) => void;

	public core: fairygui.GComponent;

	private _axis: Vec2 = Vec2.zero;

	public constructFromXML(xml: Object): void {
		super.constructFromXML(xml)
		this.cen = new Vec2(this.width * 0.5, this.height * 0.5);
	}

	public dispose(): void {
		fairygui.tween.GTween.kill(this, true);
		fairygui.tween.GTween.kill(this._axis, true);
		super.dispose();
	}

	public Reset(fadeOut: boolean = false): void {
		if (fadeOut) {
			fairygui.tween.GTween.to(0, 0, this.resetDuration).setEase(fairygui.tween.EaseType.QuadOut).setTarget(this._axis);
		}
		else {
			this.axis = Vec2.zero;
		}
	}

	public SetAxis(position: Vec2): void {
		let point = new laya.maths.Point();
		this.globalToLocal(position.x, position.y, point);
		this.touchPosition = new Vec2(point.x, point.y);
	}

	public TweenAlpha(from: number, to: number, duration: number, ease?: number, completeHandler?: () => void, caller?: any): void {
		fairygui.tween.GTween.kill(this, true);
		if (from == null || from == undefined) {
			from = this.displayObject.alpha;
		}
		fairygui.tween.GTween.to(from, to, duration).setEase(ease || fairygui.tween.EaseType.Linear).onUpdate(t => {
			this.displayObject.alpha = t.value.x;
		}, this).onComplete(completeHandler, caller).setTarget(this);
	}
}