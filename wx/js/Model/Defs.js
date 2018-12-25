import { Consts } from "../Consts";
import { Hashtable } from "../RC/Utils/Hashtable";
export class Defs {
    static Init(json) {
        this._defs = json;
        this._mapMap = Hashtable.GetMap(this._defs, "map");
        this._entityMap = Hashtable.GetMap(this._defs, "entity");
        this._skillMap = Hashtable.GetMap(this._defs, "skill");
        this._emitterMap = Hashtable.GetMap(this._defs, "emitter");
        this._bulletMap = Hashtable.GetMap(this._defs, "bullet");
    }
    static GetMap(id) {
        return Hashtable.GetMap(this._mapMap, Consts.ASSETS_MAP_PREFIX + id);
    }
    static GetEntity(id) {
        return Hashtable.GetMap(this._entityMap, Consts.ASSETS_ENTITY_PREFIX + id);
    }
    static GetSkill(id) {
        return Hashtable.GetMap(this._skillMap, Consts.ASSETS_SKILL_PREFIX + id);
    }
    static GetEmitter(id) {
        return Hashtable.GetMap(this._emitterMap, Consts.ASSETS_EMITTER_PREFIX + id);
    }
    static GetBullet(id) {
        return Hashtable.GetMap(this._bulletMap, Consts.ASSETS_BULLET_PREFIX + id);
    }
}
