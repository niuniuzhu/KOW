define(["require", "exports", "../../Libs/decimal", "../../RC/Collections/Set", "../../RC/FSM/FSMState", "../../RC/Utils/Hashtable", "./StateEnums"], function (require, exports, decimal_1, Set_1, FSMState_1, Hashtable_1, StateEnums_1) {
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
            const actionsDef = Hashtable_1.Hashtable.GetMapArray(def, "actions");
            if (actionsDef != null) {
                for (const actionDef of actionsDef) {
                    const type = Hashtable_1.Hashtable.GetNumber(actionDef, "id");
                    const ctr = StateEnums_1.ID_TO_STATE_ACTION.get(type);
                    const action = new ctr(this, type, actionDef);
                    this.AddAction(action);
                }
            }
            const sa = Hashtable_1.Hashtable.GetNumberArray(def, "states_available");
            if (sa != null) {
                this._statesAvailable = new Set_1.default();
                for (const type of sa) {
                    this._statesAvailable.add(type);
                }
            }
        }
        EncodeSnapshot(writer) {
            for (const action of this._actions) {
                action.EncodeSnapshot(writer);
            }
            writer.float(this._time.toNumber());
        }
        DecodeSnapshot(reader) {
            for (const action of this._actions) {
                action.DecodeSnapshot(reader);
            }
            this._time = new decimal_1.default(reader.float());
        }
        OnEnter(param) {
            this._time = new decimal_1.default(0);
        }
        OnUpdate(dt) {
            this._time = decimal_1.default.add(this._time, dt);
        }
        OnStateTimeChanged() {
            for (const action of this._actions) {
                action.OnStateTimeChanged(this._time);
            }
        }
        IsStateAvailable(type) {
            return this._statesAvailable == null || this._statesAvailable.contains(type);
        }
    }
    exports.EntityState = EntityState;
});
//# sourceMappingURL=EntityState.js.map