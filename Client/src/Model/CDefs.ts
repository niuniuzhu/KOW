import { Consts } from "../Consts";
import { Hashtable } from "../RC/Utils/Hashtable";

export class CDefs {
	private static _defs: Hashtable;
	private static _modelMap: Hashtable;
	private static _entityMap: Hashtable;
	private static _bulletMap: Hashtable;
	private static _fxMap: Hashtable;

	public static Init(json: JSON) {
		this._defs = json;
		this._modelMap = Hashtable.GetMap(this._defs, "model");
		this._entityMap = Hashtable.GetMap(this._defs, "entity");
		this._bulletMap = Hashtable.GetMap(this._defs, "bullet");
		this._fxMap = Hashtable.GetMap(this._defs, "effect");
	}

	public static GetConfig(): Hashtable {
		return Hashtable.GetMap(this._defs, "config");
	}

	public static GetPreloads(): string[] {
		return Hashtable.GetArray(this._defs, "preloads");
	}

	public static GetModel(id: number): Hashtable {
		return Hashtable.GetMap(this._modelMap, Consts.ASSETS_MODEL_PREFIX + id);
	}

	public static GetEntity(id: number): Hashtable {
		return Hashtable.GetMap(this._entityMap, Consts.ASSETS_ENTITY_PREFIX + id);
	}

	public static GetBullet(id: number): Hashtable {
		return Hashtable.GetMap(this._bulletMap, Consts.ASSETS_BULLET_PREFIX + id);
	}

	public static GetEffect(id: number): Hashtable {
		return Hashtable.GetMap(this._fxMap, Consts.ASSETS_EFFECT_PREFIX + id);
	}
}