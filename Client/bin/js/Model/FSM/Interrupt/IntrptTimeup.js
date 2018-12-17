define(["require", "exports", "../../../Libs/decimal", "../../../RC/Math/MathUtils", "../../../RC/Utils/Hashtable", "../StateEnums", "./IntrptBase"], function (require, exports, decimal_1, MathUtils_1, Hashtable_1, StateEnums_1, IntrptBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IntrptTimeup extends IntrptBase_1.IntrptBase {
        constructor(action, def) {
            super(action, def);
            this._connectState = StateEnums_1.StateType.None;
            this._duration = new decimal_1.default(-1);
            this._connectState = Hashtable_1.Hashtable.GetNumber(def, "connect_state");
            this._duration = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(def, "duration", -1));
        }
        Update(dt) {
            const state = this._action.state;
            if (this._connectState != StateEnums_1.StateType.None &&
                this._duration.greaterThanOrEqualTo(MathUtils_1.MathUtils.D_ZERO) &&
                state.time.greaterThanOrEqualTo(this._duration)) {
                this.ChangeState(this._connectState, null, true, true);
            }
        }
    }
    exports.IntrptTimeup = IntrptTimeup;
});
//# sourceMappingURL=IntrptTimeup.js.map