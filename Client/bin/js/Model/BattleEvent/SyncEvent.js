define(["require", "exports", "../../RC/Collections/Stack", "./BaseBattleEvent"], function (require, exports, Stack_1, BaseBattleEvent_1) {
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
        static AddListener(type, handler) {
            this.HANDLERS.set(type, handler);
        }
        static RemoveListener(type) {
            this.HANDLERS.delete(type);
        }
        static BeginInvoke(e) {
            this.EVENTS.push(e);
        }
        static Update() {
            for (const e of this.EVENTS) {
                if (!this.HANDLERS.has(e.type))
                    continue;
                this.HANDLERS.get(e.type)(e);
                e.Release();
            }
            this.EVENTS.splice(0);
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
            this.BeginInvoke(e);
        }
        static Snapshot(data) {
            let e = this.Get();
            e._type = SyncEvent.E_SNAPSHOT;
            e.data = data;
            this.BeginInvoke(e);
        }
        static Hit(targetID, value) {
            let e = this.Get();
            e._type = SyncEvent.E_HIT;
            e.rid0 = targetID;
            e.v0 = value;
            this.BeginInvoke(e);
        }
        static BulletCollision(bulletID, casterID, targetID) {
            let e = this.Get();
            e._type = SyncEvent.E_BULLET_COLLISION;
            e.rid0 = bulletID;
            e.rid1 = casterID;
            e.rid2 = targetID;
            this.BeginInvoke(e);
        }
    }
    SyncEvent.E_BATTLE_INIT = 100;
    SyncEvent.E_SNAPSHOT = 101;
    SyncEvent.E_HIT = 200;
    SyncEvent.E_BULLET_COLLISION = 201;
    SyncEvent.POOL = new Stack_1.default();
    SyncEvent.HANDLERS = new Map();
    SyncEvent.EVENTS = [];
    exports.SyncEvent = SyncEvent;
});
//# sourceMappingURL=SyncEvent.js.map