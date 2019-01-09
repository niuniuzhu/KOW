import { AssetsManager, AssetType } from "./AssetsManager";
import { CDefs } from "./Model/CDefs";
import { Logger } from "./RC/Utils/Logger";
export class Preloader {
    static get complete() { return this._complete; }
    static Load(caller, completeHandler) {
        Logger.Log("loading defs...");
        AssetsManager.Load("res/defs/b_defs.json", AssetType.Json, null, () => {
            const json = Laya.loader.getRes("res/defs/b_defs.json");
            CDefs.Init(json);
            this.LoadUIRes(caller, completeHandler);
        }, null);
    }
    static LoadUIRes(caller, completeHandler) {
        Logger.Log("loading res...");
        const preloads = CDefs.GetPreloads();
        const urls = [];
        for (const u of preloads) {
            const ss = u.split(",");
            urls.push({ url: "res/ui/" + ss[0], type: ss[1] });
        }
        AssetsManager.LoadBatch(urls, caller, completeHandler);
    }
}
Preloader._complete = false;
