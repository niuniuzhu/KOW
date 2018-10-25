import { Defs } from "./Model/Defs";
import { UIManager } from "./UI/UIManager";
import { SceneManager } from "./Scene/SceneManager";
import { Connector } from "./Net/Connector";
import { ProtoCreator } from "./Net/ProtoHelper";
import { Debug } from "./Misc/Debug";

export class Main {
	private static _instance: Main;
	public static get instance(): Main { return Main._instance; }

	constructor() {
		Main._instance = this;
		Laya.MiniAdpter.init();
		Laya.init(1280, 720);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
		Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
		Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
		Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
		// laya.utils.Stat.show(0, 0);
		this.LoadDefs();
	}

	private LoadDefs(): void {
		Debug.Log("loading defs...");
		Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, this.OnDefsLoadComplete), undefined, Laya.Loader.JSON);
	}

	private OnDefsLoadComplete(): void {
		let json: JSON = Laya.loader.getRes("res/defs/b_defs.json");
		Defs.Init(json);
		this.LoadUIRes();
	}

	private LoadUIRes(): void {
		Debug.Log("loading res...");
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
		Laya.loader.load(urls, Laya.Handler.create(this, this.OnUIResLoadComplete));
	}

	private OnUIResLoadComplete(): void {
		this.StartGame();
	}

	private StartGame(): void {
		Debug.Log("start game...");

		ProtoCreator.Init();
		Connector.Init();
		UIManager.Init();
		SceneManager.Init();
		SceneManager.ChangeState(SceneManager.State.Login);

		fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
		Laya.timer.frameLoop(1, this, this.Update);
	}

	private Update(): void {
		let dt = Laya.timer.delta;
		Connector.Update(dt);
		SceneManager.Update(dt);
	}

	private OnResize(e: laya.events.Event): void {
		UIManager.OnResize(e);
	}
}