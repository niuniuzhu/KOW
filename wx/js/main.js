import { Consts } from "./Consts";
import { Env } from "./Env";
import { Hashtable } from "./RC/Utils/Hashtable";
import { Preloader } from "./Preloader";
import { Logger } from "./RC/Utils/Logger";
import { ProtoCreator } from "./Net/ProtoHelper";
import { Connector } from "./Net/Connector";
import { Graphic } from "./Graphic";
import { UIManager } from "./UI/UIManager";
import { SceneManager } from "./Scene/SceneManager";
import { BattleManager } from "./Model/BattleManager";
import * as $protobuf from "./Libs/protobufjs";
import * as Long from "./Libs/long";
export class Main {
    static get instance() { return Main._instance; }
    constructor(config) {
        Main._instance = this;
        Laya.MiniAdpter.init();
        Laya.init(Consts.SCREEN_WIDTH, Consts.SCREEN_HEIGHT);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.alignH = Laya.Stage.ALIGN_TOP;
        Laya.stage.alignV = Laya.Stage.ALIGN_LEFT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        fairygui.UIConfig.packageFileExtension = "bin";
        const cfgJson = JSON.parse(config);
        Env.platform = Hashtable.GetNumber(cfgJson, "platform");
        this.ShowLogo();
    }
    ShowLogo() {
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
    CheckPreloadComplete() {
        if (this._fadeInComplete && this._preloadComplete) {
            const logoRoot = fairygui.GRoot.inst.getChild("logoRoot").asCom;
            logoRoot.getTransition("t1").play(Laya.Handler.create(this, () => {
                logoRoot.dispose();
                this.StartGame();
            }), 1, 0, 0, -1);
        }
    }
    StartGame() {
        Logger.Log("start game...");
        if (Env.platform == Env.Platform.WXMini) {
            $protobuf.util.Long = Long.default.prototype.constructor;
            $protobuf.configure();
        }
        ProtoCreator.Init();
        Connector.Init();
        Graphic.Init();
        UIManager.Init();
        SceneManager.Init();
        BattleManager.Init();
        SceneManager.ChangeState(SceneManager.State.Login);
        fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
        Laya.timer.frameLoop(1, this, this.Update);
    }
    Update() {
        const dt = Laya.timer.delta;
        Connector.Update(dt);
        SceneManager.Update(dt);
    }
    OnResize(e) {
        UIManager.OnResize(e);
    }
}
