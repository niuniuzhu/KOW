import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { VActEffect } from "./VActEffect";
export class VActShakeEffect extends VActEffect {
    constructor() {
        super(...arguments);
        this._ee = new ExpressionEvaluator();
    }
    OnInit(def) {
        super.OnInit(def);
        this._formula = Hashtable.GetString(def, "formula");
    }
    OnTrigger() {
        super.OnTrigger();
    }
    OnExit() {
        this._fx.root.setScale(1, 1);
        super.OnExit();
    }
    OnUpdate(dt) {
        super.OnUpdate(dt);
        if (this._formula != null) {
            const result = StringUtils.Format(this._formula, "" + this.time);
            const distance = this._ee.evaluate(result) * 0.001;
            this._fx.root.scaleY = distance;
        }
    }
}
