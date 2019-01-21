"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FSM {
    constructor() {
        this._typeToState = new Map();
        this._states = [];
    }
    get currentState() { return this._currentState; }
    get previousState() { return this._previousState; }
    AddState(state) {
        if (this._typeToState.has(state.type))
            return false;
        this._typeToState.set(state.type, state);
        this._states.push(state);
        return true;
    }
    RemoveState(type) {
        const state = this._typeToState.get(type);
        if (!state == null)
            return false;
        this._typeToState.delete(type);
        this._states.splice(this._states.indexOf(state), 1);
    }
    HasState(type) {
        return this._typeToState.has(type);
    }
    GetState(type) {
        return this._typeToState.get(type);
    }
    ChangeState(type, param = null, force = false) {
        if (!this._typeToState.has(type))
            return false;
        if (this._currentState != null) {
            if (!force && this._currentState.type == type)
                return false;
            this._currentState.Exit();
            this._previousState = this._currentState;
            this._currentState = null;
        }
        let state = this._typeToState.get(type);
        this._currentState = state;
        this._currentState.Enter(param);
        return true;
    }
    Update(dt) {
        if (this.globalState != null)
            this.globalState.Update(dt);
        if (this._currentState != null)
            this._currentState.Update(dt);
    }
}
exports.FSM = FSM;
