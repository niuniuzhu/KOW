import { FSMState } from "../../../RC/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
var Type;
(function (Type) {
    Type[Type["Idle"] = 0] = "Idle";
    Type[Type["Move"] = 1] = "Move";
    Type[Type["Attack"] = 2] = "Attack";
    Type[Type["Die"] = 3] = "Die";
})(Type || (Type = {}));
export class VEntityState extends FSMState {
    constructor(type, owner) {
        super(type);
        this._owner = owner;
    }
    get owner() { return this._owner; }
    OnEnter(param) {
        const def = Hashtable.GetMap(Hashtable.GetMap(this.owner.def, "states"), this.type.toString());
        const aniName = Hashtable.GetString(def, "animation");
        this.owner.PlayAnim(aniName);
    }
}
VEntityState.Type = Type;
