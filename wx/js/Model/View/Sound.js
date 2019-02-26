import { CDefs } from "../CDefs";
import { Hashtable } from "../../RC/Utils/Hashtable";
export var SoundType;
(function (SoundType) {
    SoundType[SoundType["Music"] = 0] = "Music";
    SoundType[SoundType["Sound"] = 1] = "Sound";
})(SoundType || (SoundType = {}));
export class Sound {
    constructor(id) {
        this.id = id;
        const defs = CDefs.GetSound(id);
        this.type = Hashtable.GetNumber(defs, "type");
        this.name = Hashtable.GetString(defs, "url");
        this.loop = Hashtable.GetBool(defs, "loop");
        this.volume = Hashtable.GetNumber(defs, "volume");
        this.maxOverlay = Hashtable.GetNumber(defs, "max_overlay");
    }
}
