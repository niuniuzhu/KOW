define(["require", "exports", "./EntityStateAction", "../../RC/Utils/Hashtable"], function (require, exports, EntityStateAction_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActAttack extends EntityStateAction_1.EntityStateAction {
        OnTrigger() {
            super.OnTrigger();
            const emitterID = Hashtable_1.Hashtable.GetNumber(this._def, "emitter");
        }
    }
    exports.ActAttack = ActAttack;
});
//# sourceMappingURL=ActAttack.js.map