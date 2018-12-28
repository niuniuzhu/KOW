define(["require", "exports", "../../RC/Collections/Set", "../../RC/FSM/FSMState", "../../RC/Utils/Hashtable", "./StateEnums", "./Interrupt/IntrptTimeup", "./Interrupt/IntrpInput"], function (require, exports, Set_1, FSMState_1, Hashtable_1, StateEnums_1, IntrptTimeup_1, IntrpInput_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
            this._interrupts = [];
            this._owner = owner;
        }
        get owner() { return this._owner; }
        get time() { return this._time; }
        set time(value) { this._time = value; }
        Init() {
            const def = Hashtable_1.Hashtable.GetMap(Hashtable_1.Hashtable.GetMap(this._owner.defs, "states"), this.type.toString());
            const actionsDef = Hashtable_1.Hashtable.GetMapArray(def, "actions");
            if (actionsDef != null) {
                for (const actionDef of actionsDef) {
                    const type = Hashtable_1.Hashtable.GetNumber(actionDef, "id");
                    const ctr = StateEnums_1.ID_TO_STATE_ACTION.get(type);
                    const action = new ctr(this, type, actionDef);
                    this.AddAction(action);
                }
            }
            const sa = Hashtable_1.Hashtable.GetNumberArray(def, "states_available");
            if (sa != null) {
                this._statesAvailable = new Set_1.default();
                for (const type of sa) {
                    this._statesAvailable.add(type);
                }
            }
            const interruptDefs = Hashtable_1.Hashtable.GetMapArray(def, "interrupts");
            if (interruptDefs) {
                for (const interruptDef of interruptDefs) {
                    this.CreateInturrupt(interruptDef);
                }
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
    exports.EntityState = EntityState;
});
//# sourceMappingURL=EntityState.js.map