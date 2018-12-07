define(["require", "exports", "../../../Libs/decimal", "../../../RC/FSM/FSMState", "../../../RC/Utils/Hashtable"], function (require, exports, decimal_1, FSMState_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Type;
    (function (Type) {
        Type[Type["Idle"] = 0] = "Idle";
        Type[Type["Move"] = 1] = "Move";
        Type[Type["Attack"] = 2] = "Attack";
        Type[Type["Die"] = 3] = "Die";
    })(Type || (Type = {}));
    var Op;
    (function (Op) {
        Op[Op["Equal"] = 0] = "Equal";
        Op[Op["Add"] = 1] = "Add";
        Op[Op["Mul"] = 2] = "Mul";
        Op[Op["Mod"] = 3] = "Mod";
        Op[Op["Pow"] = 4] = "Pow";
        Op[Op["Exp"] = 5] = "Exp";
    })(Op || (Op = {}));
    class EntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
            this._owner = owner;
        }
        get owner() { return this._owner; }
        OnEnter(param) {
            const def = Hashtable_1.Hashtable.GetMap(Hashtable_1.Hashtable.GetMap(this.owner.def, "states"), this.type.toString());
            const attrs = Hashtable_1.Hashtable.GetArray(def, "attrs");
            const ops = Hashtable_1.Hashtable.GetArray(def, "ops");
            const values = Hashtable_1.Hashtable.GetArray(def, "values");
            const count = attrs.length;
            for (let i = 0; i < count; ++i) {
                this.ActiveAttr(attrs[i], ops[i], new decimal_1.default(values[i]));
            }
            const events = Hashtable_1.Hashtable.GetArray(def, "events");
        }
        ActiveAttr(attr, op, value) {
            switch (op) {
                case Op.Add:
                    this.owner.attribute.Add(attr, value);
                    break;
                case Op.Mul:
                    this.owner.attribute.Mul(attr, value);
                    break;
                case Op.Mod:
                    this.owner.attribute.Mod(attr, value);
                    break;
                case Op.Pow:
                    this.owner.attribute.Pow(attr, value);
                    break;
                case Op.Exp:
                    this.owner.attribute.Exp(attr);
                    break;
            }
        }
        DeactiveAttr(attr, op, value) {
        }
    }
    EntityState.Type = Type;
    EntityState.Op = Op;
    exports.EntityState = EntityState;
});
//# sourceMappingURL=EntityState.js.map