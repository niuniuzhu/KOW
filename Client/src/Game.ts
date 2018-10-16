import { UIManager } from "./UI/UIManager";
import { Defs } from "./Model/Defs";
import { GSConnector } from "./Net/GSConnector";
import { SceneManager } from "./Scene/SceneManager";
import { UIAlert } from "./UI/UIAlert";
import { Protos } from "./libs/protos";

export class Game {
	private static _instance: Game;
	public static get instance(): Game { return Game._instance; }

	constructor() {
		Game._instance = this;
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

		fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
		Laya.timer.frameLoop(1, this, this.Update);

		GSConnector.Init();
		
		UIManager.Init();

		SceneManager.Init();
		SceneManager.ChangeState(SceneManager.State.Login);

		GSConnector.disconnectHandler = this.HandleGSDisconnect;
		GSConnector.AddListener(Protos.MsgID.eGS2GC_Kick, this.HandleKick);
	}

	private Update(): void {
		let dt = Laya.timer.delta;
		GSConnector.Update(dt);
		UIManager.Update(dt);
		SceneManager.Update(dt);
	}

	private OnResize(e: laya.events.Event): void {
		UIManager.OnResize(e);
	}

	public OnGSConnected(): void {
		GSConnector.OnConnected();
		UIManager.EnterMatching();
	}

	private HandleGSDisconnect(e: Event): void {
		UIAlert.Show("与服务器断开连接", () => SceneManager.ChangeState(SceneManager.State.Login));
	}

	private HandleKick(message: any): void {
		let kick: Protos.GS2GC_Kick = <Protos.GS2GC_Kick>message;
		switch (kick.reason) {
			case Protos.CS2GS_KickGC.EReason.DuplicateLogin:
				UIAlert.Show("另一台设备正在登陆相同的账号", () => SceneManager.ChangeState(SceneManager.State.Login), true);
				break;

			default:
				UIAlert.Show("已被服务器强制下线", () => SceneManager.ChangeState(SceneManager.State.Login), true);
				break;
		}
	}
}