type pair = { [k: string]: any };

export class Defs {
	private static _defs: pair;
	private static _config: pair;

	public static get config(): pair { return Defs._config; }

	public static Init(json: JSON) {
		Defs._defs = json;
		Defs._config = RC.Utils.Hashtable.GetMap(Defs._defs, "config");
	}

	public static GetPreloads(): string[] {
		let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "preloads");
		return arr;
	}
}