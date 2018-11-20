define(["require", "exports", "./VEntityState"], function (require, exports, VEntityState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VIdle extends VEntityState_1.VEntityState {
        OnEnter(param) {
            this.owner.PlayAnim("stand");
        }
        OnExit() {
        }
        OnUpdate(dt) {
        }
    }
    exports.VIdle = VIdle;
});
//# sourceMappingURL=VIdle.js.map