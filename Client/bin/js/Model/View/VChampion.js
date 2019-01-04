define(["require", "exports", "../../RC/FSM/FSM", "../../RC/Math/Vec2", "../../RC/Utils/Hashtable", "../CDefs", "../Defs", "../FSM/VEntityState", "../Skill", "./HUD", "./VEntity"], function (require, exports, FSM_1, Vec2_1, Hashtable_1, CDefs_1, Defs_1, VEntityState_1, Skill_1, HUD_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VChampion extends VEntity_1.VEntity {
        constructor(battle) {
            super(battle);
            this._skills = [];
            this._fsm = new FSM_1.FSM();
            this.moveDirection = Vec2_1.Vec2.zero;
            this.t_hp_add = 0;
            this.t_mp_add = 0;
            this.t_atk_add = 0;
            this.t_def_add = 0;
            this.t_speed_add = 0;
            this._hud = new HUD_1.HUD(this);
        }
        get hud() { return this._hud; }
        get fsm() { return this._fsm; }
        LoadDefs() {
            this._defs = Defs_1.Defs.GetEntity(this._id);
            this._cdefs = CDefs_1.CDefs.GetEntity(this._id);
        }
        OnInit() {
            super.OnInit();
            const skillsDef = Hashtable_1.Hashtable.GetNumberArray(this._defs, "skills");
            for (const sid of skillsDef) {
                const skill = new Skill_1.Skill();
                skill.Init(sid);
                this._skills.push(skill);
            }
            const statesDef = Hashtable_1.Hashtable.GetMap(this._defs, "states");
            if (statesDef != null) {
                for (const type in statesDef) {
                    this._fsm.AddState(new VEntityState_1.VEntityState(Number.parseInt(type), this));
                }
            }
        }
        Update(dt) {
            super.Update(dt);
            this._hud.Update(dt);
        }
        DecodeSync(rid, reader, isNew) {
            super.DecodeSync(rid, reader, isNew);
            this.team = reader.int32();
            this.name = reader.string();
            this.hp = reader.int32();
            this.mhp = reader.int32();
            this.mp = reader.int32();
            this.mmp = reader.int32();
            this.atk = reader.int32();
            this.def = reader.int32();
            this.disableMove = reader.int32();
            this.disableTurn = reader.int32();
            this.disableSkill = reader.int32();
            this.supperArmor = reader.int32();
            this.invulnerAbility = reader.int32();
            this.moveDirection.Set(reader.double(), reader.double());
            this.t_hp_add = reader.int32();
            this.t_mp_add = reader.int32();
            this.t_atk_add = reader.int32();
            this.t_def_add = reader.int32();
            this.t_speed_add = reader.int32();
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