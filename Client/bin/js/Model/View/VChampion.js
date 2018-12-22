define(["require", "exports", "../../RC/Math/Vec2", "../../RC/Utils/Hashtable", "../FSM/StateEnums", "../FSM/VEntityState", "../Skill", "./VEntity"], function (require, exports, Vec2_1, Hashtable_1, StateEnums_1, VEntityState_1, Skill_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VChampion extends VEntity_1.VEntity {
        constructor() {
            super(...arguments);
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
            this._fsm.AddState(new VEntityState_1.VEntityState(StateEnums_1.StateType.Idle, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(StateEnums_1.StateType.Move, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(StateEnums_1.StateType.Attack, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(StateEnums_1.StateType.Die, this));
        }
        InitSync(reader) {
            super.InitSync(reader);
            this._team = reader.int32();
            this._name = reader.string();
            this._moveSpeed.Set(reader.double(), reader.double());
        }
        DecodeSync(reader) {
            super.DecodeSync(reader);
            this._team = reader.int32();
            this._name = reader.string();
            this._moveSpeed.Set(reader.double(), reader.double());
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