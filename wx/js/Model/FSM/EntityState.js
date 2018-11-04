import { FSMState } from "../../RC/FSM/FSMState";
var Type;
(function (Type) {
    Type[Type["Idle"] = 0] = "Idle";
    Type[Type["Move"] = 1] = "Move";
    Type[Type["Attack"] = 2] = "Attack";
    Type[Type["Die"] = 3] = "Die";
})(Type || (Type = {}));
export class EntityState extends FSMState {
    constructor(type, owner) {
        super(type);
        this._owner = owner;
    }
    get owner() { return this._owner; }
}
EntityState.Type = Type;
