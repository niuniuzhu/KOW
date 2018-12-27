import Set from "../../RC/Collections/Set";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ID_TO_STATE_ACTION } from "./StateEnums";
export class EntityState extends FSMState {
    get owner() { return this._owner; }
    get time() { return this._time; }
    set time(value) { this._time = value; }
    constructor(type, owner) {
        super(type);
        this._owner = owner;
    }
    Init() {
        const def = Hashtable.GetMap(Hashtable.GetMap(this._owner.defs, "states"), this.type.toString());
        const actionsDef = Hashtable.GetMapArray(def, "actions");
        if (actionsDef != null) {
            for (const actionDef of actionsDef) {
                const type = Hashtable.GetNumber(actionDef, "id");
                const ctr = ID_TO_STATE_ACTION.get(type);
                const action = new ctr(this, type, actionDef);
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
        for (const action of this._actions) {
            action.EncodeSnapshot(writer);
        }
        writer.int32(this._time);
    }
    DecodeSnapshot(reader) {
        for (const action of this._actions) {
            action.DecodeSnapshot(reader);
        }
        this._time = reader.int32();
    }
    OnEnter(param) {
        this._time = 0;
    }
    OnUpdate(dt) {
        this._time += dt;
    }
    IsStateAvailable(type) {
        return this._statesAvailable == null || this._statesAvailable.contains(type);
    }
    HandleInput(type, press) {
        for (const action of this._actions) {
            action.HandlInput(type, press);
        }
    }
    Dump() {
        let str = "";
        str += `action count:${this._actions.length}\n`;
        for (const action of this._actions) {
            str += action.Dump();
        }
        str += `time:${this._time}\n`;
        return str;
    }
}
