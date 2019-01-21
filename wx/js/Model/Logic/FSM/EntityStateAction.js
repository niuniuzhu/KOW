"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FSMStateAction_1 = require("../../../RC/FSM/FSMStateAction");
const Hashtable_1 = require("../../../RC/Utils/Hashtable");
class EntityStateAction extends FSMStateAction_1.FSMStateAction {
    get time() { return this.state.time; }
    get intrptTime() { return this.state.time - this._triggerTime; }
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
exports.EntityStateAction = EntityStateAction;
