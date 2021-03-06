define(["require", "exports", "../../AssetsManager", "../../RC/Utils/Hashtable", "../CDefs"], function (require, exports, AssetsManager_1, Hashtable_1, CDefs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleAssetsMgr {
        constructor() {
            this.assetsPath = [];
            this._aniSettingPool = new Map();
        }
        Destroy() {
            for (const path of this.assetsPath) {
                Laya.loader.clearRes(path.url);
            }
            this.assetsPath.splice(0);
            this._aniSettingPool.clear();
        }
        Preload(battleInfo, caller, onComplete, onProgress) {
            const mapDef = CDefs_1.CDefs.GetMap(battleInfo.mapID);
            const mapPreloads = Hashtable_1.Hashtable.GetStringArray(mapDef, "preloads");
            for (const u of mapPreloads) {
                const ss = u.split(",");
                this.assetsPath.push({ url: "res/" + ss[0], type: Number.parseInt(ss[1]) });
            }
            const c1 = battleInfo.teamInfos.length;
            for (let i = 0; i < c1; ++i) {
                const playerInfos = battleInfo.teamInfos[i].playerInfos;
                const c2 = playerInfos.length;
                for (let j = 0; j < c2; ++j) {
                    const playerInfo = playerInfos[j];
                    const entityDef = CDefs_1.CDefs.GetEntity(playerInfo.actorID);
                    const entityPreloads = Hashtable_1.Hashtable.GetStringArray(entityDef, "preloads");
                    for (const u of entityPreloads) {
                        const ss = u.split(",");
                        this.assetsPath.push({ url: "res/" + ss[0], type: Number.parseInt(ss[1]) });
                    }
                }
            }
            this.assetsPath.push({ url: "res/ui/assets.bin", type: AssetsManager_1.AssetType.Binary });
            this.assetsPath.push({ url: "res/ui/assets_atlas0.png", type: AssetsManager_1.AssetType.Image });
            AssetsManager_1.AssetsManager.LoadBatch(this.assetsPath, caller, onComplete, onProgress);
        }
        AddAniSetting(name, setting) {
            this._aniSettingPool.set(name, setting);
        }
        GetAniSetting(name) {
            return this._aniSettingPool.get(name);
        }
        HasAniSetting(name) {
            return this._aniSettingPool.has(name);
        }
    }
    exports.BattleAssetsMgr = BattleAssetsMgr;
});
//# sourceMappingURL=BattleAssetsMgr.js.map