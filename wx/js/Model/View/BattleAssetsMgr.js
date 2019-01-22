import { AssetsManager, AssetType } from "../../AssetsManager";
import { Consts } from "../../Consts";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
export class BattleAssetsMgr {
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
        const mapDef = CDefs.GetMap(battleInfo.mapID);
        const preloads = Hashtable.GetStringArray(mapDef, "preloads");
        for (const u of preloads) {
            const ss = u.split(",");
            this.assetsPath.push({ url: "res/" + ss[0], type: Number.parseInt(ss[1]) });
        }
        const count = battleInfo.playerInfos.length;
        for (let i = 0; i < count; ++i) {
            const playerInfo = battleInfo.playerInfos[i];
            this.assetsPath.push({ url: "res/roles/" + Consts.ASSETS_MODEL_PREFIX + playerInfo.actorID + ".atlas", type: AssetType.Atlas });
        }
        this.assetsPath.push({ url: "res/ui/assets.bin", type: AssetType.Binary });
        this.assetsPath.push({ url: "res/ui/assets_atlas0.png", type: AssetType.Image });
        AssetsManager.LoadBatch(this.assetsPath, caller, onComplete, onProgress);
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
