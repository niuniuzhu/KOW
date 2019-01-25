import { FMathUtils } from "../../../RC/FMath/FMathUtils";
import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { ActionType } from "../../Defines";
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
        if (this._formula != null) {
            const result = StringUtils.Format(this._formula, "" + this.owner.fsm.context.shakeTime);
            const intrpt = this.owner.fsm.currentEntityState.GetAction(ActionType.Timeup);
            intrpt.duration = FMathUtils.Floor(this._ee.evaluate(result));
        }
    }
}
