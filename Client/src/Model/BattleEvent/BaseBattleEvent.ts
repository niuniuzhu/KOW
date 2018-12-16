export abstract class BaseBattleEvent {
	public __type: number;

	public get type(): number {
		return this.__type;
	}

	protected set _type(value: number) {
		this.__type = value;
	}

	public abstract Release();
}