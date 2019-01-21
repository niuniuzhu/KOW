"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Graphic_1 = require("./Graphic");
const BattleManager_1 = require("./Model/BattleManager");
const Connector_1 = require("./Net/Connector");
const ProtoHelper_1 = require("./Net/ProtoHelper");
const SceneManager_1 = require("./Scene/SceneManager");
const UIManager_1 = require("./UI/UIManager");
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
Global._connector = new Connector_1.Connector();
Global._graphic = new Graphic_1.Graphic();
Global._uiManager = new UIManager_1.UIManager();
Global._sceneManager = new SceneManager_1.SceneManager();
Global._battleManager = new BattleManager_1.BattleManager();
exports.Global = Global;
