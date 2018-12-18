import Decimal from "../../../Libs/decimal";
import { MathUtils } from "../../../RC/Math/MathUtils";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StateType } from "../StateEnums";
import { IntrptBase } from "./IntrptBase";
export class IntrptTimeup extends IntrptBase {
    constructor(action, def) {
        super(action, def);
        this._connectState = StateType.None;
        this._duration = new Decimal(-1);
        this._connectState = Hashtable.GetNumber(def, "connect_state");
        this._duration = new Decimal(Hashtable.GetNumber(def, "duration", -1));
    }
    EncodeSnapshot(writer) {
        super.EncodeSnapshot(writer);
    }
    DecodeSnapshot(reader) {
        super.DecodeSnapshot(reader);
    }
    Update(dt) {
        const state = this._action.state;
        if (this._connectState != StateType.None &&
            this._duration.greaterThanOrEqualTo(MathUtils.D_ZERO) &&
            state.time.greaterThanOrEqualTo(this._duration)) {
            this.ChangeState(this._connectState, null, true, true);
        }
    }
}
