import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { VActEffect } from "./VActEffect";
export class VActShakeEffect extends VActEffect {
    constructor() {
        super(...arguments);
        this._ee = new ExpressionEvaluator();
    }
    OnInit(def) {
        super.OnInit(def);
        this._formula = Hashtable.GetString(def, "formula");
        this._shake = Hashtable.GetBool(def, "shake");
        this._shakeAmplitude = Hashtable.GetNumber(def, "shake_amplitude");
        this._shakeFrequency = Hashtable.GetNumber(def, "shake_frequency");
        this._damping = Hashtable.GetNumber(def, "shake_damping", 1);
        this._shakeDuration = Hashtable.GetNumber(def, "shake_duration", -1);
    }
    OnTrigger() {
        super.OnTrigger();
        if (this._shake) {
            this._shaker = this.owner.Shake(this._shakeAmplitude, this._shakeFrequency, this._damping, this._shakeDuration == -1 ? Number.MAX_VALUE : this._shakeDuration);
        }
    }
    OnEnter(param) {
        super.OnEnter(param);
        this._fx.visible = this.owner.self ? true : false;
    }
    OnExit() {
        this._fx.root.setScale(1, 1);
        if (this._shaker != null) {
            this._shaker.Stop(true);
        }
        super.OnExit();
    }
    OnUpdate(dt) {
        super.OnUpdate(dt);
        if (this._formula != null) {
            const result = StringUtils.Format(this._formula, "" + this.time);
            const distance = this._ee.evaluate(result) * 0.001;
            this._fx.root.scaleY = distance * 0.1;
        }
    }
}
