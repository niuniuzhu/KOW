define(["require", "exports", "./AssetsManager", "./Consts", "./Global", "./Libs/long", "./Libs/protobufjs", "./Model/CDefs", "./Model/View/SoundManager", "./RC/Utils/Hashtable", "./RC/Utils/JsonHelper", "./RC/Utils/Logger", "./Scene/SceneManager"], function (require, exports, AssetsManager_1, Consts_1, Global_1, Long, $protobuf, CDefs_1, SoundManager_1, Hashtable_1, JsonHelper_1, Logger_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        static get instance() { return Main._instance; }
        constructor(config) {
            Main._instance = this;
            if (config != null) {
                const cfgJson = JsonHelper_1.JsonHelper.Parse(config);
                Global_1.Global.local = Hashtable_1.Hashtable.GetBool(cfgJson, "local");
            }
            Laya.init(Consts_1.Consts.SCREEN_WIDTH, Consts_1.Consts.SCREEN_HEIGHT);
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
            Laya.stage.alignH = Laya.Stage.ALIGN_TOP;
            Laya.stage.alignV = Laya.Stage.ALIGN_LEFT;
            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
            this.ShowLogo();
        }
        ShowLogo() {
            fairygui.UIConfig.packageFileExtension = "bin";
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
                this.Load(this, () => {
                    this._preloadComplete = true;
                    this.CheckPreloadComplete();
                });
            });
        }
        Load(caller, completeHandler) {
            Logger_1.Logger.Log("loading defs...");
            AssetsManager_1.AssetsManager.Load("res/defs/b_defs.json", AssetsManager_1.AssetType.Json, null, () => {
                const json = Laya.loader.getRes("res/defs/b_defs.json");
                CDefs_1.CDefs.Init(json);
                this.LoadUIRes(caller, completeHandler);
            }, null);
        }
        LoadUIRes(caller, completeHandler) {
            Logger_1.Logger.Log("loading res...");
            const preloads = CDefs_1.CDefs.GetPreloads();
            const urls = [];
            for (const u of preloads) {
                const ss = u.split(",");
                urls.push({ url: "res/ui/" + ss[0], type: Number.parseInt(ss[1]) });
            }
            AssetsManager_1.AssetsManager.LoadBatch(urls, caller, completeHandler);
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
                if (Long.default == null) {
                    $protobuf.util.Long = Long;
                }
                else {
                    $protobuf.util.Long = Long.default.prototype.constructor;
                }
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
            SoundManager_1.SoundManager.Update();
        }
        OnResize(e) {
            Global_1.Global.uiManager.OnResize(e);
        }
    }
    exports.Main = Main;
});
//# sourceMappingURL=Main.js.map