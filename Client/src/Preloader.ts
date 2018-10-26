import { Logger } from "./RC/Utils/Logger";
import { Defs } from "./Model/Defs";

export class Preloader {
	private static _complete: boolean = false;

	public static get complete(): boolean { return this._complete; }

	public static Load(completeHandler: () => void): void {
		Logger.Log("loading defs...");
		Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, () => {
			let json: JSON = Laya.loader.getRes("res/defs/b_defs.json");
			Defs.Init(json);
			this.LoadUIRes(completeHandler);
		}), undefined, Laya.Loader.JSON);
	}

	private static LoadUIRes(completeHandler: () => void): void {
		Logger.Log("loading res...");
		let preloads = Defs.GetPreloads();
		let urls = [];
		for (let u of preloads) {
			let ss = u.split(",");
			let loadType: string;
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