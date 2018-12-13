import Decimal from "../../../Libs/decimal";
import { FSMState } from "../../../RC/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EventTreeBase } from "../../EventTree/EventTreeBase";
var Type;
(function (Type) {
    Type[Type["None"] = -1] = "None";
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
var StateAttr;
(function (StateAttr) {
    StateAttr[StateAttr["DisableMove"] = 0] = "DisableMove";
    StateAttr[StateAttr["DisableTurn"] = 1] = "DisableTurn";
    StateAttr[StateAttr["SuperArmor"] = 2] = "SuperArmor";
    StateAttr[StateAttr["Invulnerability"] = 3] = "Invulnerability";
    StateAttr[StateAttr["ClearLastBullets"] = 4] = "ClearLastBullets";
})(StateAttr || (StateAttr = {}));
export class EntityState extends FSMState {
    constructor(type, owner) {
        super(type);
        this._rootEvent = new EventTreeBase();
        this._time = new Decimal(0);
        this._owner = owner;
    }
    get owner() { return this._owner; }
    get time() { return this._time; }
    set time(value) {
        if (this._time.equals(value))
            return;
        this._time = value;
        this.OnStateTimeChanged();
    }
    OnEnter(param) {
        if (this._def == null) {
            this._def = Hashtable.GetMap(Hashtable.GetMap(this._owner.def, "states"), this.type.toString());
            const eventDef = Hashtable.GetArray(this._def, "events");
            this._rootEvent.Set(eventDef);
        }
        this.HandleAttrs();
        this.HandleEvents();
    }
    OnExit() {
        this._time = new Decimal(0);
    }
    OnUpdate(dt) {
        if (this._time.greaterThanOrEqualTo(this._duration)) {
            if (this._defaultConnectState != Type.None) {
                this._owner.fsm.ChangeState(this._defaultConnectState, null, true);
            }
        }
        this._time = this._time.add(dt);
        this._rootEvent.Update(dt);
    }
    OnStateTimeChanged() {
    }
    HandleAttrs() {
        const attrs = Hashtable.GetArray(this._def, "attrs");
        const ops = Hashtable.GetArray(this._def, "ops");
        const values = Hashtable.GetArray(this._def, "values");
        const count = attrs.length;
        for (let i = 0; i < count; ++i) {
            this.ActiveAttr(attrs[i], ops[i], new Decimal(values[i]));
        }
    }
    ActiveAttr(attr, op, value) {
        switch (op) {
            case Op.Equal:
                this.owner.attribute.Set(attr, value);
                break;
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
    HandleEvents() {
    }
}
EntityState.Type = Type;
EntityState.Op = Op;
EntityState.StateAttr = StateAttr;
