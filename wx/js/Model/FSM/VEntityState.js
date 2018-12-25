import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
export class VEntityState extends FSMState {
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
            const vDef = Hashtable.GetMap(Hashtable.GetMap(this.owner.cdefs, "states"), this.type.toString());
            const aniName = Hashtable.GetString(vDef, "animation");
            const scaleTime = Hashtable.GetBool(vDef, "auto_scale_time");
            const duration = Hashtable.GetNumber(vDef, "duration");
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
