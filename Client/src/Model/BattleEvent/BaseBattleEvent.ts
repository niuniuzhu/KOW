import { BattleEventMgr } from "./BattleEventMgr";

export abstract class BaseBattleEvent {
	public __type: number;

	public get type(): number {
		return this.__type;
	}

	protected set _type(value: number) {
		this.__type = value;
	}

	protected Invoke(): void {
		BattleEventMgr.Invoke(this);
	}

	public abstract Release();
}