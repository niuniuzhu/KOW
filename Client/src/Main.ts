import { AssetsManager, AssetType, IUrlDesc } from "./AssetsManager";
import { Consts } from "./Consts";
import { Global } from "./Global";
import * as Long from "./Libs/long";
import * as $protobuf from "./Libs/protobufjs";
import { CDefs } from "./Model/CDefs";
import { SoundManager } from "./Model/View/SoundManager";
import { Md5 } from "./RC/Crypto/MD5";
import { Hashtable } from "./RC/Utils/Hashtable";
import { JsonHelper } from "./RC/Utils/JsonHelper";
import { Logger } from "./RC/Utils/Logger";
import { SceneManager } from "./Scene/SceneManager";
import { Base64 } from "./RC/Utils/Base64 ";

export class Main {
	private static _instance: Main;
	public static get instance(): Main { return Main._instance; }

	private _aniComplete: boolean;
	private _preloadComplete: boolean;

	constructor(config: string) {
		Main._instance = this;
		if (config != null) {
			const cfgJson = JsonHelper.Parse(config);
			Global.local = Hashtable.GetBool(cfgJson, "local");
		}

		Global.queryString = wx.getLaunchOptionsSync();
		Logger.Log(Global.queryString);
		const queryObject = Global.queryString.query;
		if (queryObject.q != null) {
			const base64 = new Base64();
			const eQuery = base64.decode(queryObject.q);
			const crypto = Md5.hashStr(eQuery);
			if (crypto != queryObject.s) {
				Logger.Warn(`Inconsistent parameter signatures, q is ${eQuery}`);
			}
		}

		Laya.init(Consts.SCREEN_WIDTH, Consts.SCREEN_HEIGHT);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
		Laya.stage.alignH = Laya.Stage.ALIGN_TOP;
		Laya.stage.alignV = Laya.Stage.ALIGN_LEFT;
		Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
		// laya.utils.Stat.show(0, 0);
		this.ShowLogo();
	}

	private ShowLogo(): void {
		fairygui.UIConfig.packageFileExtension = "bin";
		AssetsManager.LoadUIPacket("logo", 1, this, () => {
			Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
			fairygui.UIPackage.addPackage("res/ui/logo");
			const logoRoot = fairygui.UIPackage.createObject("logo", "Main").asCom;
			logoRoot.name = "logoRoot";
			logoRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			logoRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
			fairygui.GRoot.inst.addChild(logoRoot);

			logoRoot.getTransition("t0").play(Laya.Handler.create(this, () => {
				this._aniComplete = true;
				this.CheckPreloadComplete();
			}), 1, 0, 0, -1);

			this.Load(this, () => {
				this._preloadComplete = true;
				this.CheckPreloadComplete();
			});
		});
	}

	public Load(caller: any, completeHandler: () => void): void {
		Logger.Log("loading defs...");
		AssetsManager.Load("res/defs/b_defs.json", AssetType.Json, null, () => {
			const json: JSON = Laya.loader.getRes("res/defs/b_defs.json");
			CDefs.Init(json);
			this.LoadUIRes(caller, completeHandler);
		}, null);
	}

	private LoadUIRes(caller: any, completeHandler: () => void): void {
		Logger.Log("loading res...");
		const preloads = CDefs.GetPreloads();
		const urls: IUrlDesc[] = [];
		for (const u of preloads) {
			const ss = u.split(",");
			urls.push({ url: "res/ui/" + ss[0], type: Number.parseInt(ss[1]) });
		}
		AssetsManager.LoadBatch(urls, caller, completeHandler);
	}

	private CheckPreloadComplete(): void {
		if (this._aniComplete && this._preloadComplete) {
			const logoRoot = fairygui.GRoot.inst.getChild("logoRoot").asCom;
			logoRoot.getTransition("t1").play(Laya.Handler.create(this, () => {
				logoRoot.dispose();
				this.StartGame();
			}), 1, 0, 0, -1);
		}
	}

	private StartGame(): void {
		Logger.Log("start game...");

		if (Laya.Browser.onMiniGame) {
			if ((<any>Long).default == null) {
				$protobuf.util.Long = Long;
			}
			else {
				$protobuf.util.Long = <$protobuf.Constructor<Long>>(<any>Long).default.prototype.constructor;
			}
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
		Global.battleManager.Update(dt);
		SoundManager.Update();
	}

	private OnResize(e: laya.events.Event): void {
		Global.uiManager.OnResize(e);
	}
}