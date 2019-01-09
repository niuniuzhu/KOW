import { FSM } from "../../../RC/FSM/FSM";
export class EntityFSM extends FSM {
    get currentEntityState() { return this.currentState; }
    get previousEntityState() { return this.previousState; }
    get globalEntityState() { return this.globalState; }
    Init(statesDef) {
        for (const state of this._states) {
            const entityFSM = state;
            entityFSM.Init(statesDef);
        }
    }
    UpdatePhysic(dt) {
        if (this.globalEntityState != null)
            this.globalEntityState.UpdatePhysic(dt);
        if (this.currentEntityState != null)
            this.currentEntityState.UpdatePhysic(dt);
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
        writer.fork();
        for (const state of this._states) {
            const entityFSM = state;
            entityFSM.EncodeSnapshot(writer);
        }
        if (this.globalEntityState != null) {
            this.globalEntityState.EncodeSnapshot(writer);
        }
        writer.ldelim();
        writer.bool(this.currentEntityState != null);
        if (this.currentEntityState != null)
            writer.int32(this.currentEntityState.type);
        writer.bool(this.previousEntityState != null);
        if (this.previousEntityState != null)
            writer.int32(this.previousEntityState.type);
    }
    DecodeSnapshot(reader) {
        reader.int32();
        for (const state of this._states) {
            const entityFSM = state;
            entityFSM.DecodeSnapshot(reader);
        }
        if (this.globalEntityState != null) {
            this.globalEntityState.DecodeSnapshot(reader);
        }
        if (reader.bool()) {
            this._currentState = this.GetState(reader.int32());
        }
        if (reader.bool()) {
            this._previousState = this.GetState(reader.int32());
        }
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
