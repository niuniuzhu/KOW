export abstract class AbstractAction {
	public get type(): number { return this._type; }

	private _type: number;

	constructor(type: number) {
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