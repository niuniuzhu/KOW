import { SceneState } from "./SceneState";
import { UIManager } from "../UI/UIManager";
import { BattleManager } from "../Model/BattleManager";
export class BattleState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = UIManager.battle;
        this._battleManager = new BattleManager();
    }
    OnEnter(param) {
        super.OnEnter(param);
        let loginRet = param;
        this._battleManager.Init(loginRet);
    }
    OnExit() {
        this._battleManager.Clear();
        super.OnExit();
    }
    OnUpdate(dt) {
        this._battleManager.Update(dt);
    }
}
