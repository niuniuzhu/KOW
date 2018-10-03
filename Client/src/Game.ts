import { UIManager } from "./UI/UIManager";
import { Defs } from "./Model/Defs";
import { Network } from "./Net/Network";
import { EventManager } from "./Events/EventManager";
import { UIEvent } from "./Events/UIEvent";
import { UIAlert } from "./UI/UIAlert";

export class Main {
	constructor() {
		Laya.init(720, 1280);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
		Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
		Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
		Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
		// laya.utils.Stat.show(0, 0);
		this.LoadDefs();
	}

	private LoadDefs(): void {
		console.log("loading defs...");
		Laya.loader.load("res/defs/b_defs.json", Laya.Handler.create(this, this.OnDefsLoadComplete), undefined, Laya.Loader.JSON);
	}

	private OnDefsLoadComplete(): void {
		let json: JSON = Laya.loader.getRes("res/defs/b_defs.json");
		Defs.Init(json);
		this.LoadUIRes();
	}

	private LoadUIRes(): void {
		console.log("loading res...");
		let preloads = Defs.GetPreloads();
		let urls = [];
		for (let u of preloads) {
			let ss = u.split(",");
			urls.push({ url: "res/ui/" + ss[0], type: ss[1] == "0" ? Laya.Loader.BUFFER : Laya.Loader.IMAGE });
		}
		Laya.loader.load(urls, Laya.Handler.create(this, this.OnUIResLoadComplete));
	}

	private OnUIResLoadComplete(): void {
		this.StartGame();
	}

	private StartGame(): void {
		console.log("start game...");

		UIManager.Init();
		fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
		Laya.timer.frameLoop(1, this, this.Update);

		EventManager.AddListener(UIEvent.NETWORK_DISCONNECT, this.HandleNetworkDisconnect);

		UIManager.EnterLogin();
	}

	private HandleNetworkDisconnect(): void {
		UIAlert.Show("与服务器断开连接", () => UIManager.EnterLogin());
	}

	private Update(): void {
		let dt = Laya.timer.delta;
		UIManager.Update(dt);
		Network.Update(dt);
	}

	private OnResize(e: laya.events.Event): void {
		UIManager.OnResize(e);
	}
}