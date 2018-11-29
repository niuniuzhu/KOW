import { Consts } from "../Consts";
import { Hashtable } from "../RC/Utils/Hashtable";
export class CDefs {
    static Init(json) {
        this._defs = json;
        this._mapMap = Hashtable.GetMap(this._defs, "map");
        this._entityMap = Hashtable.GetMap(this._defs, "entity");
    }
    static GetConfig() {
        return Hashtable.GetMap(this._defs, "config");
    }
    static GetPreloads() {
        return Hashtable.GetArray(this._defs, "preloads");
    }
    static GetMap(id) {
        return Hashtable.GetMap(this._mapMap, Consts.ASSETS_MAP_PREFIX + id);
    }
    static GetEntity(id) {
        return Hashtable.GetMap(this._entityMap, Consts.ASSETS_ENTITY_PREFIX + id);
    }
}
