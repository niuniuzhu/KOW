define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleEventMgr {
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
    BattleEventMgr.HANDLERS = new Map();
    exports.BattleEventMgr = BattleEventMgr;
});
//# sourceMappingURL=BattleEventMgr.js.map