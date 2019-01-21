"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hashtable_1 = require("../../../../RC/Utils/Hashtable");
const IntrptBase_1 = require("./IntrptBase");
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
