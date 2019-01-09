import { Consts } from "../../Consts";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
export var AnimationPlayMode;
(function (AnimationPlayMode) {
    AnimationPlayMode[AnimationPlayMode["Loop"] = 0] = "Loop";
    AnimationPlayMode[AnimationPlayMode["Clamp"] = 1] = "Clamp";
    AnimationPlayMode[AnimationPlayMode["Pingpong"] = 2] = "Pingpong";
})(AnimationPlayMode || (AnimationPlayMode = {}));
export class AnimationSetting {
}
export class AnimationProxy extends fairygui.GGraph {
    constructor(id) {
        super();
        this._aniSettings = new Map();
        this._playingID = -1;
        const def = CDefs.GetModel(id);
        const model = Consts.ASSETS_MODEL_PREFIX + id;
        const aniDefs = Hashtable.GetMapArray(def, "animations");
        if (aniDefs == null) {
            return;
        }
        for (const aniDef of aniDefs) {
            const id = Hashtable.GetNumber(aniDef, "id");
            const alias = `${model}_${id}`;
            const aniName = Hashtable.GetString(aniDef, "name");
            const length = Hashtable.GetNumber(aniDef, "length");
            if (!AnimationProxy.TEMPLATE_CACHE.has(alias)) {
                const startFrame = Hashtable.GetNumber(aniDef, "start_frame");
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
            aniSetting.playMode = Hashtable.GetNumber(aniDef, "play_mode");
            aniSetting.length = length;
            aniSetting.interval = Hashtable.GetNumber(aniDef, "interval");
            this._aniSettings.set(id, aniSetting);
        }
        this._animation = new Laya.Animation();
        this._animation.autoSize = true;
        this.setPivot(0.5, 0.5, true);
        this.setNativeObject(this._animation);
        this.setSize(this._animation.width, this._animation.height);
    }
    get available() { return this._aniSettings != null && this._animation != null; }
    get animation() { return this._animation; }
    GetSetting(id) {
        return this._aniSettings.get(id);
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
