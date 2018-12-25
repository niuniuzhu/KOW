import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityStateAction } from "./EntityStateAction";
export class ActEntityAttrs extends EntityStateAction {
    OnTrigger() {
        super.OnTrigger();
        const attrs = Hashtable.GetArray(this._def, "attrs");
        const values = Hashtable.GetArray(this._def, "values");
        const count = attrs.length;
        for (let i = 0; i < count; ++i) {
            this.ActiveAttr(attrs[i], values[i]);
        }
    }
    OnExit() {
        this.DeactiveAttrs();
        super.OnExit();
    }
    ActiveAttr(attr, value) {
    }
    DeactiveAttrs() {
    }
}
