import Set from "../../../RC/Collections/Set";
import { FSMState } from "../../../RC/Framework/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ID_TO_STATE_ACTION } from "../../StateEnums";
export class EntityState extends FSMState {
    constructor(type, owner) {
        super(type);
        this._time = 0;
        this._owner = owner;
    }
    get owner() { return this._owner; }
    get time() { return this._time; }
    Init(def) {
        const actionsDef = Hashtable.GetMapArray(def, "actions");
        if (actionsDef != null) {
            for (const actionDef of actionsDef) {
                const type = Hashtable.GetNumber(actionDef, "id");
                const ctr = ID_TO_STATE_ACTION.get(type);
                const action = new ctr(this._owner, type);
                action.Init(actionDef);
                this.AddAction(action);
            }
        }
        const sa = Hashtable.GetNumberArray(def, "states_available");
        if (sa != null) {
            this._statesAvailable = new Set();
            for (const type of sa) {
                this._statesAvailable.add(type);
            }
        }
    }
    EncodeSnapshot(writer) {
        writer.int32(this._time);
        for (const action of this._actions) {
            action.EncodeSnapshot(writer);
        }
    }
    DecodeSnapshot(reader) {
        this._time = reader.int32();
        for (const action of this._actions) {
            action.DecodeSnapshot(reader);
        }
    }
    OnEnter(param) {
        this._time = 0;
    }
    OnUpdate(dt) {
        this._time += dt;
    }
    UpdatePhysic(dt) {
        for (const action of this._actions) {
            action.UpdatePhysic(dt);
        }
    }
    HandleInput(type, press) {
        for (const action of this._actions) {
            action.HandlInput(type, press);
        }
    }
    IsStateAvailable(type) {
        return this._statesAvailable == null || this._statesAvailable.contains(type);
    }
    Dump() {
        let str = "";
        str += `action count:${this._actions.length}\n`;
        for (const action of this._actions) {
            str += action.Dump();
        }
        str += `_time:${this._time}\n`;
        return str;
    }
}
