import { BaseBattleEvent } from "./BaseBattleEvent";

export class BattleEventMgr {
	private static readonly HANDLERS: Map<number, (e: BaseBattleEvent) => void> = new Map<number, (e: BaseBattleEvent) => void>();

	public static AddListener(type: number, handler: (e: BaseBattleEvent) => void): void {
		this.HANDLERS.set(type, handler);
	}

	public static RemoveListener(type: number): void {
		this.HANDLERS.delete(type);
	}

	public static Invoke(e: BaseBattleEvent): void {
		if (!this.HANDLERS.has(e.type))
			return;
		this.HANDLERS.get(e.type)(e);
		e.Release();
	}
}