define(["require", "exports", "../../RC/FSM/FSM"], function (require, exports, FSM_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityFSM extends FSM_1.FSM {
        Init() {
            this._stateMap.forEach((state, type, _) => {
                const entityFSM = state;
                entityFSM.Init();
            });
        }
        ChangeState(type, param = null, igroneIntrptList = false, force = false) {
            if (!igroneIntrptList) {
                const state = this.currentState;
                if (state != null &&
                    !state.IsStateAvailable(type)) {
                    return false;
                }
            }
            return super.ChangeState(type, param, force);
        }
    }
    exports.EntityFSM = EntityFSM;
});
//# sourceMappingURL=EntityFSM.js.map