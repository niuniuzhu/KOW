define(["require", "exports", "../../../RC/Utils/Hashtable", "../StateEnums"], function (require, exports, Hashtable_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IntrptBase {
        constructor(state, def) {
            this._connectState = StateEnums_1.StateType.Idle;
            this._delay = 0;
            this._isTriggered = false;
            this._state = state;
            this.OnInit(def);
        }
        get id() { return this._id; }
        get time() { return this._state.time; }
        get intrptTime() { return this._state.time - this._delay; }
        EncodeSnapshot(writer) {
            writer.bool(this._isTriggered);
        }
        DecodeSnapshot(reader) {
            this._isTriggered = reader.bool();
        }
        OnInit(def) {
            this._id = Hashtable_1.Hashtable.GetNumber(def, "id");
            this._connectState = Hashtable_1.Hashtable.GetNumber(def, "connect_state");
            this._delay = Hashtable_1.Hashtable.GetNumber(def, "delay");
        }
        Enter() {
            this._isTriggered = false;
            if (this._delay <= 0) {
                this.Trigger();
            }
            this.OnEnter();
        }
        Exit() {
            this.OnExit();
        }
        Update(dt) {
            const time = this._state.time;
            if (!this._isTriggered) {
                if (time >= this._delay) {
                    this.Trigger();
                }
            }
            else {
                this.OnUpdate(dt);
            }
        }
        Trigger() {
            this._isTriggered = true;
            this.OnTrigger();
        }
        OnEnter() {
        }
        OnExit() {
        }
        OnUpdate(dt) {
        }
        OnTrigger() {
        }
        HandleInput(type, press) {
        }
        ChangeState(igroneIntrptList = false, force = false) {
            const state = this._state;
            state.owner.fsm.ChangeState(this._connectState, this, igroneIntrptList, force);
        }
        Dump() {
            let str = "";
            str += `istriggered:${this._isTriggered}\n`;
            return str;
        }
    }
    exports.IntrptBase = IntrptBase;
});
//# sourceMappingURL=IntrptBase.js.map