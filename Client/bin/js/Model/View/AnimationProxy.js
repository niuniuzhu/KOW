define(["require", "exports", "../../Consts", "../../RC/Utils/Hashtable"], function (require, exports, Consts_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnimationPlayMode;
    (function (AnimationPlayMode) {
        AnimationPlayMode[AnimationPlayMode["Loop"] = 0] = "Loop";
        AnimationPlayMode[AnimationPlayMode["Clamp"] = 1] = "Clamp";
        AnimationPlayMode[AnimationPlayMode["Pingpong"] = 2] = "Pingpong";
    })(AnimationPlayMode = exports.AnimationPlayMode || (exports.AnimationPlayMode = {}));
    class AnimationSetting {
    }
    exports.AnimationSetting = AnimationSetting;
    class AnimationProxy extends fairygui.GGraph {
        constructor() {
            super(...arguments);
            this._aniSettings = new Map();
            this._playingName = "";
        }
        get animation() { return this._animation; }
        Init(actorID, def) {
            const aniDefs = Hashtable_1.Hashtable.GetMapArray(def, "animations");
            for (const aniDef of aniDefs) {
                const aniName = Hashtable_1.Hashtable.GetString(aniDef, "name");
                const length = Hashtable_1.Hashtable.GetNumber(aniDef, "length");
                const urls = [];
                for (let i = 0; i < length; ++i) {
                    urls.push((Consts_1.Consts.ASSETS_ENTITY_PREFIX + actorID) + "/" + aniName + i + ".png");
                }
                Laya.Animation.createFrames(urls, aniName);
                const aniSetting = new AnimationSetting();
                aniSetting.playMode = Hashtable_1.Hashtable.GetNumber(aniDef, "play_mode");
                aniSetting.length = length;
                aniSetting.interval = Hashtable_1.Hashtable.GetNumber(aniDef, "interval");
                this._aniSettings.set(aniName, aniSetting);
            }
            const roleAni = new Laya.Animation();
            roleAni.autoSize = true;
            this.setPivot(0.5, 0.5, true);
            this.setNativeObject(roleAni);
            this.setSize(roleAni.width, roleAni.height);
            this._animation = roleAni;
        }
        Play(name, startFrame, timeScale = 1, force = false) {
            if (!force && this._playingName == name)
                return;
            this._playingName = name;
            const aniSetting = this.GetAnimationSetting(name);
            this._animation.interval = aniSetting.interval * timeScale;
            this._animation.play(startFrame, aniSetting.playMode == AnimationPlayMode.Loop, name);
            this.setSize(this._animation.width, this._animation.height);
        }
        GetAnimationSetting(name) {
            return this._aniSettings.get(name);
        }
        dispose() {
            this.animation.destroy();
            super.dispose();
        }
    }
    exports.AnimationProxy = AnimationProxy;
});
//# sourceMappingURL=AnimationProxy.js.map