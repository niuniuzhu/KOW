import { AssetsManager, AssetType } from "../../AssetsManager";
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
        const mapPreloads = Hashtable.GetStringArray(mapDef, "preloads");
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
                const entityDef = CDefs.GetEntity(playerInfo.actorID);
                const entityPreloads = Hashtable.GetStringArray(entityDef, "preloads");
                for (const u of entityPreloads) {
                    const ss = u.split(",");
                    this.assetsPath.push({ url: "res/" + ss[0], type: Number.parseInt(ss[1]) });
                }
            }
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
