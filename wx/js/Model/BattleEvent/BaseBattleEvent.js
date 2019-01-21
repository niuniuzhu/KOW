"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseBattleEvent {
    get type() {
        return this.__type;
    }
    set _type(value) {
        this.__type = value;
    }
}
exports.BaseBattleEvent = BaseBattleEvent;
