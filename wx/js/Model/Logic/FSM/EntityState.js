import Decimal from "../../../Libs/decimal";
import { FSMState } from "../../../RC/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
var Type;
(function (Type) {
    Type[Type["Idle"] = 0] = "Idle";
    Type[Type["Move"] = 1] = "Move";
    Type[Type["Attack"] = 2] = "Attack";
    Type[Type["Die"] = 3] = "Die";
})(Type || (Type = {}));
var Op;
(function (Op) {
    Op[Op["Add"] = 0] = "Add";
    Op[Op["Mul"] = 1] = "Mul";
    Op[Op["Mod"] = 2] = "Mod";
    Op[Op["Pow"] = 3] = "Pow";
    Op[Op["Exp"] = 4] = "Exp";
})(Op || (Op = {}));
export class EntityState extends FSMState {
    constructor(type, owner) {
        super(type);
        this._owner = owner;
    }
    get owner() { return this._owner; }
    OnEnter(param) {
        const def = Hashtable.GetMap(Hashtable.GetMap(this.owner.def, "states"), this.type.toString());
        const attrs = Hashtable.GetArray(def, "attrs");
        const ops = Hashtable.GetArray(def, "ops");
        const values = Hashtable.GetArray(def, "values");
        const count = attrs.length;
        for (let i = 0; i < count; ++i) {
            this.ActiveAttr(attrs[i], ops[i], new Decimal(values[i]));
        }
        const events = Hashtable.GetArray(def, "events");
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
