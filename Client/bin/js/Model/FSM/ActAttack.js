define(["require", "exports", "../../RC/Utils/Hashtable", "./EntityStateAction"], function (require, exports, Hashtable_1, EntityStateAction_1) {
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