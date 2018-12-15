define(["require", "exports", "../../Libs/decimal", "../../RC/Utils/Hashtable", "./EntityStateAction", "./StateEnums"], function (require, exports, decimal_1, Hashtable_1, EntityStateAction_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActEntityAttrs extends EntityStateAction_1.EntityStateAction {
        constructor(state, def) {
            super(state, def);
            this._deltaAttrs = new Map();
            const attrs = Hashtable_1.Hashtable.GetArray(def, "attrs");
            const ops = Hashtable_1.Hashtable.GetArray(def, "ops");
            const values = Hashtable_1.Hashtable.GetArray(def, "values");
            const count = attrs.length;
            for (let i = 0; i < count; ++i) {
                this.ActiveAttr(attrs[i], ops[i], new decimal_1.default(values[i]));
            }
        }
        OnExit() {
            this.DeactiveAttrs();
            this._deltaAttrs.clear();
        }
        ActiveAttr(attr, op, value) {
            const owner = this.state.owner;
            const oldValue = owner.attribute.Get(attr);
            switch (op) {
                case StateEnums_1.StateOp.Equal:
                    owner.attribute.Set(attr, value);
                    break;
                case StateEnums_1.StateOp.Add:
                    owner.attribute.Add(attr, value);
                    break;
                case StateEnums_1.StateOp.Mul:
                    owner.attribute.Mul(attr, value);
                    break;
                case StateEnums_1.StateOp.Mod:
                    owner.attribute.Mod(attr, value);
                    break;
                case StateEnums_1.StateOp.Pow:
                    owner.attribute.Pow(attr, value);
                    break;
                case StateEnums_1.StateOp.Exp:
                    owner.attribute.Exp(attr);
                    break;
            }
            let delta = value.sub(oldValue);
            if (this._deltaAttrs.has(attr))
                delta = delta.add(this._deltaAttrs.get(attr));
            this._deltaAttrs.set(attr, delta);
        }
        DeactiveAttrs() {
            const owner = this.state.owner;
            this._deltaAttrs.forEach((delta, attr, _) => {
                const curValue = owner.attribute.Get(attr);
                owner.attribute.Set(attr, curValue.sub(delta));
            });
        }
    }
    exports.ActEntityAttrs = ActEntityAttrs;
});
//# sourceMappingURL=ActEntityAttrs.js.map