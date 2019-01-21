"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AssetsManager_1 = require("../../AssetsManager");
const Consts_1 = require("../../Consts");
const Hashtable_1 = require("../../RC/Utils/Hashtable");
const CDefs_1 = require("../CDefs");
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
        const preloads = Hashtable_1.Hashtable.GetStringArray(mapDef, "preloads");
        for (const u of preloads) {
            const ss = u.split(",");
            this.assetsPath.push({ url: "res/" + ss[0], type: Number.parseInt(ss[1]) });
        }
        const count = battleInfo.playerInfos.length;
        for (let i = 0; i < count; ++i) {
            const playerInfo = battleInfo.playerInfos[i];
            this.assetsPath.push({ url: "res/roles/" + Consts_1.Consts.ASSETS_MODEL_PREFIX + playerInfo.actorID + ".atlas", type: AssetsManager_1.AssetType.Atlas });
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
