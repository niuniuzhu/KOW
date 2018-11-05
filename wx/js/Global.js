import { Connector } from "./Net/Connector";
import { Graphic } from "./Graphic";
import { UIManager } from "./UI/UIManager";
import { SceneManager } from "./Scene/SceneManager";
import { BattleManager } from "./Model/BattleManager";
import { ProtoCreator } from "./Net/ProtoHelper";
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
export class Global {
    static get connector() { return this._connector; }
    static get graphic() { return this._graphic; }
    static get uiManager() { return this._uiManager; }
    static get sceneManager() { return this._sceneManager; }
    static get battleManager() { return this._battleManager; }
    static Init() {
        ProtoCreator.Init();
        this._connector.Init();
        this._graphic.Init();
        this._uiManager.Init();
        this._sceneManager.Init();
        this._battleManager.Init();
    }
}
Global.Platform = Platform;
Global.RunMode = RunMode;
Global._connector = new Connector();
Global._graphic = new Graphic();
Global._uiManager = new UIManager();
Global._sceneManager = new SceneManager();
Global._battleManager = new BattleManager();
