define(["require", "exports", "./RC/Utils/Hashtable"], function (require, exports, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Defs {
        static get config() { return this._config; }
        static Init(json) {
            this._defs = json;
            this._config = Hashtable_1.Hashtable.GetMap(this._defs, "config");
            this._mapMap = Hashtable_1.Hashtable.GetMap(this._defs, "map");
            this._entityMap = Hashtable_1.Hashtable.GetMap(this._defs, "entity");
        }
        static GetPreloads() {
            return Hashtable_1.Hashtable.GetArray(this._defs, "preloads");
        }
        static GetMap(id) {
            return Hashtable_1.Hashtable.GetMap(this._mapMap, id);
        }
        static GetEntity(id) {
            return Hashtable_1.Hashtable.GetMap(this._entityMap, id);
        }
    }
    exports.Defs = Defs;
});
//# sourceMappingURL=Defs.js.map