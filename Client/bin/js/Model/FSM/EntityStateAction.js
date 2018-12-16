define(["require", "exports", "../../RC/FSM/FSMStateAction", "../../Libs/decimal", "../../RC/Utils/Hashtable"], function (require, exports, FSMStateAction_1, decimal_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityStateAction extends FSMStateAction_1.FSMStateAction {
        constructor(state, id, def) {
            super(state);
            this._triggerTime = new decimal_1.default(0);
            this.id = id;
            this._triggerTime = new decimal_1.default(Hashtable_1.Hashtable.GetNumber(def, "trigger_time"));
        }
        Trigger() {
            this.OnTrigger();
        }
        OnTrigger() {
        }
        Exit() {
            this._isTriggered = false;
            super.Exit();
        }
        Update(dt) {
            const time = this.state.time;
            if (time.greaterThanOrEqualTo(this._triggerTime)) {
                this._isTriggered = true;
            }
            if (!this._isTriggered) {
                return;
            }
            super.Update(dt);
        }
    }
    exports.EntityStateAction = EntityStateAction;
});
//# sourceMappingURL=EntityStateAction.js.map