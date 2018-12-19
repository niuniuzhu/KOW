define(["require", "exports", "../../Libs/decimal", "../../RC/FMath/FMathUtils", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../Defs", "../EntityType", "../FSM/EntityFSM", "../FSM/EntityState", "../FSM/StateEnums", "../Skill", "./Attribute"], function (require, exports, decimal_1, FMathUtils_1, FVec2_1, Hashtable_1, Defs_1, EntityType_1, EntityFSM_1, EntityState_1, StateEnums_1, Skill_1, Attribute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entity {
        constructor() {
            this.attribute = new Attribute_1.Attribute();
            this.position = FVec2_1.FVec2.zero;
            this.direction = FVec2_1.FVec2.zero;
            this._skills = [];
            this._speed = FVec2_1.FVec2.zero;
            this._fsm = new EntityFSM_1.EntityFSM();
            this._fsm.AddState(new EntityState_1.EntityState(StateEnums_1.StateType.Idle, this));
            this._fsm.AddState(new EntityState_1.EntityState(StateEnums_1.StateType.Move, this));
            this._fsm.AddState(new EntityState_1.EntityState(StateEnums_1.StateType.Attack, this));
            this._fsm.AddState(new EntityState_1.EntityState(StateEnums_1.StateType.Die, this));
        }
        get type() { return EntityType_1.EntityType.Undefined; }
        get id() { return this._id; }
        get battle() { return this._battle; }
        get actorID() { return this._actorID; }
        get team() { return this._team; }
        get name() { return this._name; }
        get def() { return this._def; }
        get fsm() { return this._fsm; }
        get canMove() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_MOVE).lessThanOrEqualTo(FMathUtils_1.FMathUtils.D_ZERO); }
        get canTurn() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_TURN).lessThanOrEqualTo(FMathUtils_1.FMathUtils.D_ZERO); }
        get canUseSkill() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_SKILL).lessThanOrEqualTo(FMathUtils_1.FMathUtils.D_ZERO); }
        get isSuperArmor() { return this.attribute.Get(Attribute_1.EAttr.S_SUPPER_ARMOR).greaterThan(FMathUtils_1.FMathUtils.D_ZERO); }
        get isInvulnerability() { return this.attribute.Get(Attribute_1.EAttr.S_INVULNER_ABILITY).greaterThan(FMathUtils_1.FMathUtils.D_ZERO); }
        Init(battle, id, actorID, team, name) {
            this._battle = battle;
            this._id = id;
            this._actorID = actorID;
            this._team = team;
            this._name = name;
            this.LoadDef();
            this._fsm.Init();
            this._fsm.ChangeState(StateEnums_1.StateType.Idle);
        }
        Dispose() {
        }
        LoadDef() {
            this._def = Defs_1.Defs.GetEntity(this.actorID);
            this.attribute.Set(Attribute_1.EAttr.RADIUS, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "radius")));
            this.attribute.Set(Attribute_1.EAttr.MHP, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "mhp")));
            this.attribute.Set(Attribute_1.EAttr.HP, this.attribute.Get(Attribute_1.EAttr.MHP));
            this.attribute.Set(Attribute_1.EAttr.MMP, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "mmp")));
            this.attribute.Set(Attribute_1.EAttr.MP, this.attribute.Get(Attribute_1.EAttr.MMP));
            this.attribute.Set(Attribute_1.EAttr.MOVE_SPEED, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "move_speed")));
            const skillsDef = Hashtable_1.Hashtable.GetNumberArray(this._def, "skills");
            for (const sid of skillsDef) {
                const skill = new Skill_1.Skill();
                skill.Init(sid);
                this._skills.push(skill);
            }
        }
        EncodeSnapshot(writer) {
            writer.int32(this.type);
            writer.uint64(this._id);
            writer.int32(this._actorID);
            writer.int32(this._team);
            writer.string(this._name);
            writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
            writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
            writer.float(this._speed.x.toNumber()).float(this._speed.y.toNumber());
            const count = this.attribute.count;
            writer.int32(count);
            this.attribute.Foreach((v, k) => {
                writer.int32(k).float(v.toNumber());
            });
            writer.int32(this._skills.length);
            for (const skill of this._skills) {
                writer.int32(skill.id);
            }
            this._fsm.EncodeSnapshot(writer);
        }
        DecodeSnapshot(reader) {
            this._actorID = reader.int32();
            this._team = reader.int32();
            this._name = reader.string();
            this.position = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this.direction = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this._speed = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            let count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), new decimal_1.default(reader.float()));
            }
            count = reader.int32();
            for (let i = 0; i < count; ++i) {
                const skill = new Skill_1.Skill();
                skill.Init(reader.int32());
                this._skills.push(skill);
            }
            this._fsm.DecodeSnapshot(reader);
        }
        EncodeSync(writer) {
            writer.int32(this.type);
            writer.uint64(this._id);
            writer.int32(this._actorID);
            writer.int32(this._team);
            writer.string(this._name);
            writer.float(this.position.x.toNumber()).float(this.position.y.toNumber());
            writer.float(this.direction.x.toNumber()).float(this.direction.y.toNumber());
            writer.float(this._speed.x.toNumber()).float(this._speed.y.toNumber());
            const count = this.attribute.count;
            writer.int32(count);
            this.attribute.Foreach((v, k, map) => {
                writer.int32(k).float(v.toNumber());
            });
            writer.int32(this._skills.length);
            for (const skill of this._skills) {
                writer.int32(skill.id);
            }
            writer.int32(this._fsm.currentState.type);
            writer.float(this._fsm.currentState.time.toNumber());
        }
        Update(dt) {
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
            if (this.canTurn) {
                this.direction = direction;
            }
            this._speed = direction.MulN(this.attribute.Get(Attribute_1.EAttr.MOVE_SPEED));
        }
        MoveStep(dt) {
            if (this._speed.SqrMagnitude().lessThan(FMathUtils_1.FMathUtils.D_SMALL)) {
                this._fsm.ChangeState(StateEnums_1.StateType.Idle);
                return;
            }
            if (this.canMove) {
                const moveDelta = FVec2_1.FVec2.MulN(this._speed, FMathUtils_1.FMathUtils.D_SMALL1.mul(dt));
                const pos = FVec2_1.FVec2.Add(this.position, moveDelta);
                const radius = this.attribute.Get(Attribute_1.EAttr.RADIUS);
                pos.x = decimal_1.default.max(decimal_1.default.add(this._battle.bounds.xMin, radius), pos.x);
                pos.x = decimal_1.default.min(decimal_1.default.sub(this._battle.bounds.xMax, radius), pos.x);
                pos.y = decimal_1.default.max(decimal_1.default.add(this._battle.bounds.yMin, radius), pos.y);
                pos.y = decimal_1.default.min(decimal_1.default.sub(this._battle.bounds.yMax, radius), pos.y);
                this.position = pos;
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
            this.fsm.ChangeState(skill.connectedState, skill);
            return true;
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map