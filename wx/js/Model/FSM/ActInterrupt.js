import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityStateAction } from "./EntityStateAction";
import { IntrpInput } from "./Interrupt/IntrpInput";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";
import { InterruptType } from "./StateEnums";
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
        let interrupt;
        switch (id) {
            case InterruptType.Timeup:
                interrupt = new IntrptTimeup(this, def);
                break;
            case InterruptType.Collision:
                break;
            case InterruptType.Input:
                interrupt = new IntrpInput(this, def);
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
