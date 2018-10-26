import { Defs } from "./Model/Defs";
import { UIManager } from "./UI/UIManager";
import { SceneManager } from "./Scene/SceneManager";
import { Connector } from "./Net/Connector";
import { ProtoCreator } from "./Net/ProtoHelper";
import { Logger } from "./RC/Utils/Logger";
import { Preloader } from "./Preloader";

export class Main {
	private static _instance: Main;
	public static get instance(): Main { return Main._instance; }

	private _aniComplete: boolean;
	private _preloadComplete: boolean;

	constructor() {
		Main._instance = this;
		Laya.MiniAdpter.init();
		Laya.init(1280, 720);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
		Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;
		Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
		Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
		// laya.utils.Stat.show(0, 0);

		fairygui.UIConfig.packageFileExtension = "bin";

		this.ShowLogo();
	}

	private ShowLogo(): void {
		let urls = [];
		urls.push({ url: "res/ui/logo.bin", type: Laya.Loader.BUFFER });
		urls.push({ url: "res/ui/logo_atlas0.png", type: Laya.Loader.IMAGE });
		Laya.loader.load(urls, Laya.Handler.create(this, () => {
			Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
			fairygui.UIPackage.addPackage("res/ui/logo");
			let logoRoot = fairygui.UIPackage.createObject("logo", "Main").asCom;
			logoRoot.name = "logoRoot";
			fairygui.GRoot.inst.addChild(logoRoot);

			logoRoot.getTransition("t0").play(new laya.utils.Handler(this, () => {
				logoRoot.getTransition("t1").play(new laya.utils.Handler(this, () => {
					this._aniComplete = true;
					this.CheckReady();
				}), 1, 0, 0, -1);
			}), 1, 0, 0, -1);

			Preloader.Load(() => {
				this._preloadComplete = true;
				this.CheckReady();
			});
		}));
	}

	private CheckReady(): void {
		if (this._aniComplete && this._preloadComplete) {
			let logoRoot = fairygui.GRoot.inst.getChild("logoRoot");
			logoRoot.dispose();
			this.StartGame();
		}
	}

	private StartGame(): void {
		Logger.Log("start game...");

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