export class FSM {
    get currentState() { return this._currentState; }
    get previousState() { return this._previousState; }
    constructor() {
        this._stateMap = new Map();
    }
    AddState(state) {
        if (this._stateMap.has(state.type))
            return false;
        this._stateMap.set(state.type, state);
        return true;
    }
    RemoveState(type) {
        return this._stateMap.delete(type);
    }
    HasState(type) {
        return this._stateMap.has(type);
    }
    ExitState(type) {
        if (!this._stateMap.has(type))
            return false;
        let state = this._stateMap.get(type);
        state.Exit();
        return true;
    }
    ChangeState(type, param = null, force = false) {
        if (!this._stateMap.has(type))
            return false;
        if (this._currentState != null) {
            if (!force && this._currentState.type == type)
                return false;
            this._currentState.Exit();
            this._previousState = this._currentState;
            this._currentState = null;
        }
        let state = this._stateMap.get(type);
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
