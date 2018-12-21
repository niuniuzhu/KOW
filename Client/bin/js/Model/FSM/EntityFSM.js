define(["require", "exports", "../../RC/FSM/FSM"], function (require, exports, FSM_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityFSM extends FSM_1.FSM {
        get currentEntityState() { return this.currentState; }
        get previousEntityState() { return this.previousState; }
        get globalEntityState() { return this.globalState; }
        Init() {
            for (const state of this._states) {
                const entityFSM = state;
                entityFSM.Init();
            }
        }
        ChangeState(type, param = null, igroneIntrptList = false, force = false) {
            if (!igroneIntrptList) {
                const state = this.currentState;
                if (state != null &&
                    !state.IsStateAvailable(type)) {
                    return false;
                }
            }
            return super.ChangeState(type, param, force);
        }
        EncodeSnapshot(writer) {
            for (const state of this._states) {
                const entityFSM = state;
                entityFSM.EncodeSnapshot(writer);
            }
            if (this.globalEntityState != null) {
                this.globalEntityState.EncodeSnapshot(writer);
            }
            writer.int32(this.currentEntityState.type);
            writer.bool(this.previousEntityState != null);
            if (this.previousEntityState != null)
                writer.int32(this.previousEntityState.type);
        }
        DecodeSnapshot(reader) {
            for (const state of this._states) {
                const entityFSM = state;
                entityFSM.DecodeSnapshot(reader);
            }
            if (this.globalEntityState != null) {
                this.globalEntityState.DecodeSnapshot(reader);
            }
            this._currentState = this.GetState(reader.int32());
            const b = reader.bool();
            if (b)
                this._previousState = this.GetState(reader.int32());
        }
        Dump() {
            let str = "";
            str += `state count:${this._states.length}\n`;
            for (const state of this._states) {
                str += state.Dump();
            }
            if (this.globalEntityState != null) {
                str += `global state:${this.globalEntityState.Dump()}\n`;
            }
            str += "current state:" + this.currentEntityState.Dump();
            if (this.previousEntityState != null)
                str += `previous state:${this.previousEntityState.Dump()}\n`;
            return str;
        }
    }
    exports.EntityFSM = EntityFSM;
});
//# sourceMappingURL=EntityFSM.js.map