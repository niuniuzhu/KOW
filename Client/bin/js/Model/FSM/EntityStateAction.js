define(["require", "exports", "../../Libs/decimal", "../../RC/FMath/FMathUtils", "../../RC/FSM/FSMStateAction", "../../RC/Utils/Hashtable"], function (require, exports, decimal_1, FMathUtils_1, FSMStateAction_1, Hashtable_1) {
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
        OnEnter(param) {
            this._isTriggered = false;
            if (this._triggerTime.lessThanOrEqualTo(FMathUtils_1.FMathUtils.D_ZERO)) {
                this.Trigger();
            }
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
        Trigger() {
            this._isTriggered = true;
            this.OnTrigger();
        }
        OnTrigger() {
        }
        OnStateTimeChanged(time) {
        }
    }
    exports.EntityStateAction = EntityStateAction;
});
//# sourceMappingURL=EntityStateAction.js.map