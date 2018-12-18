import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityStateAction } from "./EntityStateAction";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";
export var InterruptType;
(function (InterruptType) {
    InterruptType[InterruptType["Timeup"] = 0] = "Timeup";
    InterruptType[InterruptType["Collision"] = 1] = "Collision";
})(InterruptType || (InterruptType = {}));
export class ActInterrupt extends EntityStateAction {
    constructor(state, type, def) {
        super(state, type, def);
        this._interrupts = [];
        const interruptDefs = Hashtable.GetMapArray(this._def, "interrupts");
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
        const id = Hashtable.GetNumber(def, "id");
        switch (id) {
            case InterruptType.Timeup:
                const interrupt = new IntrptTimeup(this, def);
                this._interrupts.push(interrupt);
                break;
            case InterruptType.Collision:
                break;
        }
    }
    OnUpdate(dt) {
        for (const interrupt of this._interrupts) {
            interrupt.Update(dt);
        }
        super.OnUpdate(dt);
    }
}
