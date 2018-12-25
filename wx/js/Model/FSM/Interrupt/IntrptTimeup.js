import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StateType } from "../StateEnums";
import { IntrptBase } from "./IntrptBase";
export class IntrptTimeup extends IntrptBase {
    constructor(action, def) {
        super(action, def);
        this._connectState = StateType.None;
        this._connectState = Hashtable.GetNumber(def, "connect_state");
        this._duration = Hashtable.GetNumber(def, "duration", -1);
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
            this._duration >= 0 &&
            state.time >= this._duration) {
            this.ChangeState(this._connectState, null, true, true);
        }
    }
}
