define(["require", "exports", "../../../RC/Utils/Hashtable", "./IntrptBase"], function (require, exports, Hashtable_1, IntrptBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputTriggerType;
    (function (InputTriggerType) {
        InputTriggerType[InputTriggerType["Press"] = 0] = "Press";
        InputTriggerType[InputTriggerType["Release"] = 1] = "Release";
        InputTriggerType[InputTriggerType["Hold"] = 2] = "Hold";
    })(InputTriggerType || (InputTriggerType = {}));
    class IntrpInput extends IntrptBase_1.IntrptBase {
        OnInit(def) {
            super.OnInit(def);
            this._inputTypes = Hashtable_1.Hashtable.GetNumberArray(def, "input_types");
            this._triggerTypes = Hashtable_1.Hashtable.GetNumberArray(def, "trigger_types");
            this._and = Hashtable_1.Hashtable.GetBool(def, "and");
        }
        OnUpdate(dt) {
            for (let i = 0; i < this._inputTypes.length; ++i) {
                const inputType = this._inputTypes[i];
                const triggerType = this._triggerTypes[i];
                if (triggerType != InputTriggerType.Hold)
                    continue;
                const inputAgent = this._state.owner.inputAgent;
                if (inputAgent.GetInputState(inputType)) {
                    this.ChangeState(true, true);
                }
            }
        }
        HandleInput(type, press) {
            let meet = false;
            if (this._and) {
                for (let i = 0; i < this._inputTypes.length; ++i) {
                    const inputType = this._inputTypes[i];
                    const triggerType = this._triggerTypes[i];
                    if (inputType == type) {
                        if (press) {
                            if (triggerType != InputTriggerType.Press) {
                                meet = false;
                            }
                        }
                        else {
                            if (triggerType != InputTriggerType.Release) {
                                meet = false;
                            }
                        }
                        break;
                    }
                }
            }
            else {
                for (let i = 0; i < this._inputTypes.length; ++i) {
                    const type1 = this._inputTypes[i];
                    const press1 = this._triggerTypes[i];
                    if (type1 == type) {
                        if ((press && press1 == InputTriggerType.Press) || (!press && press1 == InputTriggerType.Release)) {
                            meet = true;
                        }
                        break;
                    }
                }
            }
            if (meet) {
                this.ChangeState(true, true);
            }
        }
    }
    exports.IntrpInput = IntrpInput;
});
//# sourceMappingURL=IntrpInput.js.map