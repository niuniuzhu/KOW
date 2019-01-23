define(["require", "exports", "../../../RC/Utils/Hashtable", "./EntityAction"], function (require, exports, Hashtable_1, EntityAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActEntityAttrs extends EntityAction_1.EntityAction {
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
            this.owner.SetAttr(attr, this.owner.GetAttr(attr) + value);
        }
        DeactiveAttrs() {
            const count = this._attrs.length;
            for (let i = 0; i < count; ++i) {
                this.owner.SetAttr(this._attrs[i], this.owner.GetAttr(this._attrs[i]) - this._values[i]);
            }
        }
    }
    exports.ActEntityAttrs = ActEntityAttrs;
});
//# sourceMappingURL=ActEntityAttrs.js.map