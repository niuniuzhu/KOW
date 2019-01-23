define(["require", "exports", "../../../RC/Framework/FSM/FSMState", "../../../RC/Utils/Hashtable", "../../StateEnums"], function (require, exports, FSMState_1, Hashtable_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntityState extends FSMState_1.FSMState {
        get owner() { return this._owner; }
        get time() { return this._time; }
        set time(value) {
            if (this._time == value)
                return;
            this._time = value;
            this.OnStateTimeChanged();
        }
        constructor(type, owner) {
            super(type);
            this._owner = owner;
        }
        Init(def) {
            const actionsDef = Hashtable_1.Hashtable.GetMapArray(def, "actions");
            if (actionsDef != null) {
                for (const actionDef of actionsDef) {
                    const type = Hashtable_1.Hashtable.GetNumber(actionDef, "id");
                    const ctr = StateEnums_1.V_ID_TO_STATE_ACTION.get(type);
                    const action = new ctr(this._owner, type);
                    action.Init(actionDef);
                    this.AddAction(action);
                }
            }
        }
        OnEnter(param) {
            this._time = 0;
        }
        OnUpdate(dt) {
            this._time += dt;
        }
        OnStateTimeChanged() {
        }
    }
    exports.VEntityState = VEntityState;
});
//# sourceMappingURL=VEntityState.js.map