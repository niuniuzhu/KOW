import { Hashtable } from "../RC/Utils/Hashtable";
import { Consts } from "../Consts";
export class Defs {
    static Init(json) {
        this._defs = json;
        this._mapMap = Hashtable.GetMap(this._defs, "map");
        this._entityMap = Hashtable.GetMap(this._defs, "entity");
    }
    static GetMap(id) {
        return Hashtable.GetMap(this._mapMap, Consts.ASSETS_MAP_PREFIX + id);
    }
    static GetEntity(id) {
        return Hashtable.GetMap(this._entityMap, Consts.ASSETS_ENTITY_PREFIX + id);
    }
}
