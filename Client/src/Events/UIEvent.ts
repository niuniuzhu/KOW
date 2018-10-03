import { BaseEvent } from "./BaseEvent";

export class UIEvent extends BaseEvent {

	public static readonly NETWORK_DISCONNECT: number = 10500;

	private static readonly POOL: RC.Collections.Stack<UIEvent> = new RC.Collections.Stack<UIEvent>();

	private static Get(): UIEvent {
		if (UIEvent.POOL.size() > 0)
			return UIEvent.POOL.pop();
		return new UIEvent();
	}

	private static Release(element: UIEvent): void {
		UIEvent.POOL.push(element);
	}

	public Release(): void {
		UIEvent.Release(this);
	}

	public static NetworkDisconnect(): void {
		let e = this.Get();
		e._type = UIEvent.NETWORK_DISCONNECT;
		e.Invoke();
	}
}