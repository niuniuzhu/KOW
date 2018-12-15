import Decimal from "../../Libs/decimal";
import { FSMState } from "./FSMState";

export class FSMStateAction {
	private _state: FSMState;

	public get state(): FSMState { return this._state; }

	constructor(state: FSMState) {
		this._state = state;
	}

	public Enter(param: any): void {
		this.OnEnter(param);
	}

	public Exit(): void {
		this.OnExit();
	}

	public Update(dt: number | Decimal): void {
		this.OnUpdate(dt);
	}

	protected OnEnter(param: any): void {
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: number | Decimal): void {
	}
}