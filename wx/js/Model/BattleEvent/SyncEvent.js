import Stack from "../../RC/Collections/Stack";
import { BaseBattleEvent } from "./BaseBattleEvent";
export class SyncEvent extends BaseBattleEvent {
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
    static EntityCreated(type, data) {
        let e = this.Get();
        e._type = SyncEvent.E_ENTITY_CREATED;
        e.entityType = type;
        e.data = data;
        this.BeginInvoke(e);
    }
    static Snapshot(data) {
        let e = this.Get();
        e._type = SyncEvent.E_SNAPSHOT;
        e.data = data;
        this.BeginInvoke(e);
    }
    static ItemTrigger(itemID, targetID) {
        let e = this.Get();
        e._type = SyncEvent.E_SCENE_ITEM_TRIGGER;
        e.rid0 = itemID;
        e.rid1 = targetID;
        this.BeginInvoke(e);
    }
    static Hit(casterID, targetID, value) {
        let e = this.Get();
        e._type = SyncEvent.E_HIT;
        e.rid0 = casterID;
        e.rid1 = targetID;
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
    static ScenItemCollision(itemID, targetID) {
        let e = this.Get();
        e._type = SyncEvent.E_SCENE_ITEM_COLLISION;
        e.rid0 = itemID;
        e.rid1 = targetID;
        this.BeginInvoke(e);
    }
}
SyncEvent.E_BATTLE_INIT = 100;
SyncEvent.E_SNAPSHOT = 101;
SyncEvent.E_ENTITY_CREATED = 200;
SyncEvent.E_HIT = 300;
SyncEvent.E_BULLET_COLLISION = 301;
SyncEvent.E_SCENE_ITEM_COLLISION = 302;
SyncEvent.E_SCENE_ITEM_TRIGGER = 303;
SyncEvent.POOL = new Stack();
SyncEvent.HANDLERS = new Map();
SyncEvent.EVENTS = [];
