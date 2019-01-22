import { AbstractAction } from "../../../RC/Framework/Actions/AbstractAction";
import { Hashtable } from "../../../RC/Utils/Hashtable";
export class EntityAction extends AbstractAction {
    get owner() { return this._owner; }
    get time() { return this._time; }
    get intrptTime() { return this._time - this._triggerTime; }
    constructor(owner, type, def) {
        super(type);
        this._owner = owner;
        this.OnInit(def);
    }
    OnInit(def) {
        this._triggerTime = Hashtable.GetNumber(def, "trigger_time");
    }
    OnEnter(param) {
        this._isTriggered = false;
        if (this._triggerTime <= 0) {
            this.Trigger();
        }
    }
    Update(dt) {
        if (!this._isTriggered) {
            if (this._time >= this._triggerTime) {
                this.Trigger();
            }
        }
        else
            super.Update(dt);
        this._time += dt;
    }
    UpdatePhysic(dt) {
        if (!this._isTriggered) {
            return;
        }
        this.OnUpdatePhysic(dt);
    }
    OnUpdatePhysic(dt) {
    }
    Trigger() {
        this._isTriggered = true;
        this.OnTrigger();
    }
    OnTrigger() {
    }
    HandlInput(type, press) {
    }
    EncodeSnapshot(writer) {
        writer.bool(this._isTriggered);
    }
    DecodeSnapshot(reader) {
        this._isTriggered = reader.bool();
    }
    Dump() {
        let str = "";
        str += `istriggered:${this._isTriggered}\n`;
        return str;
    }
}
