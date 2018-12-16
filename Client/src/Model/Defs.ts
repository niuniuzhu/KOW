import { Hashtable } from "../RC/Utils/Hashtable";
import { Consts } from "../Consts";

type pair = { [k: string]: any };

export class Defs {
	private static _defs: pair;
	private static _mapMap: Hashtable;
	private static _entityMap: Hashtable;
	private static _skillMap: Hashtable;

	public static Init(json: JSON) {
		this._defs = json;
		this._mapMap = Hashtable.GetMap(this._defs, "map");
		this._entityMap = Hashtable.GetMap(this._defs, "entity");
		this._skillMap = Hashtable.GetMap(this._defs, "skill");
	}

	public static GetMap(id: number): Hashtable {
		return Hashtable.GetMap(this._mapMap, Consts.ASSETS_MAP_PREFIX + id);
	}

	public static GetEntity(id: number): Hashtable {
		return Hashtable.GetMap(this._entityMap, Consts.ASSETS_ENTITY_PREFIX + id);
	}

	public static GetSkill(id: number): Hashtable {
		return Hashtable.GetMap(this._skillMap, Consts.ASSETS_SKILL_PREFIX + id);
	}
}