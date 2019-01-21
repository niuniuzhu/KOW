"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FSMState_1 = require("../../../RC/FSM/FSMState");
const Hashtable_1 = require("../../../RC/Utils/Hashtable");
const StateEnums_1 = require("../../StateEnums");
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
    Init(statesDef) {
        const def = Hashtable_1.Hashtable.GetMap(statesDef, this.type.toString());
        const actionsDef = Hashtable_1.Hashtable.GetMapArray(def, "actions");
        if (actionsDef != null) {
            for (const actionDef of actionsDef) {
                const type = Hashtable_1.Hashtable.GetNumber(actionDef, "id");
                const ctr = StateEnums_1.V_ID_TO_STATE_ACTION.get(type);
                const action = new ctr(this, type, actionDef);
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
