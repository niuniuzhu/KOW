define(["require", "exports", "../../RC/Utils/Hashtable"], function (require, exports, Hashtable_1) {
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
            this._playingID = -1;
        }
        get available() { return this._aniSettings != null && this._animation != null; }
        get animation() { return this._animation; }
        Init(def) {
            const model = Hashtable_1.Hashtable.GetString(def, "model");
            if (model == null) {
                return;
            }
            const aniDefs = Hashtable_1.Hashtable.GetMapArray(def, "animations");
            if (aniDefs == null) {
                return;
            }
            for (const aniDef of aniDefs) {
                const id = Hashtable_1.Hashtable.GetNumber(aniDef, "id");
                const aniName = Hashtable_1.Hashtable.GetString(aniDef, "name");
                const alias = `${model}_${id}`;
                if (!AnimationProxy.TEMPLATE_CACHE.has(alias)) {
                    const startFrame = Hashtable_1.Hashtable.GetNumber(aniDef, "start_frame");
                    const length = Hashtable_1.Hashtable.GetNumber(aniDef, "length");
                    const urls = [];
                    for (let i = startFrame; i < length; ++i) {
                        urls.push(`${model}/${aniName}${i}.png`);
                    }
                    Laya.Animation.createFrames(urls, alias);
                    AnimationProxy.TEMPLATE_CACHE.add(alias);
                }
                const aniSetting = new AnimationSetting();
                aniSetting.id = id;
                aniSetting.alias = alias;
                aniSetting.playMode = Hashtable_1.Hashtable.GetNumber(aniDef, "play_mode");
                aniSetting.length = length;
                aniSetting.interval = Hashtable_1.Hashtable.GetNumber(aniDef, "interval");
                this._aniSettings.set(id, aniSetting);
            }
            const roleAni = new Laya.Animation();
            roleAni.autoSize = true;
            this.setPivot(0.5, 0.5, true);
            this.setNativeObject(roleAni);
            this.setSize(roleAni.width, roleAni.height);
            this._animation = roleAni;
            const dAnimation = Hashtable_1.Hashtable.GetNumber(def, "defaule_animation");
            if (dAnimation != null) {
                this.Play(dAnimation, 0);
            }
        }
        Play(id, startFrame, timeScale = 1, force = false) {
            if (!this.available)
                return;
            if (!force && this._playingID == id)
                return;
            this._playingID = id;
            const aniSetting = this.GetAnimationSetting(id);
            this._animation.interval = aniSetting.interval * timeScale;
            this._animation.play(startFrame, aniSetting.playMode == AnimationPlayMode.Loop, aniSetting.alias);
            this.setSize(this._animation.width, this._animation.height);
        }
        GetAnimationSetting(id) {
            if (!this.available)
                return null;
            return this._aniSettings.get(id);
        }
        dispose() {
            if (this._animation != null)
                this._animation.destroy();
            super.dispose();
        }
    }
    AnimationProxy.TEMPLATE_CACHE = new Set();
    exports.AnimationProxy = AnimationProxy;
});
//# sourceMappingURL=AnimationProxy.js.map