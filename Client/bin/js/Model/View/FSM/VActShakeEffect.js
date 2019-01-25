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
        }
        OnTrigger() {
            super.OnTrigger();
        }
        OnExit() {
            this._fx.root.setScale(1, 1);
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