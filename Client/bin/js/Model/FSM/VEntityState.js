define(["require", "exports", "../../RC/FSM/FSMState", "../../RC/Utils/Hashtable"], function (require, exports, FSMState_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntityState extends FSMState_1.FSMState {
        get owner() { return this._owner; }
        get time() { return this._time; }
        set time(value) {
            if (this._time == value)
                return;
            this._time = value;
            this.OnStateTimeChanged();
        }
        constructor(type, owner) {
            super(type);
            this._owner = owner;
        }
        OnEnter(param) {
            if (this.owner.animationProxy.available) {
                const vDef = Hashtable_1.Hashtable.GetMap(Hashtable_1.Hashtable.GetMap(this.owner.cdefs, "states"), this.type.toString());
                const aniName = Hashtable_1.Hashtable.GetString(vDef, "animation");
                const scaleTime = Hashtable_1.Hashtable.GetBool(vDef, "auto_scale_time");
                const duration = Hashtable_1.Hashtable.GetNumber(vDef, "duration");
                let timeScale = 1;
                if (scaleTime) {
                    const animationSetting = this.owner.animationProxy.GetAnimationSetting(aniName);
                    timeScale = duration / (animationSetting.length * animationSetting.interval);
                }
                this.owner.PlayAnim(aniName, timeScale);
            }
            this._time = 0;
        }
        OnUpdate(dt) {
            this._time += dt;
        }
        OnStateTimeChanged() {
        }
    }
    exports.VEntityState = VEntityState;
});
//# sourceMappingURL=VEntityState.js.map