define(["require", "exports", "./SceneState", "../UI/UIManager", "../Model/BattleManager"], function (require, exports, SceneState_1, UIManager_1, BattleManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = UIManager_1.UIManager.battle;
            this._battleManager = new BattleManager_1.BattleManager();
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
    exports.BattleState = BattleState;
});
//# sourceMappingURL=BattleState.js.map