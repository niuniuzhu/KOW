define(["require", "exports", "../../RC/Utils/Hashtable", "./EntityStateAction", "./Interrupt/IntrpInput", "./Interrupt/IntrptTimeup", "./StateEnums"], function (require, exports, Hashtable_1, EntityStateAction_1, IntrpInput_1, IntrptTimeup_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActInterrupt extends EntityStateAction_1.EntityStateAction {
        constructor(state, type, def) {
            super(state, type, def);
            this._interrupts = [];
            const interruptDefs = Hashtable_1.Hashtable.GetMapArray(this._def, "interrupts");
            for (const interruptDef of interruptDefs) {
                this.CreateInturrupt(interruptDef);
            }
        }
        EncodeSnapshot(writer) {
            super.EncodeSnapshot(writer);
            for (const interrupt of this._interrupts) {
                interrupt.EncodeSnapshot(writer);
            }
        }
        DecodeSnapshot(reader) {
            super.DecodeSnapshot(reader);
            for (const interrupt of this._interrupts) {
                interrupt.DecodeSnapshot(reader);
            }
        }
        CreateInturrupt(def) {
            const id = Hashtable_1.Hashtable.GetNumber(def, "id");
            let interrupt;
            switch (id) {
                case StateEnums_1.InterruptType.Timeup:
                    interrupt = new IntrptTimeup_1.IntrptTimeup(this, def);
                    break;
                case StateEnums_1.InterruptType.Collision:
                    break;
                case StateEnums_1.InterruptType.Input:
                    interrupt = new IntrpInput_1.IntrpInput(this, def);
                    break;
            }
            this._interrupts.push(interrupt);
        }
        OnUpdate(dt) {
            for (const interrupt of this._interrupts) {
                interrupt.Update(dt);
            }
            super.OnUpdate(dt);
        }
        HandlInput(type, press) {
            for (const interrupt of this._interrupts) {
                interrupt.HandleInput(type, press);
            }
        }
        Dump() {
            let str = super.Dump();
            str += `interrupt count:${this._interrupts.length}\n`;
            for (const interrupt of this._interrupts) {
                str += interrupt.Dump();
            }
            return str;
        }
    }
    exports.ActInterrupt = ActInterrupt;
});
//# sourceMappingURL=ActInterrupt.js.map