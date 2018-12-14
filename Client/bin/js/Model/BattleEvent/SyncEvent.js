define(["require", "exports", "./BaseBattleEvent", "../../RC/Collections/Stack"], function (require, exports, BaseBattleEvent_1, Stack_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SyncEvent extends BaseBattleEvent_1.BaseBattleEvent {
        static Get() {
            if (SyncEvent.POOL.size() > 0)
                return SyncEvent.POOL.pop();
            return new SyncEvent();
        }
        static Release(e) {
            e.Clear();
            SyncEvent.POOL.push(e);
        }
        Clear() {
            this.data = null;
        }
        Release() {
            SyncEvent.Release(this);
        }
        static BattleInit(data) {
            let e = this.Get();
            e._type = SyncEvent.E_BATTLE_INIT;
            e.data = data;
            e.Invoke();
        }
        static Snapshot(data) {
            let e = this.Get();
            e._type = SyncEvent.E_SNAPSHOT;
            e.data = data;
            e.Invoke();
        }
    }
    SyncEvent.E_BATTLE_INIT = 100;
    SyncEvent.E_SNAPSHOT = 101;
    SyncEvent.POOL = new Stack_1.default();
    exports.SyncEvent = SyncEvent;
});
//# sourceMappingURL=SyncEvent.js.map