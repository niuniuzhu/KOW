define(["require", "exports", "../../Libs/decimal", "../../RC/FMath/FMathUtils", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../Defs", "../FSM/EntityFSM", "../FSM/EntityState", "../FSM/StateEnums", "../Skill", "./Attribute", "./Entity"], function (require, exports, decimal_1, FMathUtils_1, FVec2_1, Hashtable_1, Defs_1, EntityFSM_1, EntityState_1, StateEnums_1, Skill_1, Attribute_1, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Champion extends Entity_1.Entity {
        constructor() {
            super(...arguments);
            this._moveSpeed = FVec2_1.FVec2.zero;
        }
        get team() { return this._team; }
        get name() { return this._name; }
        get canMove() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_MOVE).lessThanOrEqualTo(FMathUtils_1.FMathUtils.D_ZERO); }
        get canTurn() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_TURN).lessThanOrEqualTo(FMathUtils_1.FMathUtils.D_ZERO); }
        get canUseSkill() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_SKILL).lessThanOrEqualTo(FMathUtils_1.FMathUtils.D_ZERO); }
        get isSuperArmor() { return this.attribute.Get(Attribute_1.EAttr.S_SUPPER_ARMOR).greaterThan(FMathUtils_1.FMathUtils.D_ZERO); }
        get isInvulnerability() { return this.attribute.Get(Attribute_1.EAttr.S_INVULNER_ABILITY).greaterThan(FMathUtils_1.FMathUtils.D_ZERO); }
        Init(params) {
            super.Init(params);
            this._team = params.team;
            this._name = params.name;
        }
        OnInit() {
            this._def = Defs_1.Defs.GetEntity(this._id);
            this.attribute.Set(Attribute_1.EAttr.RADIUS, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "radius")));
            this.attribute.Set(Attribute_1.EAttr.MHP, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "mhp")));
            this.attribute.Set(Attribute_1.EAttr.HP, this.attribute.Get(Attribute_1.EAttr.MHP));
            this.attribute.Set(Attribute_1.EAttr.MMP, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "mmp")));
            this.attribute.Set(Attribute_1.EAttr.MP, this.attribute.Get(Attribute_1.EAttr.MMP));
            this.attribute.Set(Attribute_1.EAttr.MOVE_SPEED, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "move_speed")));
            this._skills = [];
            const skillsDef = Hashtable_1.Hashtable.GetNumberArray(this._def, "skills");
            for (const sid of skillsDef) {
                const skill = new Skill_1.Skill();
                skill.Init(sid);
                this._skills.push(skill);
            }
            this._fsm = new EntityFSM_1.EntityFSM();
            this._fsm.AddState(new EntityState_1.EntityState(StateEnums_1.StateType.Idle, this));
            this._fsm.AddState(new EntityState_1.EntityState(StateEnums_1.StateType.Move, this));
            this._fsm.AddState(new EntityState_1.EntityState(StateEnums_1.StateType.Attack, this));
            this._fsm.AddState(new EntityState_1.EntityState(StateEnums_1.StateType.Die, this));
            this._fsm.Init();
            this._fsm.ChangeState(StateEnums_1.StateType.Idle);
        }
        EncodeSnapshot(writer) {
            super.EncodeSnapshot(writer);
            writer.int32(this._team);
            writer.string(this._name);
            writer.float(this._moveSpeed.x.toNumber()).float(this._moveSpeed.y.toNumber());
            writer.int32(this._skills.length);
            for (const skill of this._skills) {
                writer.int32(skill.id);
            }
        }
        DecodeSnapshot(reader) {
            super.DecodeSnapshot(reader);
            this._team = reader.int32();
            this._name = reader.string();
            this.OnInit();
            this._moveSpeed = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            const count = reader.int32();
            for (let i = 0; i < count; ++i) {
                const skill = new Skill_1.Skill();
                skill.Init(reader.int32());
                this._skills.push(skill);
            }
        }
        EncodeSync(writer) {
            super.EncodeSync(writer);
            writer.int32(this._team);
            writer.string(this._name);
            writer.float(this._moveSpeed.x.toNumber()).float(this._moveSpeed.y.toNumber());
            writer.int32(this._skills.length);
            for (const skill of this._skills) {
                writer.int32(skill.id);
            }
        }
        Update(dt) {
            super.Update(dt);
            this._fsm.Update(dt);
            this.MoveStep(dt);
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
        BeginMove(dx, dy) {
            const direction = new FVec2_1.FVec2(new decimal_1.default(dx), new decimal_1.default(dy));
            if (direction.SqrMagnitude().lessThan(FMathUtils_1.FMathUtils.D_SMALL)) {
                this._moveSpeed = FVec2_1.FVec2.zero;
            }
            else {
                if (this.canTurn) {
                    this.direction.CopyFrom(direction);
                }
                this._moveSpeed = FVec2_1.FVec2.MulN(direction, this.attribute.Get(Attribute_1.EAttr.MOVE_SPEED));
            }
        }
        MoveStep(dt) {
            if (this._moveSpeed.SqrMagnitude().lessThan(FMathUtils_1.FMathUtils.D_SMALL)) {
                this._fsm.ChangeState(StateEnums_1.StateType.Idle);
                return;
            }
            if (this.canMove) {
                const moveDelta = FVec2_1.FVec2.MulN(this._moveSpeed, FMathUtils_1.FMathUtils.D_SMALL1.mul(dt));
                const pos = FVec2_1.FVec2.Add(this.position, moveDelta);
                const radius = this.attribute.Get(Attribute_1.EAttr.RADIUS);
                pos.x = decimal_1.default.max(decimal_1.default.add(this._battle.bounds.xMin, radius), pos.x);
                pos.x = decimal_1.default.min(decimal_1.default.sub(this._battle.bounds.xMax, radius), pos.x);
                pos.y = decimal_1.default.max(decimal_1.default.add(this._battle.bounds.yMin, radius), pos.y);
                pos.y = decimal_1.default.min(decimal_1.default.sub(this._battle.bounds.yMax, radius), pos.y);
                this.position.CopyFrom(pos);
                this._fsm.ChangeState(StateEnums_1.StateType.Move);
            }
        }
        UseSkill(sid) {
            if (!this.canUseSkill)
                return false;
            const skill = this.GetSkill(sid);
            if (skill == null)
                return false;
            if (!this.fsm.HasState(skill.connectedState))
                return false;
            this.fsm.ChangeState(skill.connectedState, [this.rid, skill.id]);
            return true;
        }
    }
    exports.Champion = Champion;
});
//# sourceMappingURL=Champion.js.map