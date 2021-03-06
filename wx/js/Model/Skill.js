import { Defs } from "./Defs";
import { Hashtable } from "../RC/Utils/Hashtable";
export class Skill {
    constructor() {
        this.shakeTime = 0;
    }
    get id() { return this._id; }
    get connectState() { return this._connectState; }
    get mpCost() { return this._mpCost; }
    get mpAdd() { return this._mpAdd; }
    get emitterID() { return this._emitterID; }
    get bulletID() { return this._bulletID; }
    get damage() { return this._damage; }
    get float() { return this._float; }
    get formula() { return this._formula; }
    Init(id) {
        this._id = id;
        this.LoadDef();
    }
    LoadDef() {
        const def = Defs.GetSkill(this._id);
        this._connectState = Hashtable.GetNumber(def, "connect_state");
        this._mpCost = Hashtable.GetNumber(def, "mp_cost");
        this._mpAdd = Hashtable.GetNumber(def, "mp_add");
        this._emitterID = Hashtable.GetNumber(def, "emitter");
        this._bulletID = Hashtable.GetNumber(def, "bullet");
        this._damage = Hashtable.GetNumber(def, "damage");
        this._float = Hashtable.GetNumber(def, "float");
        this._formula = Hashtable.GetString(def, "formula", null);
    }
}
