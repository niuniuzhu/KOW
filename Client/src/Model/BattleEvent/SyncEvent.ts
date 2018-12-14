import { BaseBattleEvent } from "./BaseBattleEvent";
import Stack from "../../RC/Collections/Stack";

export class SyncEvent extends BaseBattleEvent {

	public static readonly E_BATTLE_INIT: number = 100;
	public static readonly E_SNAPSHOT: number = 101;

	private static readonly POOL: Stack<SyncEvent> = new Stack<SyncEvent>();

	private static Get(): SyncEvent {
		if (SyncEvent.POOL.size() > 0)
			return SyncEvent.POOL.pop();
		return new SyncEvent();
	}

	private static Release(e: SyncEvent): void {
		e.Clear();
		SyncEvent.POOL.push(e);
	}

	private Clear(): void {
		this.data = null;
	}

	/**
	 * 释放事件
	 */
	public Release(): void {
		SyncEvent.Release(this);
	}

	public static BattleInit(data: Uint8Array): void {
		let e = this.Get();
		e._type = SyncEvent.E_BATTLE_INIT;
		e.data = data;
		e.Invoke();
	}

	public static Snapshot(data: Uint8Array): void {
		let e = this.Get();
		e._type = SyncEvent.E_SNAPSHOT;
		e.data = data;
		e.Invoke();
	}

	public data: Uint8Array;
}