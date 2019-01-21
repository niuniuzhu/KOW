"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FSMStateAction_1 = require("../../../RC/FSM/FSMStateAction");
const Hashtable_1 = require("../../../RC/Utils/Hashtable");
class VEntityStateAction extends FSMStateAction_1.FSMStateAction {
    constructor(state, type, def) {
        super(state, type);
        this.OnInit(def);
    }
    OnInit(def) {
        this._triggerTime = Hashtable_1.Hashtable.GetNumber(def, "trigger_time");
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
exports.VEntityStateAction = VEntityStateAction;
