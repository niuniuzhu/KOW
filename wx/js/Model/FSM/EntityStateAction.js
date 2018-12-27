import { FSMStateAction } from "../../RC/FSM/FSMStateAction";
import { Hashtable } from "../../RC/Utils/Hashtable";
export class EntityStateAction extends FSMStateAction {
    constructor(state, type, def) {
        super(state, type);
        this._def = def;
        this._triggerTime = Hashtable.GetNumber(this._def, "trigger_time");
    }
    EncodeSnapshot(writer) {
        writer.bool(this._isTriggered);
    }
    DecodeSnapshot(reader) {
        this._isTriggered = reader.bool();
    }
    OnEnter(param) {
        this._isTriggered = false;
        if (this._triggerTime <= 0) {
            this.Trigger();
        }
    }
    Update(dt) {
        const time = this.state.time;
        if (!this._isTriggered) {
            if (time >= this._triggerTime) {
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
    HandlInput(type, press) {
    }
    Dump() {
        let str = "";
        str += `istriggered:${this._isTriggered}\n`;
        return str;
    }
}
