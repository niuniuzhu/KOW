define(["require", "exports", "../../RC/FSM/FSM", "../../RC/Math/Vec2", "../../RC/Utils/Hashtable", "../BattleEvent/UIEvent", "../CDefs", "../Defs", "../Logic/Attribute", "../Skill", "./AnimationProxy", "./FSM/VEntityState", "./HUD", "./VEntity"], function (require, exports, FSM_1, Vec2_1, Hashtable_1, UIEvent_1, CDefs_1, Defs_1, Attribute_1, Skill_1, AnimationProxy_1, VEntityState_1, HUD_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VChampion extends VEntity_1.VEntity {
        constructor(battle) {
            super(battle);
            this._skills = [];
            this._fsm = new FSM_1.FSM();
            this._moveDirection = Vec2_1.Vec2.zero;
            this._t_hp_add = 0;
            this._t_mp_add = 0;
            this._t_atk_add = 0;
            this._t_def_add = 0;
            this._t_speed_add = 0;
            this._hud = new HUD_1.HUD(this);
        }
        get hud() { return this._hud; }
        get fsm() { return this._fsm; }
        get hp() { return this._hp; }
        get mhp() { return this._mhp; }
        get mp() { return this._mp; }
        get mmp() { return this._mmp; }
        get mpRecover() { return this._mpRecover; }
        get atk() { return this._atk; }
        get def() { return this._def; }
        get disableMove() { return this._disableMove; }
        get disableTurn() { return this._disableTurn; }
        get disableSkill() { return this._disableSkill; }
        get disableCollision() { return this._disableCollision; }
        get supperArmor() { return this._supperArmor; }
        get invulnerAbility() { return this._invulnerAbility; }
        get moveDirection() { return this._moveDirection; }
        get gladiatorTime() { return this._gladiatorTime; }
        get t_hp_add() { return this._t_hp_add; }
        get t_mp_add() { return this._t_mp_add; }
        get t_atk_add() { return this._t_atk_add; }
        get t_def_add() { return this._t_def_add; }
        get t_speed_add() { return this._t_speed_add; }
        set hp(value) { if (this._hp == value)
            return; this._hp = value; this.OnAttrChange(Attribute_1.EAttr.HP, value); }
        set mhp(value) { if (this._mhp == value)
            return; this._mhp = value; this.OnAttrChange(Attribute_1.EAttr.MHP, value); }
        set mp(value) { if (this._mp == value)
            return; this._mp = value; this.OnAttrChange(Attribute_1.EAttr.MP, value); }
        set mmp(value) { if (this._mmp == value)
            return; this._mmp = value; this.OnAttrChange(Attribute_1.EAttr.MMP, value); }
        set mpRecover(value) { if (this._mpRecover == value)
            return; this._mpRecover = value; this.OnAttrChange(Attribute_1.EAttr.MP_RECOVER, value); }
        set atk(value) { if (this._atk == value)
            return; this._atk = value; this.OnAttrChange(Attribute_1.EAttr.ATK, value); }
        set def(value) { if (this._def == value)
            return; this._def = value; this.OnAttrChange(Attribute_1.EAttr.DEF, value); }
        set disableMove(value) { if (this._disableMove == value)
            return; this._disableMove = value; this.OnAttrChange(Attribute_1.EAttr.S_DISABLE_MOVE, value); }
        set disableTurn(value) { if (this._disableTurn == value)
            return; this._disableTurn = value; this.OnAttrChange(Attribute_1.EAttr.S_DISABLE_TURN, value); }
        set disableSkill(value) { if (this._disableSkill == value)
            return; this._disableSkill = value; this.OnAttrChange(Attribute_1.EAttr.S_DISABLE_SKILL, value); }
        set disableCollision(value) { if (this._disableCollision == value)
            return; this._disableCollision = value; this.OnAttrChange(Attribute_1.EAttr.S_DISABLE_COLLISION, value); }
        set supperArmor(value) { if (this._supperArmor == value)
            return; this._supperArmor = value; this.OnAttrChange(Attribute_1.EAttr.S_SUPPER_ARMOR, value); }
        set invulnerAbility(value) { if (this._invulnerAbility == value)
            return; this._invulnerAbility = value; this.OnAttrChange(Attribute_1.EAttr.S_INVULNER_ABILITY, value); }
        set moveDirection(value) { if (this._moveDirection.EqualsTo(value))
            return; this._moveDirection.CopyFrom(value); this.OnAttrChange(Attribute_1.EAttr.MOVE_DIRECTION, value); }
        set gladiatorTime(value) { if (this._gladiatorTime == value)
            return; this._gladiatorTime = value; this.OnAttrChange(Attribute_1.EAttr.GLADIATOR_TIME, value); }
        set t_hp_add(value) { if (this._t_hp_add == value)
            return; this._t_hp_add = value; this.OnAttrChange(Attribute_1.EAttr.S_HP_ADD, value); }
        set t_mp_add(value) { if (this._t_mp_add == value)
            return; this._t_mp_add = value; this.OnAttrChange(Attribute_1.EAttr.S_MP_ADD, value); }
        set t_atk_add(value) { if (this._t_atk_add == value)
            return; this._t_atk_add = value; this.OnAttrChange(Attribute_1.EAttr.S_ATK_ADD, value); }
        set t_def_add(value) { if (this._t_def_add == value)
            return; this._t_def_add = value; this.OnAttrChange(Attribute_1.EAttr.S_DEF_ADD, value); }
        set t_speed_add(value) { if (this._t_speed_add == value)
            return; this._t_speed_add = value; this.OnAttrChange(Attribute_1.EAttr.S_SPEED_ADD, value); }
        LoadDefs() {
            const defs = Defs_1.Defs.GetEntity(this._id);
            const cdefs = CDefs_1.CDefs.GetEntity(this._id);
            const modelID = Hashtable_1.Hashtable.GetNumber(cdefs, "model", -1);
            if (modelID >= 0) {
                this._animationProxy = new AnimationProxy_1.AnimationProxy(modelID);
                this._root.addChild(this._animationProxy);
            }
            const skillsDef = Hashtable_1.Hashtable.GetNumberArray(defs, "skills");
            for (const sid of skillsDef) {
                const skill = new Skill_1.Skill();
                skill.Init(sid);
                this._skills.push(skill);
            }
            const statesDef = Hashtable_1.Hashtable.GetMap(cdefs, "states");
            if (statesDef != null) {
                for (const type in statesDef) {
                    const state = new VEntityState_1.VEntityState(Number.parseInt(type), this);
                    this._fsm.AddState(state);
                    state.Init(statesDef);
                }
            }
        }
        OnAttrChange(attr, value) {
            UIEvent_1.UIEvent.AttrChange(this, attr, value);
        }
        Update(dt) {
            super.Update(dt);
            this._hud.Update(dt);
        }
        DecodeSync(rid, reader, isNew) {
            super.DecodeSync(rid, reader, isNew);
            UIEvent_1.UIEvent.ChampionInit(this);
            this.team = reader.int32();
            this.name = reader.string();
            this.hp = reader.int32();
            this.mhp = reader.int32();
            this.mp = reader.double();
            this.mmp = reader.int32();
            this.mpRecover = reader.int32();
            this.atk = reader.int32();
            this.def = reader.int32();
            this.disableMove = reader.int32();
            this.disableTurn = reader.int32();
            this.disableSkill = reader.int32();
            this.disableCollision = reader.int32();
            this.supperArmor = reader.int32();
            this.invulnerAbility = reader.int32();
            this.moveDirection = new Vec2_1.Vec2(reader.double(), reader.double());
            this.gladiatorTime = reader.int32();
            this.t_hp_add = reader.int32();
            this.t_mp_add = reader.int32();
            this.t_atk_add = reader.int32();
            this.t_def_add = reader.int32();
            this.t_speed_add = reader.int32();
            if (reader.bool()) {
                const stateType = reader.int32();
                this._fsm.ChangeState(stateType, null);
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