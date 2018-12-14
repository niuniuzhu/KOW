define(["require", "exports", "./BattleEventMgr"], function (require, exports, BattleEventMgr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseBattleEvent {
        get type() {
            return this.__type;
        }
        set _type(value) {
            this.__type = value;
        }
        Invoke() {
            BattleEventMgr_1.BattleEventMgr.Invoke(this);
        }
    }
    exports.BaseBattleEvent = BaseBattleEvent;
});
//# sourceMappingURL=BaseBattleEvent.js.map