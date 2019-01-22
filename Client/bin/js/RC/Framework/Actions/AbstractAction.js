define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AbstractAction {
        get type() { return this._type; }
        constructor(type) {
            this._type = type;
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
    exports.AbstractAction = AbstractAction;
});
//# sourceMappingURL=AbstractAction.js.map