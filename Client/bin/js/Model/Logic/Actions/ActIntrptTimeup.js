define(["require", "exports", "../../../RC/Utils/Hashtable", "./ActIntrptBase"], function (require, exports, Hashtable_1, ActIntrptBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActIntrptTimeup extends ActIntrptBase_1.ActIntrptBase {
        OnInit(def) {
            super.OnInit(def);
            this.duration = Hashtable_1.Hashtable.GetNumber(def, "duration", -1);
        }
        OnUpdate(dt) {
            if (this.duration >= 0 &&
                this.time >= this.duration &&
                this.CheckFilter()) {
                this.ChangeState();
            }
        }
    }
    exports.ActIntrptTimeup = ActIntrptTimeup;
});
//# sourceMappingURL=ActIntrptTimeup.js.map