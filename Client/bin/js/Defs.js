define(["require", "exports", "./RC/Utils/Hashtable"], function (require, exports, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Defs {
        static get config() { return Defs._config; }
        static Init(json) {
            Defs._defs = json;
            Defs._config = Hashtable_1.Hashtable.GetMap(Defs._defs, "config");
        }
        static GetPreloads() {
            let arr = Hashtable_1.Hashtable.GetArray(Defs._defs, "preloads");
            return arr;
        }
    }
    exports.Defs = Defs;
});
//# sourceMappingURL=Defs.js.map