import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EntityAction } from "./EntityAction";
import { FMathUtils } from "../../../RC/FMath/FMathUtils";
export class ActChangeAttrs extends EntityAction {
    OnInit(def) {
        super.OnInit(def);
        this._attrs = Hashtable.GetNumberArray(def, "attrs");
        this._values = Hashtable.GetNumberArray(def, "values");
    }
    OnTrigger() {
        super.OnTrigger();
        const count = this._attrs.length;
        for (let i = 0; i < count; ++i) {
            this.owner.SetAttr(this._attrs[i], FMathUtils.Add(this.owner.GetAttr(this._attrs[i]), this._values[i]));
        }
    }
    OnExit() {
        this.DeactiveAttrs();
        super.OnExit();
    }
    DeactiveAttrs() {
        const count = this._attrs.length;
        for (let i = 0; i < count; ++i) {
            this.owner.SetAttr(this._attrs[i], FMathUtils.Sub(this.owner.GetAttr(this._attrs[i]), this._values[i]));
        }
    }
}
