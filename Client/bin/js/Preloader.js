define(["require", "exports", "./AssetsManager", "./Model/CDefs", "./RC/Utils/Logger"], function (require, exports, AssetsManager_1, CDefs_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Preloader {
        static get complete() { return this._complete; }
        static Load(caller, completeHandler) {
            Logger_1.Logger.Log("loading defs...");
            AssetsManager_1.AssetsManager.Load("res/defs/b_defs.json", AssetsManager_1.AssetType.Json, null, () => {
                const json = Laya.loader.getRes("res/defs/b_defs.json");
                CDefs_1.CDefs.Init(json);
                this.LoadUIRes(caller, completeHandler);
            }, null);
        }
        static LoadUIRes(caller, completeHandler) {
            Logger_1.Logger.Log("loading res...");
            const preloads = CDefs_1.CDefs.GetPreloads();
            const urls = [];
            for (const u of preloads) {
                const ss = u.split(",");
                urls.push({ url: "res/ui/" + ss[0], type: ss[1] });
            }
            AssetsManager_1.AssetsManager.LoadBatch(urls, caller, completeHandler);
        }
    }
    Preloader._complete = false;
    exports.Preloader = Preloader;
});
//# sourceMappingURL=Preloader.js.map