import Decimal from "../../Libs/decimal";
import { FSMStateAction } from "./FSMStateAction";

export class FSMState {
	protected readonly _type: number;
	protected readonly _actions: FSMStateAction[] = [];
	protected readonly _typeToAction = new Map<number, FSMStateAction>();

	public get type(): number { return this._type; }

	constructor(type: number) {
		this._type = type;
	}

	public AddAction(action: FSMStateAction): boolean {
		if (this._typeToAction.has(action.type))
			return false;
		this._typeToAction.set(action.type, action);
		this._actions.push(action);
		return true;
	}

	public RemoveAction(type: number): boolean {
		const action = this._typeToAction.get(type);
		if (!action == null)
			return false;
		this._typeToAction.delete(type);
		this._actions.splice(this._actions.indexOf(action), 1);
	}

	public GetAction(id: number): FSMStateAction {
		return this._typeToAction.get(id);
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