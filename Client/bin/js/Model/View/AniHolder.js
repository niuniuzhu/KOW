define(["require", "exports", "../../RC/Utils/Hashtable", "../../Consts"], function (require, exports, Hashtable_1, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnimationMode;
    (function (AnimationMode) {
        AnimationMode[AnimationMode["Loop"] = 0] = "Loop";
        AnimationMode[AnimationMode["Clamp"] = 1] = "Clamp";
        AnimationMode[AnimationMode["Pingpong"] = 2] = "Pingpong";
    })(AnimationMode = exports.AnimationMode || (exports.AnimationMode = {}));
    class AniHolder extends fairygui.GGraph {
        get animation() { return this._animation; }
        get aniName() { return this._aniName; }
        get length() { return this._length; }
        get aniMode() { return this._aniMode; }
        get scaleTime() { return this._scaleTime; }
        constructor(actorID, def) {
            super();
            this._aniName = Hashtable_1.Hashtable.GetString(def, "name");
            this._length = Hashtable_1.Hashtable.GetNumber(def, "length");
            this._aniMode = Hashtable_1.Hashtable.GetNumber(def, "play_mode");
            this._scaleTime = Hashtable_1.Hashtable.GetBool(def, "auto_scale_time");
            const urls = [];
            for (let i = 0; i < this._length; ++i) {
                urls.push((Consts_1.Consts.ASSETS_ENTITY_PREFIX + actorID) + "/" + this._aniName + i + ".png");
            }
            const roleAni = new Laya.Animation();
            roleAni.autoSize = true;
            roleAni.interval = 100;
            roleAni.loadImages(urls);
            this.setPivot(0.5, 0.5, true);
            this.setNativeObject(roleAni);
            this.setSize(roleAni.width, roleAni.height);
            this._animation = roleAni;
        }
        Play(startFrame) {
            this._animation.play(startFrame, this._aniMode == AnimationMode.Loop);
        }
        dispose() {
            this.animation.destroy();
            super.dispose();
        }
    }
    exports.AniHolder = AniHolder;
});
//# sourceMappingURL=AniHolder.js.map