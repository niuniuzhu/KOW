import { BaseEvent } from "./BaseEvent";

export class EventManager {
	private static readonly HANDLERS: Map<number, (e: BaseEvent) => void> = new Map<number, (e: BaseEvent) => void>();

	public static AddListener(type: number, handler: (e: BaseEvent) => void): void {
		this.HANDLERS.set(type, handler);
	}

	public static RemoveListener(type: number): void {
		this.HANDLERS.delete(type);
	}

	public static Invoke(e: BaseEvent): void {
		this.HANDLERS.forEach((v, k, map) => {
			v(e);
		})
		e.Release();
	}
}