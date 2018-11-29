import { BaseEvent } from "./BaseEvent";
import { Stack } from "../../RC/Collections/Index";
export class UIEvent extends BaseEvent {
    static Get() {
        if (UIEvent.POOL.size() > 0)
            return UIEvent.POOL.pop();
        return new UIEvent();
    }
    static Release(element) {
        UIEvent.POOL.push(element);
    }
    Release() {
        UIEvent.Release(this);
    }
    static NetworkDisconnect() {
        let e = this.Get();
        e._type = UIEvent.NETWORK_DISCONNECT;
        e.Invoke();
    }
}
UIEvent.NETWORK_DISCONNECT = 10500;
UIEvent.POOL = new Stack();
