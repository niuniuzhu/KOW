import { Hashtable } from "../../../RC/Utils/Hashtable";
import { VEntityAction } from "./VEntityAction";
export class VActAnimation extends VEntityAction {
    OnInit(def) {
        super.OnInit(def);
        this._animationID = Hashtable.GetNumber(def, "animation");
        this._autoScaleTime = Hashtable.GetBool(def, "auto_scale_time");
        this._duration = Hashtable.GetNumber(def, "duration");
    }
    OnEnter(param) {
        super.OnEnter(param);
        if (this.owner.animationProxy != null && this.owner.animationProxy.available) {
            if (this._animationID >= 0) {
                let timeScale = 1;
                if (this._autoScaleTime) {
                    const animationSetting = this.owner.animationProxy.GetAnimationSetting(this._animationID);
                    timeScale = this._duration / (animationSetting.length * animationSetting.interval);
                }
                this.owner.animationProxy.Play(this._animationID, 0, timeScale);
            }
        }
    }
}
