define(["require", "exports", "../../Libs/decimal", "../../RC/FSM/FSMState", "../../RC/Utils/Hashtable", "./StateEnums"], function (require, exports, decimal_1, FSMState_1, Hashtable_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
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
        Init() {
            const def = Hashtable_1.Hashtable.GetMap(Hashtable_1.Hashtable.GetMap(this._owner.def, "states"), this.type.toString());
            const actionsDef = Hashtable_1.Hashtable.GetArray(def, "actions");
            this.CreateActions(actionsDef);
        }
        OnExit() {
            this._time = new decimal_1.default(0);
        }
        OnUpdate(dt) {
            this._time = this._time.add(dt);
        }
        OnStateTimeChanged() {
        }
        CreateActions(actionsDef) {
            let actionDef;
            for (actionDef of actionsDef) {
                const type = Hashtable_1.Hashtable.GetNumber(actionDef, "type");
                const ctr = StateEnums_1.ID_TO_STATE_ACTION.get(type);
                const action = new ctr(this, actionDef);
                this.AddAction(action);
            }
        }
    }
    exports.EntityState = EntityState;
});
//# sourceMappingURL=EntityState.js.map