export class AbstractAction {
    get type() { return this._type; }
    constructor(type) {
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
