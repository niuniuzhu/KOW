define(["require", "exports", "./Defs", "../RC/Utils/Hashtable"], function (require, exports, Defs_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Skill {
        get id() { return this._id; }
        get connectedState() { return this._connectState; }
        get emitterID() { return this._emitterID; }
        get bulletID() { return this._bulletID; }
        get damage() { return this._damage; }
        Init(id) {
            this._id = id;
            this.LoadDef();
        }
        LoadDef() {
            const def = Defs_1.Defs.GetSkill(this._id);
            this._connectState = Hashtable_1.Hashtable.GetNumber(def, "connect_state");
            this._emitterID = Hashtable_1.Hashtable.GetNumber(def, "emitter");
            this._bulletID = Hashtable_1.Hashtable.GetNumber(def, "bullet");
            this._damage = Hashtable_1.Hashtable.GetNumber(def, "damage");
        }
    }
    exports.Skill = Skill;
});
//# sourceMappingURL=Skill.js.map