define(["require", "exports", "./Graphic", "./Model/BattleManager", "./Net/Connector", "./Net/ProtoHelper", "./Scene/SceneManager", "./UI/UIManager"], function (require, exports, Graphic_1, BattleManager_1, Connector_1, ProtoHelper_1, SceneManager_1, UIManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        }
    }
    Global._connector = new Connector_1.Connector();
    Global._graphic = new Graphic_1.Graphic();
    Global._uiManager = new UIManager_1.UIManager();
    Global._sceneManager = new SceneManager_1.SceneManager();
    Global._battleManager = new BattleManager_1.BattleManager();
    exports.Global = Global;
});
//# sourceMappingURL=Global.js.map