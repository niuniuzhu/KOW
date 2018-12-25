import Decimal from "../../Libs/decimal";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { DEFAULT_ATTR_VALUES } from "../Attribute";
import { EntityStateAction } from "./EntityStateAction";
export class ActEntityAttrs extends EntityStateAction {
    OnTrigger() {
        super.OnTrigger();
        const attrs = Hashtable.GetArray(this._def, "attrs");
        const values = Hashtable.GetArray(this._def, "values");
        const count = attrs.length;
        for (let i = 0; i < count; ++i) {
            this.ActiveAttr(attrs[i], new Decimal(values[i]));
        }
    }
    OnExit() {
        this.DeactiveAttrs();
        super.OnExit();
    }
    ActiveAttr(attr, value) {
        const owner = this.state.owner;
        owner.attribute.Set(attr, value);
    }
    DeactiveAttrs() {
        const owner = this.state.owner;
        const attrs = Hashtable.GetArray(this._def, "attrs");
        const count = attrs.length;
        for (let i = 0; i < count; ++i) {
            owner.attribute.Set(attrs[i], DEFAULT_ATTR_VALUES.get(attrs[i]));
        }
    }
}
