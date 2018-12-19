import { Consts } from "../Consts";
import { Hashtable } from "../RC/Utils/Hashtable";

export class Defs {
	private static _defs: Hashtable;
	private static _mapMap: Hashtable;
	private static _entityMap: Hashtable;
	private static _skillMap: Hashtable;
	private static _emitterMap: Hashtable;
	private static _bulletMap: Hashtable;

	public static Init(json: JSON) {
		this._defs = json;
		this._mapMap = Hashtable.GetMap(this._defs, "map");
		this._entityMap = Hashtable.GetMap(this._defs, "entity");
		this._skillMap = Hashtable.GetMap(this._defs, "skill");
		this._emitterMap = Hashtable.GetMap(this._defs, "emitter");
		this._bulletMap = Hashtable.GetMap(this._defs, "buttle");
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

	public static GetEmitter(id: number): Hashtable {
		return Hashtable.GetMap(this._emitterMap, Consts.ASSETS_EMITTER_PREFIX + id);
	}

	public static GetBullet(id: number): Hashtable {
		return Hashtable.GetMap(this._bulletMap, Consts.ASSETS_BULLET_PREFIX + id);
	}
}