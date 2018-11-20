define(["require", "exports", "./VEntityState"], function (require, exports, VEntityState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VMove extends VEntityState_1.VEntityState {
        OnEnter(param) {
            this.owner.PlayAnim("run");
        }
        OnExit() {
        }
        OnUpdate(dt) {
        }
    }
    exports.VMove = VMove;
});
//# sourceMappingURL=VMove.js.map