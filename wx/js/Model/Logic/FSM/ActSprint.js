"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionEvaluator_1 = require("../../../RC/Utils/ExpressionEvaluator");
const Hashtable_1 = require("../../../RC/Utils/Hashtable");
const TextUtils_1 = require("../../../RC/Utils/TextUtils");
const ActVelocity_1 = require("./ActVelocity");
class ActSprint extends ActVelocity_1.ActVelocity {
    constructor() {
        super(...arguments);
        this._ee = new ExpressionEvaluator_1.ExpressionEvaluator();
    }
    OnInit(def) {
        super.OnInit(def);
        this._formula = Hashtable_1.Hashtable.GetString(def, "formula", null);
    }
    OnEnter(param) {
        super.OnEnter(param);
        const owner = this.state.owner;
        const lastDuration = owner.fsm.previousEntityState.time;
        const formula = TextUtils_1.StringUtils.Format(this._formula, "" + lastDuration);
        const intrpt = this.state.GetInterrupt(0);
        intrpt.duration = this._ee.evaluate(formula);
        owner.fsm.context.shakeTime = lastDuration;
    }
}
exports.ActSprint = ActSprint;
