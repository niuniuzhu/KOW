define(["require", "exports", "./SceneState", "../Global"], function (require, exports, SceneState_1, Global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.main;
        }
    }
    exports.MainState = MainState;
});
//# sourceMappingURL=MainState.js.map