define(["require", "exports", "../../../RC/Utils/ExpressionEvaluator", "../../../RC/Utils/Hashtable", "../../../RC/Utils/TextUtils", "./VActEffect"], function (require, exports, ExpressionEvaluator_1, Hashtable_1, TextUtils_1, VActEffect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VActShakeEffect extends VActEffect_1.VActEffect {
        constructor() {
            super(...arguments);
            this._ee = new ExpressionEvaluator_1.ExpressionEvaluator();
        }
        OnInit(def) {
            super.OnInit(def);
            this._formula = Hashtable_1.Hashtable.GetString(def, "formula");
            this._shake = Hashtable_1.Hashtable.GetBool(def, "shake");
            this._shakeAmplitude = Hashtable_1.Hashtable.GetNumber(def, "shake_amplitude");
            this._shakeFrequency = Hashtable_1.Hashtable.GetNumber(def, "shake_frequency");
            this._damping = Hashtable_1.Hashtable.GetNumber(def, "shake_damping", 1);
            this._shakeDuration = Hashtable_1.Hashtable.GetNumber(def, "shake_duration", -1);
        }
        OnTrigger() {
            super.OnTrigger();
            if (this._shake) {
                this._shaker = this.owner.Shake(this._shakeAmplitude, this._shakeFrequency, this._damping, this._shakeDuration == -1 ? Number.MAX_VALUE : this._shakeDuration);
            }
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
                const result = TextUtils_1.StringUtils.Format(this._formula, "" + this.time);
                const distance = this._ee.evaluate(result) * 0.001;
                this._fx.root.scaleY = distance;
            }
        }
    }
    exports.VActShakeEffect = VActShakeEffect;
});
//# sourceMappingURL=VActShakeEffect.js.map