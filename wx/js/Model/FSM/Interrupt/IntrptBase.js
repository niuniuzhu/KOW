import { Hashtable } from "../../../RC/Utils/Hashtable";
export class IntrptBase {
    constructor(action, def) {
        this._action = action;
        this.id = Hashtable.GetNumber(def, "id");
    }
    EncodeSnapshot(writer) {
    }
    DecodeSnapshot(reader) {
    }
    Update(dt) {
    }
    ChangeState(type, param = null, igroneIntrptList = false, force = false) {
        const state = this._action.state;
        state.owner.fsm.ChangeState(type, param, igroneIntrptList, force);
    }
    Dump() {
        return "";
    }
}
