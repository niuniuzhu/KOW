import { AbstractAction } from "../../../RC/Framework/Actions/AbstractAction";
import { Hashtable } from "../../../RC/Utils/Hashtable";
export class VEntityStateAction extends AbstractAction {
    constructor(state, type, def) {
        super(state, type);
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
}
