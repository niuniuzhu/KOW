import { FSMState } from "../../../RC/Framework/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { V_ID_TO_STATE_ACTION } from "../../StateEnums";
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
    Init(statesDef) {
        const def = Hashtable.GetMap(statesDef, this.type.toString());
        const actionsDef = Hashtable.GetMapArray(def, "actions");
        if (actionsDef != null) {
            for (const actionDef of actionsDef) {
                const type = Hashtable.GetNumber(actionDef, "id");
                const ctr = V_ID_TO_STATE_ACTION.get(type);
                const action = new ctr(this._owner, type, actionDef);
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
