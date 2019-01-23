import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ActIntrptBase } from "./ActIntrptBase";
export class ActIntrptTimeup extends ActIntrptBase {
    OnInit(def) {
        super.OnInit(def);
        this.duration = Hashtable.GetNumber(def, "duration", -1);
    }
    OnUpdate(dt) {
        if (this.duration >= 0 &&
            this.time >= this.duration &&
            this.CheckFilter()) {
            this.ChangeState();
        }
    }
}
