define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventManager {
        static AddListener(type, handler) {
            this.HANDLERS.set(type, handler);
        }
        static RemoveListener(type) {
            this.HANDLERS.delete(type);
        }
        static Invoke(e) {
            this.HANDLERS.forEach((v, k, map) => {
                v(e);
            });
            e.Release();
        }
    }
    EventManager.HANDLERS = new Map();
    exports.EventManager = EventManager;
});
//# sourceMappingURL=EventManager.js.map