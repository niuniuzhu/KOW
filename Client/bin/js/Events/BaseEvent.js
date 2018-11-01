define(["require", "exports", "./EventManager"], function (require, exports, EventManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseEvent {
        get type() {
            return this.__type;
        }
        set _type(value) {
            this.__type = value;
        }
        BeginInvoke() {
            EventManager_1.EventManager.BeginInvoke(this);
        }
        Invoke() {
            EventManager_1.EventManager.Invoke(this);
        }
    }
    exports.BaseEvent = BaseEvent;
});
//# sourceMappingURL=BaseEvent.js.map