define(["require", "exports", "../../../RC/Utils/Hashtable"], function (require, exports, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IntrptBase {
        constructor(action, def) {
            this._action = action;
            this.id = Hashtable_1.Hashtable.GetNumber(def, "id");
        }
        Update(dt) {
        }
        ChangeState(type, param = null, igroneIntrptList = false, force = false) {
            const state = this._action.state;
            state.owner.fsm.ChangeState(type, param, igroneIntrptList, force);
        }
    }
    exports.IntrptBase = IntrptBase;
});
//# sourceMappingURL=IntrptBase.js.map