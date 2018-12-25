define(["require", "exports", "../Consts", "../RC/Utils/Hashtable"], function (require, exports, Consts_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Defs {
        static Init(json) {
            this._defs = json;
            this._mapMap = Hashtable_1.Hashtable.GetMap(this._defs, "map");
            this._entityMap = Hashtable_1.Hashtable.GetMap(this._defs, "entity");
            this._skillMap = Hashtable_1.Hashtable.GetMap(this._defs, "skill");
            this._emitterMap = Hashtable_1.Hashtable.GetMap(this._defs, "emitter");
            this._bulletMap = Hashtable_1.Hashtable.GetMap(this._defs, "bullet");
        }
        static GetMap(id) {
            return Hashtable_1.Hashtable.GetMap(this._mapMap, Consts_1.Consts.ASSETS_MAP_PREFIX + id);
        }
        static GetEntity(id) {
            return Hashtable_1.Hashtable.GetMap(this._entityMap, Consts_1.Consts.ASSETS_ENTITY_PREFIX + id);
        }
        static GetSkill(id) {
            return Hashtable_1.Hashtable.GetMap(this._skillMap, Consts_1.Consts.ASSETS_SKILL_PREFIX + id);
        }
        static GetEmitter(id) {
            return Hashtable_1.Hashtable.GetMap(this._emitterMap, Consts_1.Consts.ASSETS_EMITTER_PREFIX + id);
        }
        static GetBullet(id) {
            return Hashtable_1.Hashtable.GetMap(this._bulletMap, Consts_1.Consts.ASSETS_BULLET_PREFIX + id);
        }
    }
    exports.Defs = Defs;
});
//# sourceMappingURL=Defs.js.map