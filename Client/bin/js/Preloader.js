define(["require", "exports", "./RC/Utils/Logger", "./Defs"], function (require, exports, Logger_1, Defs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Preloader {
        static get complete() { return this._complete; }
        static Load(completeHandler) {
            Logger_1.Logger.Log("loading defs...");
            Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, () => {
                const json = Laya.loader.getRes("res/defs/b_defs.json");
                Defs_1.Defs.Init(json);
                this.LoadUIRes(completeHandler);
            }), undefined, Laya.Loader.JSON);
        }
        static LoadUIRes(completeHandler) {
            Logger_1.Logger.Log("loading res...");
            const preloads = Defs_1.Defs.GetPreloads();
            const urls = [];
            for (const u of preloads) {
                const ss = u.split(",");
                let loadType;
                switch (ss[1]) {
                    case "1":
                        loadType = Laya.Loader.IMAGE;
                        break;
                    case "2":
                        loadType = Laya.Loader.SOUND;
                        break;
                    default:
                        loadType = Laya.Loader.BUFFER;
                        break;
                }
                urls.push({ url: "res/ui/" + ss[0], type: loadType });
            }
            Laya.loader.load(urls, Laya.Handler.create(this, completeHandler));
        }
    }
    Preloader._complete = false;
    exports.Preloader = Preloader;
});
//# sourceMappingURL=Preloader.js.map