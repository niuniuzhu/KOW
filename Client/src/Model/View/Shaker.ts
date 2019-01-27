import { MathUtils } from "../../RC/Math/MathUtils";

export class Shaker {
	public onUpdate: (x: number, y: number) => void;
	public onComplete: () => void;

	private _startX: number = 0;
	private _startY: number = 0;
	private _amplitude: number;
	private _frequency: number;
	private _damping: number;
	private _duration: number = 0;
	private _backToPosition: boolean = true;
	private _tmpX: number = 0;
	private _tmpY: number = 0;
	private _targetX: number = 0;
	private _targetY: number = 0;
	private _curX: number = 0;
	private _curY: number = 0;
	private _time: number = 0;
	private _totalTime: number = 0;
	private _state: number = 0;
	private _finished: boolean = false;

	constructor(startX: number, startY: number, amplitude: number, frequency: number,
		damping: number, duration: number, backToPosition: boolean) {
		this._tmpX = this._startX = startX;
		this._tmpY = this._startY = startY;
		this._amplitude = amplitude;
		this._frequency = frequency;
		this._damping = damping;
		this._duration = duration;
		this._backToPosition = backToPosition;
		this.UpdateTarget();
	}

	public Stop(backToPosition: boolean): void {
		if (backToPosition) {
			this._state = 1;
			this._time = 0;
			this._tmpX = this._curX;
			this._tmpY = this._curY;
		}
		else {
			//如果不用回到原位则完成
			if (this.onComplete != null) {
				this.onComplete();
			}
			this._finished = true;
		}
	}

	public Update(dt: number): void {
		if (this._finished) {
			return;
		}
		if (this._state == 0) {
			this.UpdateState0(dt);
		}
		else {
			this.UpdateState1(dt);
		}
	}

	private UpdateState0(dt: number): void {
		const t = MathUtils.Floor(1000 / this._frequency);
		//开始插值
		this._curX = MathUtils.LerpUnclamped(this._tmpX, this._targetX, this._time / t);
		this._curY = MathUtils.LerpUnclamped(this._tmpY, this._targetY, this._time / t);
		this._time += dt;
		this._totalTime += dt;
		//按频率更新目标点
		if (this._time >= t) {
			this._time = 0;
			this._tmpX = this._curX;
			this._tmpY = this._curY;
			this.UpdateTarget();
		}
		if (this.onUpdate != null) {
			this.onUpdate(this._curX, this._curY);
		}
		//判断完成
		if (this._totalTime >= this._duration) {
			this.Stop(this._backToPosition);
		}
	}

	private UpdateState1(dt: number): void {
		const t = MathUtils.Floor(1000 / this._frequency);
		this._curX = MathUtils.LerpUnclamped(this._tmpX, this._startX, this._time / t);
		this._curY = MathUtils.LerpUnclamped(this._tmpY, this._startY, this._time / t);
		this._time += dt;
		if (this.onUpdate != null) {
			this.onUpdate(this._curX, this._curY);
		}
		if (this._time >= t) {
			if (this.onComplete != null) {
				this.onComplete();
			}
			this._state = 0;
			this._finished = true;
		}
	}

	private UpdateTarget(): void {
		//在圆上随机取点
		const angle = Math.random() * MathUtils.PI2;
		this._targetX = this._startX + this._amplitude * MathUtils.Cos(angle);
		this._targetY = this._startY + this._amplitude * MathUtils.Sin(angle);
		this._amplitude *= this._damping;
	}
}