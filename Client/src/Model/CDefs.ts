import { Hashtable } from "../RC/Utils/Hashtable";

type pair = { [k: string]: any };

export class CDefs {
	private static _defs: pair;
	private static _mapMap: Hashtable;
	private static _entityMap: Hashtable;

	public static Init(json: JSON) {
		this._defs = json;
		this._mapMap = Hashtable.GetMap(this._defs, "map");
		this._entityMap = Hashtable.GetMap(this._defs, "entity");
	}

	public static GetConfig(): pair {
		return Hashtable.GetMap(this._defs, "config");
	}

	public static GetPreloads(): string[] {
		return Hashtable.GetArray(this._defs, "preloads");
	}

	public static GetMap(id: string): Hashtable {
		return Hashtable.GetMap(this._mapMap, id);
	}

	public static GetEntity(id: string): Hashtable {
		return Hashtable.GetMap(this._entityMap, id);
	}
}