import Decimal from "../../Libs/decimal";
import { FSMStateAction } from "../../RC/FSM/FSMStateAction";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
export class EntityStateAction extends FSMStateAction {
    constructor(state, type, def) {
        super(state, type);
        this._triggerTime = new Decimal(0);
        this._def = def;
        this._triggerTime = new Decimal(Hashtable.GetNumber(this._def, "trigger_time"));
    }
    EncodeSnapshot(writer) {
        writer.bool(this._isTriggered);
    }
    DecodeSnapshot(reader) {
        this._isTriggered = reader.bool();
    }
    OnEnter(param) {
        this._isTriggered = false;
        if (this._triggerTime.lessThanOrEqualTo(MathUtils.D_ZERO)) {
            this.Trigger();
        }
    }
    Update(dt) {
        const time = this.state.time;
        if (!this._isTriggered) {
            if (time.greaterThanOrEqualTo(this._triggerTime)) {
                this.Trigger();
            }
        }
        else
            super.Update(dt);
    }
    Trigger() {
        this._isTriggered = true;
        this.OnTrigger();
    }
    OnTrigger() {
    }
    OnStateTimeChanged(time) {
    }
}
