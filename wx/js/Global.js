import { Graphic } from "./Graphic";
import { BattleManager } from "./Model/BattleManager";
import { Connector } from "./Net/Connector";
import { ProtoCreator } from "./Net/ProtoHelper";
import { SceneManager } from "./Scene/SceneManager";
import { UIManager } from "./UI/UIManager";
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
    }
}
Global._connector = new Connector();
Global._graphic = new Graphic();
Global._uiManager = new UIManager();
Global._sceneManager = new SceneManager();
Global._battleManager = new BattleManager();
