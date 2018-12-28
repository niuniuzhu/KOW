import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StateType } from "../StateEnums";
export class IntrptBase {
    constructor(action, def) {
        this._connectState = StateType.None;
        this._state = action;
        this.id = Hashtable.GetNumber(def, "id");
        this._connectState = Hashtable.GetNumber(def, "connect_state");
    }
    EncodeSnapshot(writer) {
    }
    DecodeSnapshot(reader) {
    }
    Update(dt) {
    }
    HandleInput(type, press) {
    }
    ChangeState(type, param = null, igroneIntrptList = false, force = false) {
        const state = this._state;
        state.owner.fsm.ChangeState(type, param, igroneIntrptList, force);
    }
    Dump() {
        return "";
    }
}
