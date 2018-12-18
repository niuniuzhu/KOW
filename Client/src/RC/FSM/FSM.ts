import Decimal from "../../Libs/decimal";
import { FSMState } from "./FSMState";

export class FSM {
	protected readonly _typeToState: Map<number, FSMState> = new Map<number, FSMState>();
	protected readonly _states: FSMState[] = [];
	protected _currentState: FSMState;
	protected _previousState: FSMState;

	public get currentState(): FSMState { return this._currentState; }
	public get previousState(): FSMState { return this._previousState; }
	public globalState: FSMState;

	public AddState(state: FSMState): boolean {
		if (this._typeToState.has(state.type))
			return false;
		this._typeToState.set(state.type, state);
		this._states.push(state);
		return true;
	}

	public RemoveState(type: number): boolean {
		const state = this._typeToState.get(type);
		if (!state == null)
			return false;
		this._typeToState.delete(type);
		this._states.splice(this._states.indexOf(state), 1);
	}

	public HasState(type: number): boolean {
		return this._typeToState.has(type);
	}

	public GetState(type: number): FSMState {
		return this._typeToState.get(type);
	}

	public ChangeState(type: number, param: any = null, force: boolean = false): boolean {
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

	public Update(dt: Decimal | number): void {
		if (this.globalState != null)
			this.globalState.Update(dt);
		if (this._currentState != null)
			this._currentState.Update(dt);
	}
}