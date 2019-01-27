define(["require", "exports", "../../../RC/Utils/Hashtable", "./VEntityAction"], function (require, exports, Hashtable_1, VEntityAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VActAnimation extends VEntityAction_1.VEntityAction {
        OnInit(def) {
            super.OnInit(def);
            this._animationID = Hashtable_1.Hashtable.GetNumber(def, "animation");
            this._autoScaleTime = Hashtable_1.Hashtable.GetBool(def, "auto_scale_time");
            this._duration = Hashtable_1.Hashtable.GetNumber(def, "duration");
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
    exports.VActAnimation = VActAnimation;
});
//# sourceMappingURL=VActAnimation.js.map