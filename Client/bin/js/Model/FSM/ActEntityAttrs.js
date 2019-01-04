define(["require", "exports", "../../RC/Utils/Hashtable", "./EntityStateAction", "../../RC/Utils/Logger"], function (require, exports, Hashtable_1, EntityStateAction_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActEntityAttrs extends EntityStateAction_1.EntityStateAction {
        OnInit(def) {
            super.OnInit(def);
            this._attrs = Hashtable_1.Hashtable.GetNumberArray(def, "attrs");
            this._values = Hashtable_1.Hashtable.GetNumberArray(def, "values");
        }
        OnTrigger() {
            super.OnTrigger();
            const count = this._attrs.length;
            for (let i = 0; i < count; ++i) {
                this.ActiveAttr(this._attrs[i], this._values[i]);
            }
        }
        OnExit() {
            this.DeactiveAttrs();
            super.OnExit();
        }
        ActiveAttr(attr, value) {
            const owner = this.state.owner;
            owner.SetAttr(attr, owner.GetAttr(attr) + value);
            Logger_1.Logger.Log("active");
        }
        DeactiveAttrs() {
            const owner = this.state.owner;
            const count = this._attrs.length;
            for (let i = 0; i < count; ++i) {
                owner.SetAttr(this._attrs[i], owner.GetAttr(this._attrs[i]) - this._values[i]);
            }
            Logger_1.Logger.Log("deactive");
        }
    }
    exports.ActEntityAttrs = ActEntityAttrs;
});
//# sourceMappingURL=ActEntityAttrs.js.map