"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hashtable_1 = require("../../../RC/Utils/Hashtable");
const VEntityStateAction_1 = require("./VEntityStateAction");
class VActAnimation extends VEntityStateAction_1.VEntityStateAction {
    OnInit(def) {
        super.OnInit(def);
        this._animationID = Hashtable_1.Hashtable.GetNumber(def, "animation");
        this._autoScaleTime = Hashtable_1.Hashtable.GetBool(def, "auto_scale_time");
        this._duration = Hashtable_1.Hashtable.GetNumber(def, "duration");
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
exports.VActAnimation = VActAnimation;
