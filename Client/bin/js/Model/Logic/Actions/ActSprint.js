define(["require", "exports", "../../../RC/FMath/FMathUtils", "../../../RC/Utils/ExpressionEvaluator", "../../../RC/Utils/Hashtable", "../../../RC/Utils/TextUtils", "../../Defines", "./ActVelocity"], function (require, exports, FMathUtils_1, ExpressionEvaluator_1, Hashtable_1, TextUtils_1, Defines_1, ActVelocity_1) {
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
            const formula = TextUtils_1.StringUtils.Format(this._formula, "" + this.owner.fsm.context.shakeTime);
            const intrpt = this.owner.fsm.currentEntityState.GetAction(Defines_1.ActionType.Timeup);
            intrpt.duration = FMathUtils_1.FMathUtils.Floor(this._ee.evaluate(formula));
        }
    }
    exports.ActSprint = ActSprint;
});
//# sourceMappingURL=ActSprint.js.map