define(["require", "exports", "./Defs", "../RC/Utils/Hashtable"], function (require, exports, Defs_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Skill {
        constructor() {
            this.shakeTime = 0;
        }
        get id() { return this._id; }
        get connectState() { return this._connectState; }
        get mpCost() { return this._mpCost; }
        get mpAdd() { return this._mpAdd; }
        get emitterID() { return this._emitterID; }
        get bulletID() { return this._bulletID; }
        get damage() { return this._damage; }
        get formula() { return this._formula; }
        Init(id) {
            this._id = id;
            this.LoadDef();
        }
        LoadDef() {
            const def = Defs_1.Defs.GetSkill(this._id);
            this._connectState = Hashtable_1.Hashtable.GetNumber(def, "connect_state");
            this._mpCost = Hashtable_1.Hashtable.GetNumber(def, "mp_cost");
            this._mpAdd = Hashtable_1.Hashtable.GetNumber(def, "mp_add");
            this._emitterID = Hashtable_1.Hashtable.GetNumber(def, "emitter");
            this._bulletID = Hashtable_1.Hashtable.GetNumber(def, "bullet");
            this._damage = Hashtable_1.Hashtable.GetNumber(def, "damage");
            this._formula = Hashtable_1.Hashtable.GetString(def, "formula", null);
        }
    }
    exports.Skill = Skill;
});
//# sourceMappingURL=Skill.js.map