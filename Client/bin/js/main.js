define(["require", "exports", "./AssetsManager", "./Consts", "./Global", "./Libs/long", "./Libs/protobufjs", "./Preloader", "./RC/Utils/Logger", "./Scene/SceneManager"], function (require, exports, AssetsManager_1, Consts_1, Global_1, Long, $protobuf, Preloader_1, Logger_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        static get instance() { return Main._instance; }
        constructor(config) {
            Main._instance = this;
            Laya.MiniAdpter.init();
            Laya.init(Consts_1.Consts.SCREEN_WIDTH, Consts_1.Consts.SCREEN_HEIGHT);
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
            Laya.stage.alignH = Laya.Stage.ALIGN_TOP;
            Laya.stage.alignV = Laya.Stage.ALIGN_LEFT;
            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
            fairygui.UIConfig.packageFileExtension = "bin";
            this.ShowLogo();
        }
        ShowLogo() {
            AssetsManager_1.AssetsManager.LoadUIPacket("logo", 1, this, () => {
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
                Preloader_1.Preloader.Load(this, () => {
                    this._preloadComplete = true;
                    this.CheckPreloadComplete();
                });
            });
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
            Logger_1.Logger.Log("start game...");
            if (Laya.Browser.onMiniGame) {
                $protobuf.util.Long = Long.default.prototype.constructor;
                $protobuf.configure();
            }
            Global_1.Global.Init();
            Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login);
            fairygui.GRoot.inst.on(fairygui.Events.SIZE_CHANGED, this, this.OnResize);
            Laya.timer.frameLoop(1, this, this.Update);
        }
        Update() {
            const dt = Laya.timer.delta;
            Global_1.Global.connector.Update(dt);
            Global_1.Global.sceneManager.Update(dt);
            Global_1.Global.battleManager.Update(dt);
        }
        OnResize(e) {
            Global_1.Global.uiManager.OnResize(e);
        }
    }
    exports.Main = Main;
});
//# sourceMappingURL=Main.js.map