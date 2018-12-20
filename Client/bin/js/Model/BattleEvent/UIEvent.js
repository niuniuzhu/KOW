define(["require", "exports", "../../RC/Collections/Stack", "./BaseBattleEvent"], function (require, exports, Stack_1, BaseBattleEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIEvent extends BaseBattleEvent_1.BaseBattleEvent {
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
            this.champion = null;
        }
        Release() {
            UIEvent.Release(this);
        }
        static ChampionInit(champion, isSelf) {
            let e = this.Get();
            e._type = UIEvent.E_ENTITY_INIT;
            e.champion = champion;
            e.b0 = isSelf;
            this.Invoke(e);
        }
    }
    UIEvent.E_ENTITY_INIT = 101;
    UIEvent.POOL = new Stack_1.default();
    UIEvent.HANDLERS = new Map();
    exports.UIEvent = UIEvent;
});
//# sourceMappingURL=UIEvent.js.map