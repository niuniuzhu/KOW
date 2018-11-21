define(["require", "exports", "../RC/Utils/Hashtable"], function (require, exports, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CDefs {
        static Init(json) {
            this._defs = json;
            this._mapMap = Hashtable_1.Hashtable.GetMap(this._defs, "map");
            this._entityMap = Hashtable_1.Hashtable.GetMap(this._defs, "entity");
        }
        static GetConfig() {
            return Hashtable_1.Hashtable.GetMap(this._defs, "config");
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
    exports.CDefs = CDefs;
});
//# sourceMappingURL=CDefs.js.map