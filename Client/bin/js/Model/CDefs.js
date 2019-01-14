define(["require", "exports", "../Consts", "../RC/Utils/Hashtable"], function (require, exports, Consts_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CDefs {
        static Init(json) {
            this._defs = json;
            this._map = Hashtable_1.Hashtable.GetMap(this._defs, "map");
            this._modelMap = Hashtable_1.Hashtable.GetMap(this._defs, "model");
            this._entityMap = Hashtable_1.Hashtable.GetMap(this._defs, "entity");
            this._bulletMap = Hashtable_1.Hashtable.GetMap(this._defs, "bullet");
            this._sceneItem = Hashtable_1.Hashtable.GetMap(this._defs, "scene_item");
            this._fxMap = Hashtable_1.Hashtable.GetMap(this._defs, "effect");
        }
        static GetConfig() {
            return Hashtable_1.Hashtable.GetMap(this._defs, "config");
        }
        static GetPreloads() {
            return Hashtable_1.Hashtable.GetArray(this._defs, "preloads");
        }
        static GetMap(id) {
            return Hashtable_1.Hashtable.GetMap(this._map, Consts_1.Consts.ASSETS_MAP_PREFIX + id);
        }
        static GetModel(id) {
            return Hashtable_1.Hashtable.GetMap(this._modelMap, Consts_1.Consts.ASSETS_MODEL_PREFIX + id);
        }
        static GetEntity(id) {
            return Hashtable_1.Hashtable.GetMap(this._entityMap, Consts_1.Consts.ASSETS_ENTITY_PREFIX + id);
        }
        static GetBullet(id) {
            return Hashtable_1.Hashtable.GetMap(this._bulletMap, Consts_1.Consts.ASSETS_BULLET_PREFIX + id);
        }
        static GetSceneItem(id) {
            return Hashtable_1.Hashtable.GetMap(this._sceneItem, Consts_1.Consts.ASSETS_SCENE_ITEM_PREFIX + id);
        }
        static GetEffect(id) {
            return Hashtable_1.Hashtable.GetMap(this._fxMap, Consts_1.Consts.ASSETS_EFFECT_PREFIX + id);
        }
    }
    exports.CDefs = CDefs;
});
//# sourceMappingURL=CDefs.js.map