define(["require", "exports", "../Skill", "./VEntity", "../../RC/Math/Vec2"], function (require, exports, Skill_1, VEntity_1, Vec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VChampion extends VEntity_1.VEntity {
        constructor() {
            super(...arguments);
            this._skills = [];
        }
        get team() { return this._team; }
        get name() { return this._name; }
        InitSync(reader) {
            super.InitSync(reader);
            this._team = reader.int32();
            this._name = reader.string();
            const speed = new Vec2_1.Vec2(reader.double(), reader.double());
            const count = reader.int32();
            for (let i = 0; i < count; ++i) {
                const skill = new Skill_1.Skill();
                skill.Init(reader.int32());
                this._skills.push(skill);
            }
        }
        DecodeSync(reader) {
            super.DecodeSync(reader);
            this._team = reader.int32();
            this._name = reader.string();
            const speed = new Vec2_1.Vec2(reader.double(), reader.double());
            const count = reader.int32();
            for (let i = 0; i < count; ++i) {
                reader.int32();
            }
        }
        HasSkill(id) {
            for (const skill of this._skills) {
                if (skill.id == id)
                    return true;
            }
            return false;
        }
        GetSkill(id) {
            for (const skill of this._skills) {
                if (skill.id == id)
                    return skill;
            }
            return null;
        }
        GetSkillAt(index) {
            return this._skills[index];
        }
    }
    exports.VChampion = VChampion;
});
//# sourceMappingURL=VChampion.js.map