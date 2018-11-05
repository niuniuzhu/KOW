import { Consts } from "./Consts";
import { Global } from "./Global";
import { Hashtable } from "./RC/Utils/Hashtable";
import { Preloader } from "./Preloader";
import { Logger } from "./RC/Utils/Logger";
import { SceneManager } from "./Scene/SceneManager";
import * as $protobuf from "./Libs/protobufjs";
import * as Long from "./Libs/long";

export class Main {
	private static _instance: Main;
	public static get instance(): Main { return Main._instance; }

	private _fadeInComplete: boolean;
	private _preloadComplete: boolean;

	constructor(config: string) {
		Main._instance = this;
		Laya.MiniAdpter.init();
		Laya.init(Consts.SCREEN_WIDTH, Consts.SCREEN_HEIGHT);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
		Laya.stage.alignH = Laya.Stage.ALIGN_TOP;
		Laya.stage.alignV = Laya.Stage.ALIGN_LEFT;
		Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
		// laya.utils.Stat.show(0, 0);
		fairygui.UIConfig.packageFileExtension = "bin";

		const cfgJson = JSON.parse(config);
		Global.platform = Hashtable.GetNumber(cfgJson, "platform");

		this.ShowLogo();
	}

	private ShowLogo(): void {
		const urls = [];
		urls.push({ url: "res/ui/logo.bin", type: Laya.Loader.BUFFER });
		urls.push({ url: "res/ui/logo_atlas0.png", type: Laya.Loader.IMAGE });
		Laya.loader.load(urls, Laya.Handler.create(this, () => {
			Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
			fairygui.UIPackage.addPackage("res/ui/logo");
			const logoRoot = fairygui.UIPackage.createObject("logo", "Main").asCom;
			logoRoot.name = "logoRoot";
			logoRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			logoRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
			fairygui.GRoot.inst.addChild(logoRoot);

			logoRoot.getTransition("t0").play(Laya.Handler.create(this, () => {
				this._fadeInComplete = true;
				this.CheckPreloadComplete();
			}), 1, 0, 0, -1);

			Preloader.Load(() => {
				this._preloadComplete = true;
				this.CheckPreloadComplete();
			});
		}));
	}

	private CheckPreloadComplete(): void {
		if (this._fadeInComplete && this._preloadComplete) {
			const logoRoot = fairygui.GRoot.inst.getChild("logoRoot").asCom;
			logoRoot.getTransition("t1").play(Laya.Handler.create(this, () => {
				logoRoot.dispose();
				this.StartGame();
			}), 1, 0, 0, -1);
		}
	}

	private StartGame(): void {
		Logger.Log("start game...");

		if (Global.platform == Global.Platform.WXMini) {
			$protobuf.util.Long = <$protobuf.Constructor<Long>>(<any>Long).default.prototype.constructor;
			$protobuf.configure();
		}
		//全局环境初始化
		Global.Init();

		Global.sceneManager.ChangeState(SceneManager.State.Login);

		fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
		Laya.timer.frameLoop(1, this, this.Update);
	}

	private Update(): void {
		const dt = Laya.timer.delta;
		Global.connector.Update(dt);
		Global.sceneManager.Update(dt);
	}

	private OnResize(e: laya.events.Event): void {
		Global.uiManager.OnResize(e);
	}
}