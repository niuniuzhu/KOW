define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FSMStateAction {
        get state() { return this._state; }
        constructor(state) {
            this._state = state;
        }
        Enter(param) {
            this.OnEnter(param);
        }
        Exit() {
            this.OnExit();
        }
        Update(dt) {
            this.OnUpdate(dt);
        }
        OnEnter(param) {
        }
        OnExit() {
        }
        OnUpdate(dt) {
        }
    }
    exports.FSMStateAction = FSMStateAction;
});
//# sourceMappingURL=FSMStateAction.js.map