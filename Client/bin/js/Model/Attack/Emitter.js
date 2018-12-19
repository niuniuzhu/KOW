define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmitterMouthType;
    (function (EmitterMouthType) {
        EmitterMouthType[EmitterMouthType["Center"] = 0] = "Center";
        EmitterMouthType[EmitterMouthType["Edage"] = 1] = "Edage";
        EmitterMouthType[EmitterMouthType["Inside"] = 2] = "Inside";
    })(EmitterMouthType = exports.EmitterMouthType || (exports.EmitterMouthType = {}));
    class Emitter {
        constructor() {
        }
        EncodeSnapshot(writer) {
        }
        DecodeSnapshot(reader) {
        }
        Init(battle, id, rid, caster, skill) {
        }
        LoadDef() {
        }
    }
    exports.Emitter = Emitter;
});
//# sourceMappingURL=Emitter.js.map