import { AbstractAction } from "../../../RC/Framework/Actions/AbstractAction";
import { Hashtable } from "../../../RC/Utils/Hashtable";
export class VEntityAction extends AbstractAction {
    get owner() { return this._owner; }
    constructor(owner, type) {
        super(type);
        this._owner = owner;
    }
    Init(def) {
        this.OnInit(def);
    }
    OnInit(def) {
        this._triggerTime = Hashtable.GetNumber(def, "trigger_time");
    }
    OnEnter(param) {
        this._time = 0;
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
    Trigger() {
        this._isTriggered = true;
        this.OnTrigger();
    }
    OnTrigger() {
    }
}
