import { Protos } from "../../Libs/protos";
import Stack from "../../RC/Collections/Stack";
import { EAttr } from "../Logic/Attribute";
import { VChampion } from "../View/VChampion";
import { BaseBattleEvent } from "./BaseBattleEvent";

export class UIEvent extends BaseBattleEvent {
	public static readonly E_ENTITY_INIT: number = 101;
	public static readonly E_END_BATTLE: number = 102;
	public static readonly E_ATTR_CHANGE: number = 103;

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
		this.callback = null;
	}

	/**
	 * 释放事件
	 */
	public Release(): void {
		UIEvent.Release(this);
	}

	public static ChampionInit(champion: VChampion): void {
		let e = this.Get();
		e._type = UIEvent.E_ENTITY_INIT;
		e.champion = champion;
		this.Invoke(e);
	}

	public static EndBattle(result: Protos.CS2GC_BattleEnd.Result, honer: number, callback: () => void): void {
		let e = this.Get();
		e._type = UIEvent.E_END_BATTLE;
		e.any0 = result;
		e.v1 = honer;
		e.callback = callback;
		this.Invoke(e);
	}

	public static AttrChange(champion: VChampion, attr: EAttr, value: any): void {
		let e = this.Get();
		e._type = UIEvent.E_ATTR_CHANGE;
		e.champion = champion;
		e.attr = attr;
		e.value = value;
		this.Invoke(e);
	}

	public champion: VChampion;
	public v0: number;
	public v1: number;
	public b0: boolean;
	public any0: any;
	public attr: EAttr;
	public value: any;
	public callback: () => void;
}