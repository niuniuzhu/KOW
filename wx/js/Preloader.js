import { Logger } from "./RC/Utils/Logger";
import { Defs } from "./Defs";
export class Preloader {
    static get complete() { return this._complete; }
    static Load(completeHandler) {
        Logger.Log("loading defs...");
        Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, () => {
            let json = Laya.loader.getRes("res/defs/b_defs.json");
            Defs.Init(json);
            this.LoadUIRes(completeHandler);
        }), undefined, Laya.Loader.JSON);
    }
    static LoadUIRes(completeHandler) {
        Logger.Log("loading res...");
        let preloads = Defs.GetPreloads();
        let urls = [];
        for (let u of preloads) {
            let ss = u.split(",");
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
