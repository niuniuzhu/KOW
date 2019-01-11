define(["require", "exports", "../../../../RC/Utils/Hashtable", "./IntrptBase"], function (require, exports, Hashtable_1, IntrptBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IntrptTimeup extends IntrptBase_1.IntrptBase {
        OnInit(def) {
            super.OnInit(def);
            this.duration = Hashtable_1.Hashtable.GetNumber(def, "duration", -1);
        }
        OnUpdate(dt) {
            const state = this._state;
            if (this.duration >= 0 &&
                state.time >= this.duration &&
                this.CheckFilter()) {
                this.ChangeState();
            }
        }
    }
    exports.IntrptTimeup = IntrptTimeup;
});
//# sourceMappingURL=IntrptTimeup.js.map