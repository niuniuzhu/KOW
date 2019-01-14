import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { ActVelocity } from "./ActVelocity";
export class ActSprint extends ActVelocity {
    constructor() {
        super(...arguments);
        this._ee = new ExpressionEvaluator();
    }
    OnInit(def) {
        super.OnInit(def);
        this._formula = Hashtable.GetString(def, "formula", null);
    }
    OnEnter(param) {
        super.OnEnter(param);
        const owner = this.state.owner;
        const lastDuration = owner.fsm.previousEntityState.time;
        const formula = StringUtils.Format(this._formula, "" + lastDuration);
        const intrpt = this.state.GetInterrupt(0);
        intrpt.duration = this._ee.evaluate(formula);
        owner.fsm.context.shakeTime = lastDuration;
    }
}
