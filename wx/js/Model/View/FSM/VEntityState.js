import { FSMState } from "../../../RC/Framework/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { V_STATE_ACTION_CTOR_MAP } from "../../Defines";
export class VEntityState extends FSMState {
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
        const actionsDef = Hashtable.GetMapArray(def, "actions");
        if (actionsDef != null) {
            for (const actionDef of actionsDef) {
                const type = Hashtable.GetNumber(actionDef, "id");
                const ctr = V_STATE_ACTION_CTOR_MAP.get(type);
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
