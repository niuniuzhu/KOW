import { Hashtable } from "../../../RC/Utils/Hashtable";
import { VEntityStateAction } from "./VEntityStateAction";
export class VActAnimation extends VEntityStateAction {
    OnInit(def) {
        super.OnInit(def);
        this._animationID = Hashtable.GetNumber(def, "animation");
        this._autoScaleTime = Hashtable.GetBool(def, "auto_scale_time");
        this._duration = Hashtable.GetNumber(def, "duration");
    }
    OnEnter(param) {
        super.OnEnter(param);
        const owner = this.state.owner;
        if (owner.animationProxy != null && owner.animationProxy.available) {
            if (this._animationID >= 0) {
                let timeScale = 1;
                if (this._autoScaleTime) {
                    const animationSetting = owner.animationProxy.GetAnimationSetting(this._animationID);
                    timeScale = this._duration / (animationSetting.length * animationSetting.interval);
                }
                owner.animationProxy.Play(this._animationID, 0, timeScale);
            }
        }
    }
}
