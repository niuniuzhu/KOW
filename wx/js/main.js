import { AssetsManager, AssetType } from "./AssetsManager";
import { Consts } from "./Consts";
import { Global } from "./Global";
import * as Long from "./Libs/long";
import * as $protobuf from "./Libs/protobufjs";
import { CDefs } from "./Model/CDefs";
import { Hashtable } from "./RC/Utils/Hashtable";
import { JsonHelper } from "./RC/Utils/JsonHelper";
import { Logger } from "./RC/Utils/Logger";
import { SceneManager } from "./Scene/SceneManager";
export class Main {
    static get instance() { return Main._instance; }
    constructor(config) {
        Main._instance = this;
        if (config != null) {
            const cfgJson = JsonHelper.Parse(config);
            Global.local = Hashtable.GetBool(cfgJson, "local");
        }
        Laya.init(Consts.SCREEN_WIDTH, Consts.SCREEN_HEIGHT);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.alignH = Laya.Stage.ALIGN_TOP;
        Laya.stage.alignV = Laya.Stage.ALIGN_LEFT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        fairygui.UIConfig.packageFileExtension = "bin";
        this.ShowLogo();
    }
    ShowLogo() {
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
    Load(caller, completeHandler) {
        Logger.Log("loading defs...");
        AssetsManager.Load("res/defs/b_defs.json", AssetType.Json, null, () => {
            const json = Laya.loader.getRes("res/defs/b_defs.json");
            CDefs.Init(json);
            this.LoadUIRes(caller, completeHandler);
        }, null);
    }
    LoadUIRes(caller, completeHandler) {
        Logger.Log("loading res...");
        const preloads = CDefs.GetPreloads();
        const urls = [];
        for (const u of preloads) {
            const ss = u.split(",");
            urls.push({ url: "res/ui/" + ss[0], type: Number.parseInt(ss[1]) });
        }
        AssetsManager.LoadBatch(urls, caller, completeHandler);
    }
    CheckPreloadComplete() {
        if (this._aniComplete && this._preloadComplete) {
            const logoRoot = fairygui.GRoot.inst.getChild("logoRoot").asCom;
            logoRoot.getTransition("t1").play(Laya.Handler.create(this, () => {
                logoRoot.dispose();
                this.StartGame();
            }), 1, 0, 0, -1);
        }
    }
    StartGame() {
        Logger.Log("start game...");
        if (Laya.Browser.onMiniGame) {
            if (Long.default == null) {
                $protobuf.util.Long = Long;
            }
            else {
                $protobuf.util.Long = Long.default.prototype.constructor;
            }
            $protobuf.configure();
        }
        Global.Init();
        Global.sceneManager.ChangeState(SceneManager.State.Login);
        fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
        Laya.timer.frameLoop(1, this, this.Update);
    }
    Update() {
        const dt = Laya.timer.delta;
        Global.connector.Update(dt);
        Global.sceneManager.Update(dt);
        Global.battleManager.Update(dt);
    }
    OnResize(e) {
        Global.uiManager.OnResize(e);
    }
}
