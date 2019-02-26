define(["require", "exports", "../CDefs", "../../RC/Utils/Hashtable"], function (require, exports, CDefs_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SoundType;
    (function (SoundType) {
        SoundType[SoundType["Music"] = 0] = "Music";
        SoundType[SoundType["Sound"] = 1] = "Sound";
    })(SoundType = exports.SoundType || (exports.SoundType = {}));
    class Sound {
        constructor(id) {
            this.id = id;
            const defs = CDefs_1.CDefs.GetSound(id);
            this.type = Hashtable_1.Hashtable.GetNumber(defs, "type");
            this.name = Hashtable_1.Hashtable.GetString(defs, "url");
            this.loop = Hashtable_1.Hashtable.GetBool(defs, "loop");
            this.volume = Hashtable_1.Hashtable.GetNumber(defs, "volume");
            this.maxOverlay = Hashtable_1.Hashtable.GetNumber(defs, "max_overlay");
        }
    }
    exports.Sound = Sound;
});
//# sourceMappingURL=Sound.js.map