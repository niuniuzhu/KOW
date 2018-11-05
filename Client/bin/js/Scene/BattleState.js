define(["require", "exports", "./SceneState", "../Global"], function (require, exports, SceneState_1, Global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.battle;
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
    exports.BattleState = BattleState;
});
//# sourceMappingURL=BattleState.js.map