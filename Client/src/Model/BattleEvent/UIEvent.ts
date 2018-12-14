import { BaseBattleEvent } from "./BaseBattleEvent";
import { Stack } from "../../RC/Collections/Index";

export class UIEvent extends BaseBattleEvent {

	public static readonly NETWORK_DISCONNECT: number = 10500;

	private static readonly POOL: Stack<UIEvent> = new Stack<UIEvent>();

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