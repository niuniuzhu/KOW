define(["require", "exports", "./Defs", "../RC/Utils/Hashtable"], function (require, exports, Defs_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Skill {
        get id() { return this._id; }
        get connectedState() { return Hashtable_1.Hashtable.GetNumber(this._def, "connected_state"); }
        Init(id) {
            this._id = id;
            this.LoadDef();
        }
        LoadDef() {
            this._def = Defs_1.Defs.GetSkill(this._id);
        }
    }
    exports.Skill = Skill;
});
//# sourceMappingURL=Skill.js.map