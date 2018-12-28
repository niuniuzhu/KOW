define(["require", "exports", "./EntityStateAction"], function (require, exports, EntityStateAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActInterrupt extends EntityStateAction_1.EntityStateAction {
        EncodeSnapshot(writer) {
            super.EncodeSnapshot(writer);
        }
        DecodeSnapshot(reader) {
            super.DecodeSnapshot(reader);
        }
        constructor(state, type, def) {
            super(state, type, def);
        }
        OnUpdate(dt) {
            super.OnUpdate(dt);
        }
        HandlInput(type, press) {
        }
        Dump() {
            let str = super.Dump();
            return str;
        }
    }
    exports.ActInterrupt = ActInterrupt;
});
//# sourceMappingURL=ActInterrupt.js.map