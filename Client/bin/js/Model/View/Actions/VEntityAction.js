define(["require", "exports", "../../../RC/Framework/Actions/AbstractAction", "../../../RC/Utils/Hashtable"], function (require, exports, AbstractAction_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntityAction extends AbstractAction_1.AbstractAction {
        get owner() { return this._owner; }
        get time() { return this._time; }
        constructor(owner, type) {
            super(type);
            this._owner = owner;
        }
        Init(def) {
            this.OnInit(def);
        }
        OnInit(def) {
            this._triggerTime = Hashtable_1.Hashtable.GetNumber(def, "trigger_time");
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
    exports.VEntityAction = VEntityAction;
});
//# sourceMappingURL=VEntityAction.js.map