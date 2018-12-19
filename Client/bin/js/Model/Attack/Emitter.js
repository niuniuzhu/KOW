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
        get rid() { return this._rid; }
        get id() { return this._id; }
        constructor(battle, rid, id) {
            this._battle = battle;
            this._rid = rid;
            this._id = id;
            this.LoadDef();
        }
        EncodeSnapshot(writer) {
        }
        DecodeSnapshot(reader) {
        }
        Init(caster, skill) {
        }
        LoadDef() {
        }
    }
    exports.Emitter = Emitter;
});
//# sourceMappingURL=Emitter.js.map