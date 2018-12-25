import { FSMState } from "./FSMState";
import { ActionType } from "../../Model/FSM/StateEnums";

export class FSMStateAction {
	public get type(): ActionType { return this._type; }
	public get state(): FSMState { return this._state; }

	private _state: FSMState;
	private _type: ActionType;

	constructor(state: FSMState, type: ActionType) {
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