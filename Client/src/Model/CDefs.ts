import { Consts } from "../Consts";
import { Hashtable } from "../RC/Utils/Hashtable";

export class CDefs {
	private static _defs: Hashtable;
	private static _mapMap: Hashtable;
	private static _entityMap: Hashtable;
	private static _bulletMap: Hashtable;

	public static Init(json: JSON) {
		this._defs = json;
		this._mapMap = Hashtable.GetMap(this._defs, "map");
		this._entityMap = Hashtable.GetMap(this._defs, "entity");
		this._bulletMap = Hashtable.GetMap(this._defs, "bullet");
	}

	public static GetConfig(): Hashtable {
		return Hashtable.GetMap(this._defs, "config");
	}

	public static GetPreloads(): string[] {
		return Hashtable.GetArray(this._defs, "preloads");
	}

	public static GetMap(id: number): Hashtable {
		return Hashtable.GetMap(this._mapMap, Consts.ASSETS_MAP_PREFIX + id);
	}

	public static GetEntity(id: number): Hashtable {
		return Hashtable.GetMap(this._entityMap, Consts.ASSETS_ENTITY_PREFIX + id);
	}

	public static GetBullet(id: number): Hashtable {
		return Hashtable.GetMap(this._bulletMap, Consts.ASSETS_BULLET_PREFIX + id);
	}
}