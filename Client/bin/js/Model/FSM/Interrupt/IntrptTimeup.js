define(["require", "exports", "../../../RC/Utils/Hashtable", "./IntrptBase"], function (require, exports, Hashtable_1, IntrptBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IntrptTimeup extends IntrptBase_1.IntrptBase {
        OnInit(def) {
            super.OnInit(def);
            this._duration = Hashtable_1.Hashtable.GetNumber(def, "duration", -1);
        }
        OnUpdate(dt) {
            const state = this._state;
            if (this._duration >= 0 &&
                state.time >= this._duration) {
                this.ChangeState(true, true);
            }
        }
    }
    exports.IntrptTimeup = IntrptTimeup;
});
//# sourceMappingURL=IntrptTimeup.js.map