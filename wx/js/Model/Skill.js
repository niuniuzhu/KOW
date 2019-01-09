import { Defs } from "./Defs";
import { Hashtable } from "../RC/Utils/Hashtable";
export class Skill {
    get id() { return this._id; }
    get connectedState() { return this._connectState; }
    get emitterID() { return this._emitterID; }
    get bulletID() { return this._bulletID; }
    get damage() { return this._damage; }
    Init(id) {
        this._id = id;
        this.LoadDef();
    }
    LoadDef() {
        const def = Defs.GetSkill(this._id);
        this._connectState = Hashtable.GetNumber(def, "connect_state");
        this._emitterID = Hashtable.GetNumber(def, "emitter");
        this._bulletID = Hashtable.GetNumber(def, "bullet");
        this._damage = Hashtable.GetNumber(def, "damage");
    }
}
