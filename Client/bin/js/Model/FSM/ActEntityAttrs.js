define(["require", "exports", "../../RC/Utils/Hashtable", "./EntityStateAction"], function (require, exports, Hashtable_1, EntityStateAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActEntityAttrs extends EntityStateAction_1.EntityStateAction {
        OnTrigger() {
            super.OnTrigger();
            const attrs = Hashtable_1.Hashtable.GetArray(this._def, "attrs");
            const values = Hashtable_1.Hashtable.GetArray(this._def, "values");
            const count = attrs.length;
            for (let i = 0; i < count; ++i) {
                this.ActiveAttr(attrs[i], values[i]);
            }
        }
        OnExit() {
            this.DeactiveAttrs();
            super.OnExit();
        }
        ActiveAttr(attr, value) {
        }
        DeactiveAttrs() {
        }
    }
    exports.ActEntityAttrs = ActEntityAttrs;
});
//# sourceMappingURL=ActEntityAttrs.js.map