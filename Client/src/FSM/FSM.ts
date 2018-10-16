import { FSMState } from "./FSMState";

export class FSM {
    private readonly _stateMap: Map<number, FSMState>;
    private _currentState: FSMState;
    private _previousState: FSMState;

    public get currentState(): FSMState { return this._currentState; }
    public get previousState(): FSMState { return this._previousState; }

    constructor() {
        this._stateMap = new Map<number, FSMState>();
    }

    public AddState(state: FSMState): boolean {
        if (this._stateMap.has(state.type))
            return false;
        this._stateMap.set(state.type, state);
        return true;
    }

    public RemoveState(type: number): boolean {
        return this._stateMap.delete(type);
    }

    public HasState(type: number): boolean {
        return this._stateMap.has(type);
    }

    public LeaveState(type: number): boolean {
        if (!this._stateMap.has(type))
            return false;
        let state = this._stateMap.get(type);
        state.Exit();
        return true;
    }

    public ChangeState(type: number, param: any = null, force: boolean = false): boolean {
        if (!this._stateMap.has(type))
            return false;
        let state = this._stateMap.get(type);
        if (!force && state.type == type)
            return false;
        if (this._currentState != null) {
            this._currentState.Exit();
            this._previousState = this._currentState;
            this._currentState = null;
        }
        this._currentState = state;
        this._currentState.Enter(param);
    }

    public Update(dt: number): void {
        if (this._currentState == null)
            return;
        this._currentState.Update(dt);
    }
}