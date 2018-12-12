define(["require", "exports", "../../../RC/FSM/FSMState", "../../../RC/Utils/Hashtable"], function (require, exports, FSMState_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Type;
    (function (Type) {
        Type[Type["Idle"] = 0] = "Idle";
        Type[Type["Move"] = 1] = "Move";
        Type[Type["Attack"] = 2] = "Attack";
        Type[Type["Die"] = 3] = "Die";
    })(Type || (Type = {}));
    class VEntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
            this._owner = owner;
        }
        get owner() { return this._owner; }
        get time() { return this._time; }
        set time(value) {
            if (this._time == value)
                return;
            this._time = value;
            this.OnStateTimeChanged();
        }
        OnEnter(param) {
            const def = Hashtable_1.Hashtable.GetMap(Hashtable_1.Hashtable.GetMap(this.owner.def, "states"), this.type.toString());
            const aniName = Hashtable_1.Hashtable.GetString(def, "animation");
            this.owner.PlayAnim(aniName);
        }
        OnStateTimeChanged() {
        }
    }
    VEntityState.Type = Type;
    exports.VEntityState = VEntityState;
});
//# sourceMappingURL=VEntityState.js.map