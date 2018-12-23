import Stack from "../../RC/Collections/Stack";
import { VChampion } from "../View/VChampion";
import { BaseBattleEvent } from "./BaseBattleEvent";

export class UIEvent extends BaseBattleEvent {
	public static readonly E_ENTITY_INIT: number = 101;

	private static readonly POOL: Stack<UIEvent> = new Stack<UIEvent>();
	private static readonly HANDLERS: Map<number, (e: UIEvent) => void> = new Map<number, (e: UIEvent) => void>();

	private static Get(): UIEvent {
		if (UIEvent.POOL.size() > 0)
			return UIEvent.POOL.pop();
		return new UIEvent();
	}

	private static Release(e: UIEvent): void {
		e.Clear();
		UIEvent.POOL.push(e);
	}

	public static AddListener(type: number, handler: (e: UIEvent) => void): void {
		this.HANDLERS.set(type, handler);
	}

	public static RemoveListener(type: number): void {
		this.HANDLERS.delete(type);
	}

	private static Invoke(e: UIEvent): void {
		if (!this.HANDLERS.has(e.type))
			return;
		this.HANDLERS.get(e.type)(e);
		e.Release();
	}

	private Clear(): void {
		this.champion = null;
	}

	/**
	 * 释放事件
	 */
	public Release(): void {
		UIEvent.Release(this);
	}

	public static ChampionInit(champion: VChampion, isSelf: boolean): void {
		let e = this.Get();
		e._type = UIEvent.E_ENTITY_INIT;
		e.champion = champion;
		e.b0 = isSelf;
		this.Invoke(e);
	}

	public champion: VChampion;
	public b0: boolean;
}