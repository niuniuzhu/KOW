import { Defs } from "./Defs";
import { Hashtable } from "../RC/Utils/Hashtable";
export class Skill {
    get id() { return this._id; }
    get connectedState() { return Hashtable.GetNumber(this._def, "connected_state"); }
    Init(id) {
        this._id = id;
        this.LoadDef();
    }
    LoadDef() {
        this._def = Defs.GetSkill(this._id);
    }
}
