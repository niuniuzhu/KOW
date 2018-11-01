import { Hashtable } from "./RC/Utils/Hashtable";
export class Defs {
    static get config() { return Defs._config; }
    static Init(json) {
        Defs._defs = json;
        Defs._config = Hashtable.GetMap(Defs._defs, "config");
    }
    static GetPreloads() {
        let arr = Hashtable.GetArray(Defs._defs, "preloads");
        return arr;
    }
}
