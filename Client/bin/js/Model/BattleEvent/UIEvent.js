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
            this.callback = null;
        }
        Release() {
            UIEvent.Release(this);
        }
        static ChampionInit(champion) {
            let e = this.Get();
            e._type = UIEvent.E_ENTITY_INIT;
            e.champion = champion;
            this.Invoke(e);
        }
        static EndBattle(result, rank, callback) {
            let e = this.Get();
            e._type = UIEvent.E_END_BATTLE;
            e.any0 = result;
            e.v1 = rank;
            e.callback = callback;
            this.Invoke(e);
        }
        static AttrChange(champion, attr, value) {
            let e = this.Get();
            e._type = UIEvent.E_ATTR_CHANGE;
            e.champion = champion;
            e.attr = attr;
            e.value = value;
            this.Invoke(e);
        }
    }
    UIEvent.E_ENTITY_INIT = 101;
    UIEvent.E_END_BATTLE = 102;
    UIEvent.E_ATTR_CHANGE = 103;
    UIEvent.POOL = new Stack_1.default();
    UIEvent.HANDLERS = new Map();
    exports.UIEvent = UIEvent;
});
//# sourceMappingURL=UIEvent.js.map