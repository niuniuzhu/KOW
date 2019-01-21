"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FSMState {
    constructor(type) {
        this._actions = [];
        this._typeToAction = new Map();
        this._type = type;
    }
    get type() { return this._type; }
    AddAction(action) {
        if (this._typeToAction.has(action.type))
            return false;
        this._typeToAction.set(action.type, action);
        this._actions.push(action);
        return true;
    }
    RemoveAction(type) {
        const action = this._typeToAction.get(type);
        if (!action == null)
            return false;
        this._typeToAction.delete(type);
        this._actions.splice(this._actions.indexOf(action), 1);
    }
    GetAction(id) {
        return this._typeToAction.get(id);
    }
    Enter(param) {
        this.OnEnter(param);
        for (const action of this._actions) {
            action.Enter(param);
        }
    }
    Exit() {
        for (const action of this._actions) {
            action.Exit();
        }
        this.OnExit();
    }
    Update(dt) {
        for (const action of this._actions) {
            action.Update(dt);
        }
        this.OnUpdate(dt);
    }
    OnEnter(param) {
    }
    OnExit() {
    }
    OnUpdate(dt) {
    }
}
exports.FSMState = FSMState;
