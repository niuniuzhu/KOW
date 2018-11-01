define(["require", "exports", "./UI/UIManager", "./Scene/SceneManager", "./Net/Connector", "./Net/ProtoHelper", "./RC/Utils/Logger", "./Preloader", "./Libs/protobufjs", "./Libs/long", "./Graphic"], function (require, exports, UIManager_1, SceneManager_1, Connector_1, ProtoHelper_1, Logger_1, Preloader_1, $protobuf, Long, Graphic_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
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
                Preloader_1.Preloader.Load(() => {
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
            Logger_1.Logger.Log("start game...");
            if (typeof wx !== "undefined") {
                $protobuf.util.Long = Long.default.prototype.constructor;
                $protobuf.configure();
            }
            ProtoHelper_1.ProtoCreator.Init();
            Connector_1.Connector.Init();
            Graphic_1.Graphic.Init();
            UIManager_1.UIManager.Init();
            SceneManager_1.SceneManager.Init();
            SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login);
            fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
            Laya.timer.frameLoop(1, this, this.Update);
        }
        Update() {
            let dt = Laya.timer.delta;
            Connector_1.Connector.Update(dt);
            SceneManager_1.SceneManager.Update(dt);
            Logger_1.Logger.Log(dt);
        }
        OnResize(e) {
            UIManager_1.UIManager.OnResize(e);
        }
    }
    exports.Main = Main;
});
//# sourceMappingURL=Main.js.map