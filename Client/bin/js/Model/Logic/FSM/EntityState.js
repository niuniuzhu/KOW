define(["require", "exports", "../../../Libs/decimal", "../../../RC/FSM/FSMState", "../../../RC/Utils/Hashtable", "../../EventTree/EventTreeBase"], function (require, exports, decimal_1, FSMState_1, Hashtable_1, EventTreeBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        StateAttr[StateAttr["DisableMove"] = 1] = "DisableMove";
        StateAttr[StateAttr["DisableTurn"] = 2] = "DisableTurn";
        StateAttr[StateAttr["SuperArmor"] = 4] = "SuperArmor";
        StateAttr[StateAttr["Invulnerability"] = 8] = "Invulnerability";
        StateAttr[StateAttr["ClearLastBullets"] = 16] = "ClearLastBullets";
    })(StateAttr || (StateAttr = {}));
    class EntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
            this._defaultConnectState = Type.None;
            this._stateAttr = 0;
            this._duration = new decimal_1.default(0);
            this._rootEvent = new EventTreeBase_1.EventTreeBase();
            this._time = new decimal_1.default(0);
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
                this._def = Hashtable_1.Hashtable.GetMap(Hashtable_1.Hashtable.GetMap(this._owner.def, "states"), this.type.toString());
                const eventDef = Hashtable_1.Hashtable.GetArray(this._def, "events");
                this._rootEvent.Set(eventDef);
            }
            this.HandleAttrs();
            this.HandleEvents();
        }
        OnExit() {
            this._time = new decimal_1.default(0);
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
            const attrs = Hashtable_1.Hashtable.GetArray(this._def, "attrs");
            const ops = Hashtable_1.Hashtable.GetArray(this._def, "ops");
            const values = Hashtable_1.Hashtable.GetArray(this._def, "values");
            const count = attrs.length;
            for (let i = 0; i < count; ++i) {
                this.ActiveAttr(attrs[i], ops[i], new decimal_1.default(values[i]));
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
    exports.EntityState = EntityState;
});
//# sourceMappingURL=EntityState.js.map