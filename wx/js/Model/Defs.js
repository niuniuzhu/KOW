export class Defs {
    static get config() { return Defs._config; }
    static Init(json) {
        Defs._defs = json;
        Defs._config = RC.Utils.Hashtable.GetMap(Defs._defs, "config");
    }
    static GetPreloads() {
        let arr = RC.Utils.Hashtable.GetArray(Defs._defs, "preloads");
        return arr;
    }
}
