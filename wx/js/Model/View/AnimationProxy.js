import { Hashtable } from "../../RC/Utils/Hashtable";
export var AnimationPlayMode;
(function (AnimationPlayMode) {
    AnimationPlayMode[AnimationPlayMode["Loop"] = 0] = "Loop";
    AnimationPlayMode[AnimationPlayMode["Clamp"] = 1] = "Clamp";
    AnimationPlayMode[AnimationPlayMode["Pingpong"] = 2] = "Pingpong";
})(AnimationPlayMode || (AnimationPlayMode = {}));
export class AnimationSetting {
}
export class AnimationProxy extends fairygui.GGraph {
    constructor() {
        super(...arguments);
        this._aniSettings = new Map();
        this._playingName = "";
    }
    get available() { return this._aniSettings != null && this._animation != null; }
    get animation() { return this._animation; }
    Init(def) {
        const model = Hashtable.GetString(def, "model");
        if (model == null)
            return;
        const aniDefs = Hashtable.GetMapArray(def, "animations");
        if (aniDefs == null)
            return;
        for (const aniDef of aniDefs) {
            const aniName = Hashtable.GetString(aniDef, "name");
            const length = Hashtable.GetNumber(aniDef, "length");
            const urls = [];
            for (let i = 0; i < length; ++i) {
                urls.push(`${model}/${aniName}${i}.png`);
            }
            Laya.Animation.createFrames(urls, aniName);
            const aniSetting = new AnimationSetting();
            aniSetting.playMode = Hashtable.GetNumber(aniDef, "play_mode");
            aniSetting.length = length;
            aniSetting.interval = Hashtable.GetNumber(aniDef, "interval");
            this._aniSettings.set(aniName, aniSetting);
        }
        const roleAni = new Laya.Animation();
        roleAni.autoSize = true;
        this.setPivot(0.5, 0.5, true);
        this.setNativeObject(roleAni);
        this.setSize(roleAni.width, roleAni.height);
        this._animation = roleAni;
        const dAnimation = Hashtable.GetString(def, "defaule_animation");
        if (dAnimation != null) {
            this.Play(dAnimation, 0);
        }
    }
    Play(name, startFrame, timeScale = 1, force = false) {
        if (!this.available)
            return;
        if (!force && this._playingName == name)
            return;
        this._playingName = name;
        const aniSetting = this.GetAnimationSetting(name);
        this._animation.interval = aniSetting.interval * timeScale;
        this._animation.play(startFrame, aniSetting.playMode == AnimationPlayMode.Loop, name);
        this.setSize(this._animation.width, this._animation.height);
    }
    GetAnimationSetting(name) {
        if (!this.available)
            return null;
        return this._aniSettings.get(name);
    }
    dispose() {
        if (this._animation != null)
            this._animation.destroy();
        super.dispose();
    }
}
