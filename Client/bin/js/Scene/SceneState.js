define(["require", "exports", "../RC/FSM/FSMState"], function (require, exports, FSMState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SceneState extends FSMState_1.FSMState {
        constructor(type) {
            super(type);
        }
        OnEnter(param) {
            if (this.__ui != null)
                this.__ui.Enter(param);
        }
        OnExit() {
            if (this.__ui != null)
                this.__ui.Exit();
        }
        OnUpdate(dt) {
            if (this.__ui != null)
                this.__ui.Update(dt);
        }
    }
    exports.SceneState = SceneState;
});
//# sourceMappingURL=SceneState.js.map