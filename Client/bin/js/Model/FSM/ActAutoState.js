define(["require", "exports", "../../Libs/decimal", "../../RC/Math/MathUtils", "./EntityStateAction", "./StateEnums", "../../RC/Utils/Hashtable"], function (require, exports, decimal_1, MathUtils_1, EntityStateAction_1, StateEnums_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActAutoState extends EntityStateAction_1.EntityStateAction {
        constructor(state, def) {
            super(state, def);
            this._defaultConnectState = StateEnums_1.StateType.None;
            this._duration = new decimal_1.default(-1);
            this._defaultConnectState = Hashtable_1.Hashtable.GetNumber(def, "default_state");
            this._duration = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(def, "duration", -1));
        }
        OnUpdate(dt) {
            if (this._duration.greaterThanOrEqualTo(MathUtils_1.MathUtils.D_ZERO) &&
                this.state.time.greaterThanOrEqualTo(this._duration)) {
                if (this._defaultConnectState != StateEnums_1.StateType.None) {
                    this.state.owner.fsm.ChangeState(this._defaultConnectState, null, true);
                }
            }
        }
    }
    exports.ActAutoState = ActAutoState;
});
//# sourceMappingURL=ActAutoState.js.map