import { SceneState } from "./SceneState";
import { UIManager } from "../UI/UIManager";
export class BattleState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = UIManager.battle;
    }
    OnEnter(param) {
        super.OnEnter(param);
    }
    OnExit() {
        super.OnExit();
    }
    OnUpdate(dt) {
    }
}
