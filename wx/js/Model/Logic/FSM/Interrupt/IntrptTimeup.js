import { Hashtable } from "../../../../RC/Utils/Hashtable";
import { IntrptBase } from "./IntrptBase";
export class IntrptTimeup extends IntrptBase {
    OnInit(def) {
        super.OnInit(def);
        this.duration = Hashtable.GetNumber(def, "duration", -1);
    }
    OnUpdate(dt) {
        const state = this._state;
        if (this.duration >= 0 &&
            state.time >= this.duration) {
            this.ChangeState();
        }
    }
}
