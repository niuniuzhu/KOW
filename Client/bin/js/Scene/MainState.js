define(["require", "exports", "./SceneState", "../UI/UIManager"], function (require, exports, SceneState_1, UIManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = UIManager_1.UIManager.main;
        }
    }
    exports.MainState = MainState;
});
//# sourceMappingURL=MainState.js.map