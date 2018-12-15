import Decimal from "../../Libs/decimal";
import { FSMStateAction } from "./FSMStateAction";

export class FSMState {
	private readonly _type: number;
	private readonly _actions: FSMStateAction[] = [];

	public get type(): number { return this._type; }

	constructor(type: number) {
		this._type = type;
	}

	public AddAction(action: FSMStateAction): void {
		this._actions.push(action);
	}

	public RemoveAction(action: FSMStateAction): void {
		this._actions.splice(this._actions.indexOf(action), 1);
	}

	public GetAction(index: number): FSMStateAction {
		return this._actions[index];
	}

	public Enter(param: any): void {
		this.OnEnter(param);
		for (const action of this._actions) {
			action.Enter(param);
		}
	}

	public Exit(): void {
		for (const action of this._actions) {
			action.Exit();
		}
		this.OnExit();
	}

	public Update(dt: Decimal | number): void {
		this.OnUpdate(dt);
		for (const action of this._actions) {
			action.Update(dt);
		}
	}

	protected OnEnter(param: any): void {
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: Decimal | number): void {
	}
}