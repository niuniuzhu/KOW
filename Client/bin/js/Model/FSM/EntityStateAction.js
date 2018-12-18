define(["require", "exports", "../../Libs/decimal", "../../RC/FSM/FSMStateAction", "../../RC/Math/MathUtils", "../../RC/Utils/Hashtable"], function (require, exports, decimal_1, FSMStateAction_1, MathUtils_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityStateAction extends FSMStateAction_1.FSMStateAction {
        constructor(state, type, def) {
            super(state, type);
            this._triggerTime = new decimal_1.default(0);
            this._def = def;
            this._triggerTime = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "trigger_time"));
        }
        EncodeSnapshot(writer) {
            writer.bool(this._isTriggered);
        }
        DecodeSnapshot(reader) {
            this._isTriggered = reader.bool();
        }
        Trigger() {
            this._isTriggered = true;
            this.OnTrigger();
        }
        OnTrigger() {
        }
        OnEnter(param) {
            if (this._triggerTime.lessThanOrEqualTo(MathUtils_1.MathUtils.D_ZERO)) {
                this.Trigger();
            }
        }
        OnExit() {
            this._isTriggered = false;
        }
        Update(dt) {
            const time = this.state.time;
            if (!this._isTriggered) {
                if (time.greaterThanOrEqualTo(this._triggerTime)) {
                    this.Trigger();
                }
            }
            else
                super.Update(dt);
        }
        OnStateTimeChanged(time) {
        }
    }
    exports.EntityStateAction = EntityStateAction;
});
//# sourceMappingURL=EntityStateAction.js.map