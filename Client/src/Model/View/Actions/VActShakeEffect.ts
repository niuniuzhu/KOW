import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { Shaker } from "../Shaker";
import { VActEffect } from "./VActEffect";

export class VActShakeEffect extends VActEffect {
	private readonly _ee: ExpressionEvaluator = new ExpressionEvaluator();
	private _formula: string;
	private _shake: boolean;
	private _shakeAmplitude: number;
	private _shakeFrequency: number;
	private _damping: number;
	private _shakeDuration: number;
	private _shaker: Shaker;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._formula = Hashtable.GetString(def, "formula");
		this._shake = Hashtable.GetBool(def, "shake");
		this._shakeAmplitude = Hashtable.GetNumber(def, "shake_amplitude");
		this._shakeFrequency = Hashtable.GetNumber(def, "shake_frequency");
		this._damping = Hashtable.GetNumber(def, "shake_damping", 1);
		this._shakeDuration = Hashtable.GetNumber(def, "shake_duration", -1);
	}

	protected OnTrigger(): void {
		super.OnTrigger();
		if (this._shake) {
			this._shaker = this.owner.Shake(this._shakeAmplitude, this._shakeFrequency,
				this._damping, this._shakeDuration == -1 ? Number.MAX_VALUE : this._shakeDuration);
		}
	}

	protected OnExit(): void {
		this._fx.root.setScale(1, 1);
		if (this._shaker != null) {
			this._shaker.Stop(true);
		}
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
		super.OnUpdate(dt);
		if (this._formula != null) {
			//获取上一状态的持续时间
			const result = StringUtils.Format(this._formula, "" + this.time);
			const distance = this._ee.evaluate(result) * 0.001;//s=vt
			this._fx.root.scaleY = distance;
		}
	}
}