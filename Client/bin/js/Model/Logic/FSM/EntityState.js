define(["require", "exports", "../../../RC/Collections/Set", "../../../RC/FSM/FSMState", "../../../RC/Utils/Hashtable", "./Interrupt/IntrptCollider", "./Interrupt/IntrptInput", "./Interrupt/IntrptTimeup", "../../StateEnums"], function (require, exports, Set_1, FSMState_1, Hashtable_1, IntrptCollider_1, IntrptInput_1, IntrptTimeup_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
            this.time = 0;
            this._interrupts = [];
            this._typeToIntrerrupt = new Map();
            this._owner = owner;
        }
        get owner() { return this._owner; }
        Init(statesDef) {
            const def = Hashtable_1.Hashtable.GetMap(statesDef, this.type.toString());
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
                    interrupt = new IntrptCollider_1.IntrptCollider(this, def);
                    break;
                case StateEnums_1.InterruptType.Input:
                    interrupt = new IntrptInput_1.IntrptInput(this, def);
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
    exports.EntityState = EntityState;
});
//# sourceMappingURL=EntityState.js.map