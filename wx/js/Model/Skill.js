import { Defs } from "./Defs";
import { Hashtable } from "../RC/Utils/Hashtable";
export class Skill {
    get id() { return this._id; }
    get connectedState() { return this._connectState; }
    get emitterID() { return this._emitterID; }
    get bulletID() { return this._bulletID; }
    Init(id) {
        this._id = id;
        this.LoadDef();
    }
    LoadDef() {
        this._def = Defs.GetSkill(this._id);
        this._connectState = Hashtable.GetNumber(this._def, "connect_state");
        this._emitterID = Hashtable.GetNumber(this._def, "emitter");
        this._bulletID = Hashtable.GetNumber(this._def, "bullet");
    }
}
