define(["require", "exports", "../../../RC/Utils/ExpressionEvaluator", "../../../RC/Utils/Hashtable", "../../../RC/Utils/TextUtils", "./ActVelocity"], function (require, exports, ExpressionEvaluator_1, Hashtable_1, TextUtils_1, ActVelocity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActSprint extends ActVelocity_1.ActVelocity {
        constructor() {
            super(...arguments);
            this._ee = new ExpressionEvaluator_1.ExpressionEvaluator();
        }
        OnInit(def) {
            super.OnInit(def);
            this._formula = Hashtable_1.Hashtable.GetString(def, "formula", null);
        }
        OnEnter(param) {
            super.OnEnter(param);
            const lastDuration = this.owner.fsm.previousEntityState.time;
            const formula = TextUtils_1.StringUtils.Format(this._formula, "" + lastDuration);
            const intrpt = this.owner.fsm.currentEntityState.GetInterrupt(0);
            intrpt.duration = this._ee.evaluate(formula);
            this.owner.fsm.context.shakeTime = lastDuration;
        }
    }
    exports.ActSprint = ActSprint;
});
//# sourceMappingURL=ActSprint.js.map