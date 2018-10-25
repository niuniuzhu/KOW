export class EventManager {
    static AddListener(type, handler) {
        let list = EventManager.HANDLERS[type];
        if (list == undefined)
            EventManager.HANDLERS[type] = list = [];
        list.push(handler);
    }
    static RemoveListener(type, handler) {
        let list = EventManager.HANDLERS[type];
        if (list == undefined)
            return;
        let result = list.splice(list.indexOf(handler), 1);
        if (!result)
            return;
        if (list.length == 0)
            EventManager.HANDLERS[type] = undefined;
    }
    static BeginInvoke(e) {
        EventManager.PENDING_LIST.enqueue(e);
    }
    static Invoke(e) {
        let handlers = EventManager.HANDLERS[e.type];
        if (handlers != undefined) {
            handlers.forEach((callback) => {
                callback(e);
            });
        }
        e.Release();
    }
    static Sync() {
        while (!EventManager.PENDING_LIST.isEmpty()) {
            let e = EventManager.PENDING_LIST.dequeue();
            EventManager.Invoke(e);
        }
    }
}
EventManager.HANDLERS = {};
EventManager.PENDING_LIST = new RC.Collections.Queue();
