define(["require", "exports", "../../RC/Utils/Hashtable", "../../Consts", "../CDefs"], function (require, exports, Hashtable_1, Consts_1, CDefs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PlayMode;
    (function (PlayMode) {
        PlayMode[PlayMode["Loop"] = 0] = "Loop";
        PlayMode[PlayMode["Clamp"] = 1] = "Clamp";
        PlayMode[PlayMode["Pingpong"] = 2] = "Pingpong";
    })(PlayMode || (PlayMode = {}));
    class AniSetting {
    }
    class AniHolder extends fairygui.GGraph {
        constructor() {
            super(...arguments);
            this._aniSettings = new Map();
            this._playingName = "";
        }
        get animation() { return this._animation; }
        get aniName() { return this._aniName; }
        get length() { return this._length; }
        get scaleTime() { return this._scaleTime; }
        Init(actorID) {
            const aniDefs = Hashtable_1.Hashtable.GetMapArray(CDefs_1.CDefs.GetEntity(actorID), "animations");
            for (const aniDef of aniDefs) {
                const aniName = Hashtable_1.Hashtable.GetString(aniDef, "name");
                const length = Hashtable_1.Hashtable.GetNumber(aniDef, "length");
                const urls = [];
                for (let i = 0; i < length; ++i) {
                    urls.push((Consts_1.Consts.ASSETS_ENTITY_PREFIX + actorID) + "/" + aniName + i + ".png");
                }
                Laya.Animation.createFrames(urls, aniName);
                const aniSetting = new AniSetting();
                aniSetting.playMode = Hashtable_1.Hashtable.GetNumber(aniDef, "play_mode");
                aniSetting.scaleTime = Hashtable_1.Hashtable.GetBool(aniDef, "auto_scale_time");
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
        Play(name, startFrame, force = false) {
            if (!force && this._playingName == name)
                return;
            this._playingName = name;
            const aniSetting = this._aniSettings.get(name);
            this._animation.interval = aniSetting.interval;
            this._animation.play(startFrame, aniSetting.playMode == PlayMode.Loop, name);
            this.setSize(this._animation.width, this._animation.height);
        }
        dispose() {
            this.animation.destroy();
            super.dispose();
        }
    }
    exports.AniHolder = AniHolder;
});
//# sourceMappingURL=AniHolder.js.map