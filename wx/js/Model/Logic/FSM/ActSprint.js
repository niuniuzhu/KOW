import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { ActVelocity } from "./ActVelocity";
export class ActSprint extends ActVelocity {
    OnInit(def) {
        super.OnInit(def);
        this._formula = Hashtable.GetString(def, "formula");
        this._ee = new ExpressionEvaluator();
    }
    OnEnter(param) {
        super.OnEnter(param);
        const lastDuration = this.state.owner.fsm.previousEntityState.time;
        const formula = StringUtils.Format(this._formula, "" + lastDuration);
        const intrpt = this.state.GetInterrupt(0);
        intrpt.duration = this._ee.evaluate(formula);
    }
}
