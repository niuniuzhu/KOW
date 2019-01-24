define(["require", "exports", "../Global", "./SceneState"], function (require, exports, Global_1, SceneState_1) {
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