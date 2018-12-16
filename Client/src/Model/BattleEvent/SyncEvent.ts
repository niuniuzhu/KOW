import Stack from "../../RC/Collections/Stack";
import { BaseBattleEvent } from "./BaseBattleEvent";

export class SyncEvent extends BaseBattleEvent {
	public static readonly E_BATTLE_INIT: number = 100;
	public static readonly E_SNAPSHOT: number = 101;

	private static readonly POOL: Stack<SyncEvent> = new Stack<SyncEvent>();
	private static readonly HANDLERS: Map<number, (e: SyncEvent) => void> = new Map<number, (e: SyncEvent) => void>();

	private static Get(): SyncEvent {
		if (SyncEvent.POOL.size() > 0)
			return SyncEvent.POOL.pop();
		return new SyncEvent();
	}

	private static Release(e: SyncEvent): void {
		e.Clear();
		SyncEvent.POOL.push(e);
	}

	public static AddListener(type: number, handler: (e: SyncEvent) => void): void {
		this.HANDLERS.set(type, handler);
	}

	public static RemoveListener(type: number): void {
		this.HANDLERS.delete(type);
	}

	private static Invoke(e: SyncEvent): void {
		if (!this.HANDLERS.has(e.type))
			return;
		this.HANDLERS.get(e.type)(e);
		e.Release();
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
		this.Invoke(e);
	}

	public static Snapshot(data: Uint8Array): void {
		let e = this.Get();
		e._type = SyncEvent.E_SNAPSHOT;
		e.data = data;
		this.Invoke(e);
	}

	public data: Uint8Array;
}