import Set from "../../../RC/Collections/Set";
import { FSMState } from "../../../RC/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { IntrptCollider } from "./Interrupt/IntrptCollider";
import { IntrptInput } from "./Interrupt/IntrptInput";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";
import { ID_TO_STATE_ACTION, InterruptType } from "../../StateEnums";
export class EntityState extends FSMState {
    constructor(type, owner) {
        super(type);
        this.time = 0;
        this._interrupts = [];
        this._typeToIntrerrupt = new Map();
        this._owner = owner;
    }
    get owner() { return this._owner; }
    Init(statesDef) {
        const def = Hashtable.GetMap(statesDef, this.type.toString());
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
        if (interruptDefs) {
            for (const interruptDef of interruptDefs) {
                this.CreateInturrupt(interruptDef);
            }
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
                interrupt = new IntrptCollider(this, def);
                break;
            case InterruptType.Input:
                interrupt = new IntrptInput(this, def);
                break;
        }
        this._interrupts.push(interrupt);
        this._typeToIntrerrupt.set(id, interrupt);
    }
    RemoveInterrupt(type) {
        const interrupt = this._typeToIntrerrupt.get(type);
        if (!interrupt == null)
            return false;
        this._typeToIntrerrupt.delete(type);
        this._interrupts.splice(this._interrupts.indexOf(interrupt), 1);
    }
    GetInterrupt(id) {
        return this._typeToIntrerrupt.get(id);
    }
    EncodeSnapshot(writer) {
        writer.int32(this.time);
        for (const action of this._actions) {
            action.EncodeSnapshot(writer);
        }
        for (const interrupt of this._interrupts) {
            interrupt.EncodeSnapshot(writer);
        }
    }
    DecodeSnapshot(reader) {
        this.time = reader.int32();
        for (const action of this._actions) {
            action.DecodeSnapshot(reader);
        }
        for (const interrupt of this._interrupts) {
            interrupt.DecodeSnapshot(reader);
        }
    }
    OnEnter(param) {
        this.time = 0;
        for (const interrupt of this._interrupts) {
            interrupt.Enter();
        }
    }
    OnExit() {
        for (const interrupt of this._interrupts) {
            interrupt.Exit();
        }
    }
    OnUpdate(dt) {
        for (const interrupt of this._interrupts) {
            interrupt.Update(dt);
        }
        this.time += dt;
    }
    UpdatePhysic(dt) {
        for (const action of this._actions) {
            action.UpdatePhysic(dt);
        }
        for (const interrupt of this._interrupts) {
            interrupt.UpdatePhysic(dt);
        }
    }
    IsStateAvailable(type) {
        return this._statesAvailable == null || this._statesAvailable.contains(type);
    }
    HandleInput(type, press) {
        for (const action of this._actions) {
            action.HandlInput(type, press);
        }
        for (const interrupt of this._interrupts) {
            interrupt.HandleInput(type, press);
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
        str += `time:${this.time}\n`;
        return str;
    }
}
