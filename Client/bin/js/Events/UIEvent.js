define(["require", "exports", "./BaseEvent", "../RC/Collections/Index"], function (require, exports, BaseEvent_1, Index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIEvent extends BaseEvent_1.BaseEvent {
        static Get() {
            if (UIEvent.POOL.size() > 0)
                return UIEvent.POOL.pop();
            return new UIEvent();
        }
        static Release(element) {
            UIEvent.POOL.push(element);
        }
        Release() {
            UIEvent.Release(this);
        }
        static NetworkDisconnect() {
            let e = this.Get();
            e._type = UIEvent.NETWORK_DISCONNECT;
            e.Invoke();
        }
    }
    UIEvent.NETWORK_DISCONNECT = 10500;
    UIEvent.POOL = new Index_1.Stack();
    exports.UIEvent = UIEvent;
});
//# sourceMappingURL=UIEvent.js.map