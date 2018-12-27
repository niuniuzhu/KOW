define(["require", "exports", "../../../RC/Utils/Hashtable", "../StateEnums", "./IntrptBase"], function (require, exports, Hashtable_1, StateEnums_1, IntrptBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IntrptTimeup extends IntrptBase_1.IntrptBase {
        constructor(action, def) {
            super(action, def);
            this._duration = Hashtable_1.Hashtable.GetNumber(def, "duration", -1);
        }
        Update(dt) {
            const state = this._action.state;
            if (this._connectState != StateEnums_1.StateType.None &&
                this._duration >= 0 &&
                state.time >= this._duration) {
                this.ChangeState(this._connectState, null, true, true);
            }
        }
    }
    exports.IntrptTimeup = IntrptTimeup;
});
//# sourceMappingURL=IntrptTimeup.js.map