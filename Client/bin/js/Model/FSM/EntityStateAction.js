define(["require", "exports", "../../RC/FSM/FSMStateAction", "../../RC/Utils/Hashtable"], function (require, exports, FSMStateAction_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityStateAction extends FSMStateAction_1.FSMStateAction {
        constructor(state, type, def) {
            super(state, type);
            this._def = def;
            this._triggerTime = Hashtable_1.Hashtable.GetNumber(this._def, "trigger_time");
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
        OnStateTimeChanged(time) {
        }
        Dump() {
            let str = "";
            str += `istriggered:${this._isTriggered}\n`;
            return str;
        }
    }
    exports.EntityStateAction = EntityStateAction;
});
//# sourceMappingURL=EntityStateAction.js.map