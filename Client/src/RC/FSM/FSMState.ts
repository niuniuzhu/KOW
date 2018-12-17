import Decimal from "../../Libs/decimal";
import { StateType } from "../../Model/FSM/StateEnums";
import { FSMStateAction } from "./FSMStateAction";

export class FSMState {
	private readonly _type: StateType;
	private readonly _actions: FSMStateAction[] = [];

	public get type(): StateType { return this._type; }

	constructor(type: StateType) {
		this._type = type;
	}

	public AddAction(action: FSMStateAction): void {
		this._actions.push(action);
	}

	public RemoveAction(action: FSMStateAction): void {
		this._actions.splice(this._actions.indexOf(action), 1);
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