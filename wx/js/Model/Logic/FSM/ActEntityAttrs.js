import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EntityStateAction } from "./EntityStateAction";
export class ActEntityAttrs extends EntityStateAction {
    OnInit(def) {
        super.OnInit(def);
        this._attrs = Hashtable.GetNumberArray(def, "attrs");
        this._values = Hashtable.GetNumberArray(def, "values");
    }
    OnTrigger() {
        super.OnTrigger();
        const count = this._attrs.length;
        for (let i = 0; i < count; ++i) {
            this.ActiveAttr(this._attrs[i], this._values[i]);
        }
    }
    OnExit() {
        this.DeactiveAttrs();
        super.OnExit();
    }
    ActiveAttr(attr, value) {
        const owner = this.state.owner;
        owner.SetAttr(attr, owner.GetAttr(attr) + value);
    }
    DeactiveAttrs() {
        const owner = this.state.owner;
        const count = this._attrs.length;
        for (let i = 0; i < count; ++i) {
            owner.SetAttr(this._attrs[i], owner.GetAttr(this._attrs[i]) - this._values[i]);
        }
    }
}
