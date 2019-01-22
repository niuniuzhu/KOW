define(["require", "exports", "../../../RC/Framework/Actions/AbstractAction", "../../../RC/Utils/Hashtable"], function (require, exports, AbstractAction_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntityStateAction extends AbstractAction_1.AbstractAction {
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
});
//# sourceMappingURL=VEntityStateAction.js.map