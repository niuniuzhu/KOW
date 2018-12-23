define(["require", "exports", "../../RC/FSM/FSM", "../../RC/Math/Vec2", "../../RC/Utils/Hashtable", "../FSM/VEntityState", "../Skill", "./VEntity"], function (require, exports, FSM_1, Vec2_1, Hashtable_1, VEntityState_1, Skill_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VChampion extends VEntity_1.VEntity {
        constructor() {
            super(...arguments);
            this._fsm = new FSM_1.FSM();
            this._moveSpeed = Vec2_1.Vec2.zero;
        }
        get team() { return this._team; }
        get name() { return this._name; }
        OnInit() {
            super.OnInit();
            this._skills = [];
            const skillsDef = Hashtable_1.Hashtable.GetNumberArray(this._def, "skills");
            for (const sid of skillsDef) {
                const skill = new Skill_1.Skill();
                skill.Init(sid);
                this._skills.push(skill);
            }
            const statesDef = Hashtable_1.Hashtable.GetMap(this._def, "states");
            if (statesDef != null) {
                for (const type in statesDef) {
                    this._fsm.AddState(new VEntityState_1.VEntityState(Number.parseInt(type), this));
                }
            }
        }
        DecodeSync(rid, reader, isNew) {
            super.DecodeSync(rid, reader, isNew);
            this._team = reader.int32();
            this._name = reader.string();
            this._moveSpeed.Set(reader.double(), reader.double());
            if (reader.bool()) {
                this._fsm.ChangeState(reader.int32(), null);
                this._fsm.currentState.time = reader.double();
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