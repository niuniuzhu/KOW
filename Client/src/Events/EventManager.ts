import { BaseEvent } from "./BaseEvent";
import { Queue } from "../RC/Collections/Index";

export interface IEventCallback {
	(e: BaseEvent): void;
}

export class EventManager {
	private static readonly HANDLERS: { [key: number]: IEventCallback[] } = {};
	private static readonly PENDING_LIST: Queue<BaseEvent> = new Queue<BaseEvent>();

	public static AddListener(type: number, handler: IEventCallback): void {
		let list = EventManager.HANDLERS[type];
		if (list == undefined)
			EventManager.HANDLERS[type] = list = [];
		list.push(handler);
	}

	public static RemoveListener(type: number, handler: IEventCallback): void {
		let list = EventManager.HANDLERS[type];
		if (list == undefined)
			return;
		let result = list.splice(list.indexOf(handler), 1);
		if (!result)
			return;
		if (list.length == 0)
			EventManager.HANDLERS[type] = undefined;
	}

	public static BeginInvoke(e: BaseEvent): void {
		EventManager.PENDING_LIST.enqueue(e);
	}

	public static Invoke(e: BaseEvent): void {
		let handlers = EventManager.HANDLERS[e.type];
		if (handlers != undefined) {
			handlers.forEach((callback) => {
				callback(e);
			});
		}
		e.Release();
	}

	public static Sync(): void {
		while (!EventManager.PENDING_LIST.isEmpty()) {
			let e = EventManager.PENDING_LIST.dequeue();
			EventManager.Invoke(e);
		}
	}
}