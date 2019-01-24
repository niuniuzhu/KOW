import { Global } from "../Global";
import { SceneState } from "./SceneState";
export class MainState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.main;
    }
}
