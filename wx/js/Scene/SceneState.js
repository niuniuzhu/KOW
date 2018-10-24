import { FSMState } from "../FSM/FSMState";
export class SceneState extends FSMState {
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
//# sourceMappingURL=SceneState.js.map