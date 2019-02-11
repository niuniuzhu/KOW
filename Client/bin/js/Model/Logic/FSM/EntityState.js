define(["require", "exports", "../../../RC/Collections/Set", "../../../RC/Framework/FSM/FSMState", "../../../RC/Utils/Hashtable", "../../Defines"], function (require, exports, Set_1, FSMState_1, Hashtable_1, Defines_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityState extends FSMState_1.FSMState {
        constructor(type, owner) {
            super(type);
            this._time = 0;
            this._owner = owner;
        }
        get owner() { return this._owner; }
        get time() { return this._time; }
        Init(def) {
            const actionsDef = Hashtable_1.Hashtable.GetMapArray(def, "actions");
            if (actionsDef != null) {
                for (const actionDef of actionsDef) {
                    const type = Hashtable_1.Hashtable.GetNumber(actionDef, "id");
                    const ctr = Defines_1.STATE_ACTION_CTOR_MAP.get(type);
                    const action = new ctr(this._owner, type);
                    action.Init(actionDef);
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
        }
        EncodeSnapshot(writer) {
            writer.int32(this._time);
            for (const action of this._actions) {
                action.EncodeSnapshot(writer);
            }
        }
        DecodeSnapshot(reader) {
            this._time = reader.int32();
            for (const action of this._actions) {
                action.DecodeSnapshot(reader);
            }
        }
        OnEnter(param) {
            this._time = 0;
        }
        OnUpdate(dt) {
            this._time += dt;
        }
        UpdatePhysic(dt) {
            for (const action of this._actions) {
                action.UpdatePhysic(dt);
            }
        }
        HandleInput(type, press) {
            for (const action of this._actions) {
                action.HandlInput(type, press);
            }
        }
        IsStateAvailable(type) {
            return this._statesAvailable == null || this._statesAvailable.contains(type);
        }
        Dump() {
            let str = "========\n";
            str += `type:${this.type}\n`;
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