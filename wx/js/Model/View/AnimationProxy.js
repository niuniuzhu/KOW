"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Consts_1 = require("../../Consts");
const Vec2_1 = require("../../RC/Math/Vec2");
const Hashtable_1 = require("../../RC/Utils/Hashtable");
const CDefs_1 = require("../CDefs");
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
    constructor(owner, id) {
        super();
        this._aniSettings = new Map();
        this._playingID = -1;
        const def = CDefs_1.CDefs.GetModel(id);
        const model = Consts_1.Consts.ASSETS_MODEL_PREFIX + id;
        const aniDefs = Hashtable_1.Hashtable.GetMapArray(def, "animations");
        if (aniDefs == null) {
            return;
        }
        for (const aniDef of aniDefs) {
            const id = Hashtable_1.Hashtable.GetNumber(aniDef, "id");
            const alias = `${model}_${id}`;
            const aniName = Hashtable_1.Hashtable.GetString(aniDef, "name");
            const length = Hashtable_1.Hashtable.GetNumber(aniDef, "length");
            let setting = owner.battle.assetsManager.GetAniSetting(alias);
            if (setting == null) {
                const startFrame = Hashtable_1.Hashtable.GetNumber(aniDef, "start_frame");
                const urls = [];
                for (let i = startFrame; i < length; ++i) {
                    urls.push(`${model}/${aniName}${i}.png`);
                }
                let mw = 0, mh = 0;
                const template = Laya.Animation.createFrames(urls, alias);
                for (const g of template) {
                    const texture = g._one.texture;
                    if (texture.sourceWidth > mw) {
                        mw = texture.sourceWidth;
                    }
                    if (texture.sourceHeight > mh) {
                        mh = texture.sourceHeight;
                    }
                }
                setting = new AnimationSetting();
                setting.id = id;
                setting.alias = alias;
                setting.size = new Vec2_1.Vec2(mw, mh);
                setting.playMode = Hashtable_1.Hashtable.GetNumber(aniDef, "play_mode");
                setting.length = length;
                setting.interval = Hashtable_1.Hashtable.GetNumber(aniDef, "interval");
                owner.battle.assetsManager.AddAniSetting(alias, setting);
            }
            this._aniSettings.set(id, owner.battle.assetsManager.GetAniSetting(alias));
        }
        this._animation = new Laya.Animation();
        this.setPivot(0.5, 0.5, true);
        this.setNativeObject(this._animation);
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
        this.setSize(aniSetting.size.x, aniSetting.size.y);
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
exports.AnimationProxy = AnimationProxy;
