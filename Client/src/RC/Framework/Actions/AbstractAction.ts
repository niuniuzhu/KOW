import { FSMState } from "../FSM/FSMState";

export class AbstractAction {
	public get type(): number { return this._type; }
	public get state(): FSMState { return this._state; }

	private _state: FSMState;
	private _type: number;

	constructor(state: FSMState, type: number) {
		this._state = state;
		this._type = type;
	}

	public Enter(param: any): void {
		this.OnEnter(param);
	}

	public Exit(): void {
		this.OnExit();
	}

	public Update(dt: number): void {
		this.OnUpdate(dt);
	}

	protected OnEnter(param: any): void {
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: number): void {
	}
}