define(["require", "exports", "../../RC/FSM/FSMState", "../../RC/Utils/Hashtable"], function (require, exports, FSMState_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AniPlayMode;
    (function (AniPlayMode) {
        AniPlayMode[AniPlayMode["Loop"] = 0] = "Loop";
        AniPlayMode[AniPlayMode["Clamp"] = 1] = "Clamp";
        AniPlayMode[AniPlayMode["Pingpong"] = 2] = "Pingpong";
    })(AniPlayMode || (AniPlayMode = {}));
    class VEntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
            this._duration = -1;
            this._autoScaleAniTime = true;
            this._animationPlayMode = AniPlayMode.Clamp;
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
    VEntityState.AniPlayMode = AniPlayMode;
    exports.VEntityState = VEntityState;
});
//# sourceMappingURL=VEntityState.js.map