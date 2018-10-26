import { UIManager } from "./UI/UIManager";
import { SceneManager } from "./Scene/SceneManager";
import { Connector } from "./Net/Connector";
import { ProtoCreator } from "./Net/ProtoHelper";
import { Logger } from "./RC/Utils/Logger";
import { Preloader } from "./Preloader";
export class Main {
    static get instance() { return Main._instance; }
    constructor() {
        Main._instance = this;
        Laya.MiniAdpter.init();
        Laya.init(1280, 720);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.alignH = Laya.Stage.ALIGN_TOP;
        Laya.stage.alignV = Laya.Stage.ALIGN_LEFT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        fairygui.UIConfig.packageFileExtension = "bin";
        this.ShowLogo();
    }
    ShowLogo() {
        let urls = [];
        urls.push({ url: "res/ui/logo.bin", type: Laya.Loader.BUFFER });
        urls.push({ url: "res/ui/logo_atlas0.png", type: Laya.Loader.IMAGE });
        Laya.loader.load(urls, Laya.Handler.create(this, () => {
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            fairygui.UIPackage.addPackage("res/ui/logo");
            let logoRoot = fairygui.UIPackage.createObject("logo", "Main").asCom;
            logoRoot.name = "logoRoot";
            logoRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            logoRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
            fairygui.GRoot.inst.addChild(logoRoot);
            logoRoot.getTransition("t0").play(new laya.utils.Handler(this, () => {
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
            let logoRoot = fairygui.GRoot.inst.getChild("logoRoot").asCom;
            logoRoot.getTransition("t1").play(new laya.utils.Handler(this, () => {
                logoRoot.dispose();
                this.StartGame();
            }), 1, 0, 0, -1);
        }
    }
    StartGame() {
        Logger.Log("start game...");
        ProtoCreator.Init();
        Connector.Init();
        UIManager.Init();
        SceneManager.Init();
        SceneManager.ChangeState(SceneManager.State.Login);
        fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
        Laya.timer.frameLoop(1, this, this.Update);
    }
    Update() {
        let dt = Laya.timer.delta;
        Connector.Update(dt);
        SceneManager.Update(dt);
    }
    OnResize(e) {
        UIManager.OnResize(e);
    }
}
