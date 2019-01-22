import { AbstractAction } from "../Actions/AbstractAction";

export class FSMState {
	protected readonly _type: number;
	protected readonly _actions: AbstractAction[] = [];
	protected readonly _typeToAction = new Map<number, AbstractAction>();

	public get type(): number { return this._type; }

	constructor(type: number) {
		this._type = type;
	}

	public AddAction(action: AbstractAction): boolean {
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

	public GetAction(type: number): AbstractAction {
		return this._typeToAction.get(type);
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

	public Update(dt: number): void {
		for (const action of this._actions) {
			action.Update(dt);
		}
		this.OnUpdate(dt);
	}

	protected OnEnter(param: any): void {
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: number): void {
	}
}