export class EventManager {
    static AddListener(type, handler) {
        this.HANDLERS.set(type, handler);
    }
    static RemoveListener(type) {
        this.HANDLERS.delete(type);
    }
    static Invoke(e) {
        if (!this.HANDLERS.has(e.type))
            return;
        this.HANDLERS.get(e.type)(e);
        e.Release();
    }
}
EventManager.HANDLERS = new Map();