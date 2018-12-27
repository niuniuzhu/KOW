import { FSM } from "../../RC/FSM/FSM";
export class EntityFSM extends FSM {
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
        writer.bool(this.currentEntityState != null);
        if (this.currentEntityState != null)
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
        if (reader.bool())
            this._currentState = this.GetState(reader.int32());
        if (reader.bool())
            this._previousState = this.GetState(reader.int32());
    }
    HandleInput(type, press) {
        this.currentEntityState.HandleInput(type, press);
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
