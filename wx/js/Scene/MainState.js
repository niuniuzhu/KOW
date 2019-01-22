import { SceneState } from "./SceneState";
import { Global } from "../Global";
export class MainState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.main;
    }
}
