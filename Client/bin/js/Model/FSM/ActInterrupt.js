define(["require", "exports", "../../RC/Utils/Hashtable", "./EntityStateAction", "./Interrupt/IntrptTimeup"], function (require, exports, Hashtable_1, EntityStateAction_1, IntrptTimeup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterruptType;
    (function (InterruptType) {
        InterruptType[InterruptType["Timeup"] = 0] = "Timeup";
        InterruptType[InterruptType["Collision"] = 1] = "Collision";
    })(InterruptType = exports.InterruptType || (exports.InterruptType = {}));
    class ActInterrupt extends EntityStateAction_1.EntityStateAction {
        constructor(state, id, def) {
            super(state, id, def);
            this._interrupts = [];
            const interruptDefs = Hashtable_1.Hashtable.GetMapArray(def, "interrupts");
            for (const interruptDef of interruptDefs) {
                this.CreateInturrupt(interruptDef);
            }
        }
        OnUpdate(dt) {
            for (const interrupt of this._interrupts) {
                interrupt.Update(dt);
            }
        }
        CreateInturrupt(def) {
            const id = Hashtable_1.Hashtable.GetNumber(def, "id");
            switch (id) {
                case InterruptType.Timeup:
                    const interrupt = new IntrptTimeup_1.IntrptTimeup(this, def);
                    this._interrupts.push(interrupt);
                    break;
                case InterruptType.Collision:
                    break;
            }
        }
    }
    exports.ActInterrupt = ActInterrupt;
});
//# sourceMappingURL=ActInterrupt.js.map