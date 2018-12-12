import Decimal from "../../Libs/decimal";

export class FSMState {
	private _type: number;

	public get type(): number { return this._type; }

	constructor(type: number) {
		this._type = type;
	}

	public Enter(param: any): void {
		this.OnEnter(param);
	}

	public Exit(): void {
		this.OnExit();
	}

	public Update(dt: Decimal | number): void {
		this.OnUpdate(dt);
	}

	protected OnEnter(param: any): void {
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: Decimal | number): void {
	}
}