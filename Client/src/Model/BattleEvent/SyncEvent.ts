import Stack from "../../RC/Collections/Stack";
import { EntityType } from "../Logic/Entity";
import { BaseBattleEvent } from "./BaseBattleEvent";

export class SyncEvent extends BaseBattleEvent {
	public static readonly E_BATTLE_INIT: number = 100;
	public static readonly E_SNAPSHOT: number = 101;

	public static readonly E_ENTITY_CREATED: number = 200;

	public static readonly E_HIT: number = 300;
	public static readonly E_BULLET_COLLISION: number = 301;
	public static readonly E_SCENE_ITEM_COLLISION: number = 302;
	public static readonly E_SCENE_ITEM_TRIGGER: number = 303;

	private static readonly POOL: Stack<SyncEvent> = new Stack<SyncEvent>();
	private static readonly HANDLERS: Map<number, (e: SyncEvent) => void> = new Map<number, (e: SyncEvent) => void>();
	private static readonly EVENTS: SyncEvent[] = [];

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

	private static BeginInvoke(e: SyncEvent): void {
		this.EVENTS.push(e);
	}

	public static Update(): void {
		for (const e of this.EVENTS) {
			if (!this.HANDLERS.has(e.type))
				continue;
			this.HANDLERS.get(e.type)(e);
			e.Release();
		}
		this.EVENTS.splice(0);
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
		this.BeginInvoke(e);
	}

	public static EntityCreated(type: EntityType, data: Uint8Array): void {
		let e = this.Get();
		e._type = SyncEvent.E_ENTITY_CREATED;
		e.entityType = type;
		e.data = data;
		this.BeginInvoke(e);
	}

	public static Snapshot(data: Uint8Array): void {
		let e = this.Get();
		e._type = SyncEvent.E_SNAPSHOT;
		e.data = data;
		this.BeginInvoke(e);
	}

	public static ItemTrigger(itemID: Long, targetID: Long): void {
		let e = this.Get();
		e._type = SyncEvent.E_SCENE_ITEM_TRIGGER;
		e.rid0 = itemID;
		e.rid1 = targetID;
		this.BeginInvoke(e);
	}

	public static Hit(casterID: Long, targetID: Long, value: number): void {
		let e = this.Get();
		e._type = SyncEvent.E_HIT;
		e.rid0 = casterID;
		e.rid1 = targetID;
		e.v0 = value;
		this.BeginInvoke(e);
	}

	public static BulletCollision(bulletID: Long, casterID: Long, targetID: Long): void {
		let e = this.Get();
		e._type = SyncEvent.E_BULLET_COLLISION;
		e.rid0 = bulletID;
		e.rid1 = casterID;
		e.rid2 = targetID;
		this.BeginInvoke(e);
	}

	public static ScenItemCollision(itemID: Long, targetID: Long): void {
		let e = this.Get();
		e._type = SyncEvent.E_SCENE_ITEM_COLLISION;
		e.rid0 = itemID;
		e.rid1 = targetID;
		this.BeginInvoke(e);
	}

	public data: Uint8Array;
	public entityType: EntityType;
	public rid0: Long;
	public rid1: Long;
	public rid2: Long;
	public v0: number;
	public v1: number;
	public b0: boolean;
}