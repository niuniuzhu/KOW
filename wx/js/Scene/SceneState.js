"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FSMState_1 = require("../RC/FSM/FSMState");
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
