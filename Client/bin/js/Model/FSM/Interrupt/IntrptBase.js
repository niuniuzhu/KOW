define(["require", "exports", "../../../RC/Utils/Hashtable", "../StateEnums"], function (require, exports, Hashtable_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IntrptBase {
        constructor(action, def) {
            this._connectState = StateEnums_1.StateType.None;
            this._state = action;
            this.id = Hashtable_1.Hashtable.GetNumber(def, "id");
            this._connectState = Hashtable_1.Hashtable.GetNumber(def, "connect_state");
        }
        EncodeSnapshot(writer) {
        }
        DecodeSnapshot(reader) {
        }
        Update(dt) {
        }
        HandleInput(type, press) {
        }
        ChangeState(type, param = null, igroneIntrptList = false, force = false) {
            const state = this._state;
            state.owner.fsm.ChangeState(type, param, igroneIntrptList, force);
        }
        Dump() {
            return "";
        }
    }
    exports.IntrptBase = IntrptBase;
});
//# sourceMappingURL=IntrptBase.js.map