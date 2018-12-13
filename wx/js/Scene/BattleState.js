import { Global } from "../Global";
import { SceneState } from "./SceneState";
export class BattleState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.battle;
    }
    OnEnter(param) {
        super.OnEnter(param);
    }
    OnExit() {
        super.OnExit();
    }
    OnUpdate(dt) {
        super.OnUpdate(dt);
    }
}
