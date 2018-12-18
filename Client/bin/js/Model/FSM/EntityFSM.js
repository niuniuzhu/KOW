define(["require", "exports", "../../RC/FSM/FSM"], function (require, exports, FSM_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityFSM extends FSM_1.FSM {
        get currentEntityState() { return this.currentState; }
        get previousEntityState() { return this.previousState; }
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
            if (this.globalState != null) {
                this.globalState.EncodeSnapshot(writer);
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
            if (this.globalState != null) {
                this.globalState.DecodeSnapshot(reader);
            }
            this._currentState = this.GetState(reader.int32());
            const b = reader.bool();
            if (b)
                this._previousState = this.GetState(reader.int32());
        }
    }
    exports.EntityFSM = EntityFSM;
});
//# sourceMappingURL=EntityFSM.js.map