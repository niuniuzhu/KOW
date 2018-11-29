import { EventManager } from "./EventManager";
export class BaseEvent {
    get type() {
        return this.__type;
    }
    set _type(value) {
        this.__type = value;
    }
    Invoke() {
        EventManager.Invoke(this);
    }
}
