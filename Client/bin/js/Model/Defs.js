define(["require", "exports", "../RC/Utils/Hashtable", "../Consts"], function (require, exports, Hashtable_1, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Defs {
        static Init(json) {
            this._defs = json;
            this._mapMap = Hashtable_1.Hashtable.GetMap(this._defs, "map");
            this._entityMap = Hashtable_1.Hashtable.GetMap(this._defs, "entity");
        }
        static GetMap(id) {
            return Hashtable_1.Hashtable.GetMap(this._mapMap, Consts_1.Consts.ASSETS_MAP_PREFIX + id);
        }
        static GetEntity(id) {
            return Hashtable_1.Hashtable.GetMap(this._entityMap, Consts_1.Consts.ASSETS_ENTITY_PREFIX + id);
        }
    }
    exports.Defs = Defs;
});
//# sourceMappingURL=Defs.js.map