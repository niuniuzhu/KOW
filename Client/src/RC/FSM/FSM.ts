import Decimal from "../../Libs/decimal";
import { FSMState } from "./FSMState";

export class FSM {
	protected readonly _stateMap: Map<number, FSMState>;
	private _currentState: FSMState;
	private _previousState: FSMState;

	public get currentState(): FSMState { return this._currentState; }
	public get previousState(): FSMState { return this._previousState; }
	public globalState: FSMState;

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

	public ExitState(type: number): boolean {
		if (!this._stateMap.has(type))
			return false;
		let state = this._stateMap.get(type);
		state.Exit();
		return true;
	}

	public ChangeState(type: number, param: any = null, force: boolean = false): boolean {
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

	public Update(dt: Decimal | number): void {
		if (this.globalState != null)
			this.globalState.Update(dt);
		if (this._currentState != null)
			this._currentState.Update(dt);
	}
}