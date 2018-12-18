import Stack from "../../RC/Collections/Stack";
import { BaseBattleEvent } from "./BaseBattleEvent";
export class UIEvent extends BaseBattleEvent {
    static Get() {
        if (UIEvent.POOL.size() > 0)
            return UIEvent.POOL.pop();
        return new UIEvent();
    }
    static Release(e) {
        e.Clear();
        UIEvent.POOL.push(e);
    }
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
    Clear() {
        this.entity = null;
    }
    Release() {
        UIEvent.Release(this);
    }
    static EntityInit(entity, isSelf) {
        let e = this.Get();
        e._type = UIEvent.E_ENTITY_INIT;
        e.entity = entity;
        e.b0 = isSelf;
        this.Invoke(e);
    }
}
UIEvent.E_ENTITY_INIT = 101;
UIEvent.POOL = new Stack();
UIEvent.HANDLERS = new Map();
