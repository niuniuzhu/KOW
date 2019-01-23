import { FMathUtils } from "../../../RC/FMath/FMathUtils";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { BulletAction, BulletActionPhase } from "./BulletAction";
var Op;
(function (Op) {
    Op[Op["Equal"] = 0] = "Equal";
    Op[Op["Add"] = 1] = "Add";
    Op[Op["Mul"] = 2] = "Mul";
})(Op || (Op = {}));
export class ActBulletChangeAttrs extends BulletAction {
    OnInit(def) {
        super.OnInit(def);
        this._phase = BulletActionPhase.Collision;
        this._attrs = Hashtable.GetNumberArray(def, "attrs");
        this._values = Hashtable.GetNumberArray(def, "values");
        this._ops = Hashtable.GetNumberArray(def, "ops");
    }
    OnBulletCollision(target) {
        const count = this._attrs.length;
        for (let i = 0; i < count; ++i) {
            switch (this._ops[i]) {
                case Op.Equal:
                    target.SetAttr(this._attrs[i], this._values[i]);
                    break;
                case Op.Add:
                    target.SetAttr(this._attrs[i], FMathUtils.Add(target.GetAttr(this._attrs[i]), this._values[i]));
                    break;
                case Op.Mul:
                    target.SetAttr(this._attrs[i], FMathUtils.Mul(target.GetAttr(this._attrs[i]), this._values[i]));
                    break;
            }
        }
    }
}
