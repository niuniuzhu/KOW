define(["require", "exports", "./EntityAction"], function (require, exports, EntityAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActShake extends EntityAction_1.EntityAction {
        OnExit() {
            this.owner.fsm.context.shakeTime = this.time;
            super.OnExit();
        }
    }
    exports.ActShake = ActShake;
});
//# sourceMappingURL=ActShake.js.map