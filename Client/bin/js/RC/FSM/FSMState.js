define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FSMState {
        constructor(type) {
            this._actions = [];
            this._type = type;
        }
        get type() { return this._type; }
        AddAction(action) {
            this._actions.push(action);
        }
        RemoveAction(action) {
            this._actions.splice(this._actions.indexOf(action), 1);
        }
        GetAction(index) {
            return this._actions[index];
        }
        Enter(param) {
            this.OnEnter(param);
            for (const action of this._actions) {
                action.Enter(param);
            }
        }
        Exit() {
            for (const action of this._actions) {
                action.Exit();
            }
            this.OnExit();
        }
        Update(dt) {
            this.OnUpdate(dt);
            for (const action of this._actions) {
                action.Update(dt);
            }
        }
        OnEnter(param) {
        }
        OnExit() {
        }
        OnUpdate(dt) {
        }
    }
    exports.FSMState = FSMState;
});
//# sourceMappingURL=FSMState.js.map