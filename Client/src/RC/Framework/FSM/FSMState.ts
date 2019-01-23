import { AbstractAction } from "../Actions/AbstractAction";

export class FSMState {
	protected readonly _type: number;
	protected readonly _actions: AbstractAction[] = [];

	public get type(): number { return this._type; }

	constructor(type: number) {
		this._type = type;
	}

	public AddAction(action: AbstractAction): boolean {
		this._actions.push(action);
		return true;
	}

	public RemoveAction(action: AbstractAction): void {
		this._actions.splice(this._actions.indexOf(action), 1);
	}

	public GetAction(type: number): AbstractAction {
		for (const action of this._actions) {
			if (action.type == type) {
				return action;
			}
		}
		return null;
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