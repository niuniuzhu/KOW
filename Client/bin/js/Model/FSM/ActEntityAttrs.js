define(["require", "exports", "../../RC/Utils/Hashtable", "../Logic/Attribute", "./EntityStateAction"], function (require, exports, Hashtable_1, Attribute_1, EntityStateAction_1) {
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
            const owner = this.state.owner;
            owner.attribute.Set(attr, value);
        }
        DeactiveAttrs() {
            const owner = this.state.owner;
            const attrs = Hashtable_1.Hashtable.GetArray(this._def, "attrs");
            const count = attrs.length;
            for (let i = 0; i < count; ++i) {
                owner.attribute.Set(attrs[i], Attribute_1.DEFAULT_ATTR_VALUES.get(attrs[i]));
            }
        }
    }
    exports.ActEntityAttrs = ActEntityAttrs;
});
//# sourceMappingURL=ActEntityAttrs.js.map