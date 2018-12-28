import Set from "../../RC/Collections/Set";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ID_TO_STATE_ACTION, InterruptType } from "./StateEnums";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";
import { IntrpInput } from "./Interrupt/IntrpInput";
export class EntityState extends FSMState {
    constructor(type, owner) {
        super(type);
        this._interrupts = [];
        this._owner = owner;
    }
    get owner() { return this._owner; }
    get time() { return this._time; }
    set time(value) { this._time = value; }
    Init() {
        const def = Hashtable.GetMap(Hashtable.GetMap(this._owner.defs, "states"), this.type.toString());
        const actionsDef = Hashtable.GetMapArray(def, "actions");
        if (actionsDef != null) {
            for (const actionDef of actionsDef) {
                const type = Hashtable.GetNumber(actionDef, "id");
                const ctr = ID_TO_STATE_ACTION.get(type);
                const action = new ctr(this, type, actionDef);
                this.AddAction(action);
            }
        }
        const sa = Hashtable.GetNumberArray(def, "states_available");
        if (sa != null) {
            this._statesAvailable = new Set();
            for (const type of sa) {
                this._statesAvailable.add(type);
            }
        }
        const interruptDefs = Hashtable.GetMapArray(def, "interrupts");
        for (const interruptDef of interruptDefs) {
            this.CreateInturrupt(interruptDef);
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
    EncodeSnapshot(writer) {
        for (const action of this._actions) {
            action.EncodeSnapshot(writer);
        }
        writer.int32(this._time);
        for (const interrupt of this._interrupts) {
            interrupt.EncodeSnapshot(writer);
        }
    }
    DecodeSnapshot(reader) {
        for (const action of this._actions) {
            action.DecodeSnapshot(reader);
        }
        this._time = reader.int32();
        for (const interrupt of this._interrupts) {
            interrupt.DecodeSnapshot(reader);
        }
    }
    OnEnter(param) {
        this._time = 0;
    }
    OnUpdate(dt) {
        this._time += dt;
        for (const interrupt of this._interrupts) {
            interrupt.Update(dt);
        }
    }
    IsStateAvailable(type) {
        return this._statesAvailable == null || this._statesAvailable.contains(type);
    }
    HandleInput(type, press) {
        for (const interrupt of this._interrupts) {
            interrupt.HandleInput(type, press);
        }
        for (const action of this._actions) {
            action.HandlInput(type, press);
        }
    }
    Dump() {
        let str = "";
        str += `interrupt count:${this._interrupts.length}\n`;
        for (const interrupt of this._interrupts) {
            str += interrupt.Dump();
        }
        str += `action count:${this._actions.length}\n`;
        for (const action of this._actions) {
            str += action.Dump();
        }
        str += `time:${this._time}\n`;
        return str;
    }
}
