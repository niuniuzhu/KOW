import { Consts } from "../Consts";
import { Hashtable } from "../RC/Utils/Hashtable";
export class CDefs {
    static Init(json) {
        this._defs = json;
        this._modelMap = Hashtable.GetMap(this._defs, "model");
        this._entityMap = Hashtable.GetMap(this._defs, "entity");
        this._bulletMap = Hashtable.GetMap(this._defs, "bullet");
        this._fxMap = Hashtable.GetMap(this._defs, "effect");
    }
    static GetConfig() {
        return Hashtable.GetMap(this._defs, "config");
    }
    static GetPreloads() {
        return Hashtable.GetArray(this._defs, "preloads");
    }
    static GetModel(id) {
        return Hashtable.GetMap(this._modelMap, Consts.ASSETS_MODEL_PREFIX + id);
    }
    static GetEntity(id) {
        return Hashtable.GetMap(this._entityMap, Consts.ASSETS_ENTITY_PREFIX + id);
    }
    static GetBullet(id) {
        return Hashtable.GetMap(this._bulletMap, Consts.ASSETS_BULLET_PREFIX + id);
    }
    static GetEffect(id) {
        return Hashtable.GetMap(this._fxMap, Consts.ASSETS_EFFECT_PREFIX + id);
    }
}
