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
    }
    exports.EntityFSM = EntityFSM;
});
//# sourceMappingURL=EntityFSM.js.map