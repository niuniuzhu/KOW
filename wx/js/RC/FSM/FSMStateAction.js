export class FSMStateAction {
    get type() { return this._type; }
    get state() { return this._state; }
    constructor(state, type) {
        this._state = state;
        this._type = type;
    }
    Enter(param) {
        this.OnEnter(param);
    }
    Exit() {
        this.OnExit();
    }
    Update(dt) {
        this.OnUpdate(dt);
    }
    OnEnter(param) {
    }
    OnExit() {
    }
    OnUpdate(dt) {
    }
}
