define(["require", "exports", "./Net/Connector", "./Graphic", "./UI/UIManager", "./Scene/SceneManager", "./Model/BattleManager", "./Net/ProtoHelper"], function (require, exports, Connector_1, Graphic_1, UIManager_1, SceneManager_1, BattleManager_1, ProtoHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Platform;
    (function (Platform) {
        Platform[Platform["Editor"] = 0] = "Editor";
        Platform[Platform["Web"] = 1] = "Web";
        Platform[Platform["WXMini"] = 2] = "WXMini";
    })(Platform || (Platform = {}));
    var RunMode;
    (function (RunMode) {
        RunMode[RunMode["Game"] = 0] = "Game";
        RunMode[RunMode["Pressure"] = 1] = "Pressure";
    })(RunMode || (RunMode = {}));
    class Global {
        static get connector() { return this._connector; }
        static get graphic() { return this._graphic; }
        static get uiManager() { return this._uiManager; }
        static get sceneManager() { return this._sceneManager; }
        static get battleManager() { return this._battleManager; }
        static Init() {
            ProtoHelper_1.ProtoCreator.Init();
            this._connector.Init();
            this._graphic.Init();
            this._uiManager.Init();
            this._sceneManager.Init();
            this._battleManager.Init();
        }
    }
    Global.Platform = Platform;
    Global.RunMode = RunMode;
    Global._connector = new Connector_1.Connector();
    Global._graphic = new Graphic_1.Graphic();
    Global._uiManager = new UIManager_1.UIManager();
    Global._sceneManager = new SceneManager_1.SceneManager();
    Global._battleManager = new BattleManager_1.BattleManager();
    exports.Global = Global;
});
//# sourceMappingURL=Global.js.map