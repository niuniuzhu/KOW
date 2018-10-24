import { EventManager } from "./EventManager";
export class BaseEvent {
    get type() {
        return this.__type;
    }
    set _type(value) {
        this.__type = value;
    }
    BeginInvoke() {
        EventManager.BeginInvoke(this);
    }
    Invoke() {
        EventManager.Invoke(this);
    }
}
//# sourceMappingURL=BaseEvent.js.map