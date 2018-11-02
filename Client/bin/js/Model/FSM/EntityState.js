define(["require", "exports", "../../RC/FSM/FSMState"], function (require, exports, FSMState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Type;
    (function (Type) {
        Type[Type["Idle"] = 0] = "Idle";
        Type[Type["Move"] = 1] = "Move";
        Type[Type["Attack"] = 2] = "Attack";
        Type[Type["Die"] = 3] = "Die";
    })(Type || (Type = {}));
    class EntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
            this._owner = owner;
        }
        get owner() { return this._owner; }
    }
    EntityState.Type = Type;
    exports.EntityState = EntityState;
});
//# sourceMappingURL=EntityState.js.map