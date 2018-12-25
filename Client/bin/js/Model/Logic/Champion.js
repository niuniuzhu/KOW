define(["require", "exports", "../../RC/FMath/FMathUtils", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../Defs", "../FSM/EntityFSM", "../FSM/EntityState", "../FSM/StateEnums", "../Skill", "./Attribute", "./Entity"], function (require, exports, FMathUtils_1, FVec2_1, Hashtable_1, Defs_1, EntityFSM_1, EntityState_1, StateEnums_1, Skill_1, Attribute_1, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Champion extends Entity_1.Entity {
        constructor() {
            super(...arguments);
            this._fsm = new EntityFSM_1.EntityFSM();
        }
        get team() { return this._team; }
        get name() { return this._name; }
        get fsm() { return this._fsm; }
        get canMove() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_MOVE) <= 0; }
        get canTurn() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_TURN) <= 0; }
        get canUseSkill() { return this.attribute.Get(Attribute_1.EAttr.S_DISABLE_SKILL) <= 0; }
        get isSuperArmor() { return this.attribute.Get(Attribute_1.EAttr.S_SUPPER_ARMOR) > 0; }
        get isInvulnerability() { return this.attribute.Get(Attribute_1.EAttr.S_INVULNER_ABILITY) > 0; }
        Init(params) {
            super.Init(params);
            this._team = params.team;
            this._name = params.name;
        }
        OnInit() {
            this._def = Defs_1.Defs.GetEntity(this._id);
            this.attribute.Set(Attribute_1.EAttr.RADIUS, Hashtable_1.Hashtable.GetNumber(this._def, "radius"));
            this.attribute.Set(Attribute_1.EAttr.MHP, Hashtable_1.Hashtable.GetNumber(this._def, "mhp"));
            this.attribute.Set(Attribute_1.EAttr.HP, this.attribute.Get(Attribute_1.EAttr.MHP));
            this.attribute.Set(Attribute_1.EAttr.MMP, Hashtable_1.Hashtable.GetNumber(this._def, "mmp"));
            this.attribute.Set(Attribute_1.EAttr.MP, this.attribute.Get(Attribute_1.EAttr.MMP));
            this.attribute.Set(Attribute_1.EAttr.MOVE_SPEED, Hashtable_1.Hashtable.GetNumber(this._def, "move_speed"));
            this._skills = [];
            const skillsDef = Hashtable_1.Hashtable.GetNumberArray(this._def, "skills");
            if (skillsDef != null) { }
            for (const sid of skillsDef) {
                const skill = new Skill_1.Skill();
                skill.Init(sid);
                this._skills.push(skill);
            }
            const statesDef = Hashtable_1.Hashtable.GetMap(this._def, "states");
            if (statesDef != null) {
                for (const type in statesDef) {
                    this._fsm.AddState(new EntityState_1.EntityState(Number.parseInt(type), this));
                }
                this._fsm.Init();
                this._fsm.ChangeState(Hashtable_1.Hashtable.GetNumber(this._def, "default_state"));
            }
        }
        EncodeSnapshot(writer) {
            super.EncodeSnapshot(writer);
            writer.int32(this._team);
            writer.string(this._name);
            this._fsm.EncodeSnapshot(writer);
        }
        DecodeSnapshot(reader) {
            super.DecodeSnapshot(reader);
            this._team = reader.int32();
            this._name = reader.string();
            this._fsm.DecodeSnapshot(reader);
        }
        EncodeSync(writer) {
            super.EncodeSync(writer);
            writer.int32(this._team);
            writer.string(this._name);
            writer.bool(this._fsm.currentState != null);
            if (this._fsm.currentState != null) {
                writer.int32(this._fsm.currentState.type);
                writer.double(this._fsm.currentState.time);
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
            const direction = new FVec2_1.FVec2(FMathUtils_1.FMathUtils.ToFixed(dx), FMathUtils_1.FMathUtils.ToFixed(dy));
            if (direction.SqrMagnitude() < FMathUtils_1.FMathUtils.EPSILON) {
                this.attribute.Set(Attribute_1.EAttr.MOVE_DIRECTION_X, 0);
                this.attribute.Set(Attribute_1.EAttr.MOVE_DIRECTION_Y, 0);
                this.attribute.Set(Attribute_1.EAttr.MOVE_VECTOR_X, 0);
                this.attribute.Set(Attribute_1.EAttr.MOVE_VECTOR_Y, 0);
            }
            else {
                this.attribute.Set(Attribute_1.EAttr.MOVE_DIRECTION_X, direction.x);
                this.attribute.Set(Attribute_1.EAttr.MOVE_DIRECTION_Y, direction.y);
                const v = FVec2_1.FVec2.MulN(direction, this.attribute.Get(Attribute_1.EAttr.MOVE_SPEED));
                this.attribute.Set(Attribute_1.EAttr.MOVE_VECTOR_X, v.x);
                this.attribute.Set(Attribute_1.EAttr.MOVE_VECTOR_Y, v.y);
            }
        }
        MoveStep(dt) {
            let mx = 0;
            let my = 0;
            if (this.canMove) {
                mx = this.attribute.Get(Attribute_1.EAttr.MOVE_VECTOR_X);
                my = this.attribute.Get(Attribute_1.EAttr.MOVE_VECTOR_Y);
            }
            if (mx == 0 && my == 0) {
                this._fsm.ChangeState(StateEnums_1.StateType.Idle);
            }
            else {
                if (this.canTurn) {
                    this.direction.Set(this.attribute.Get(Attribute_1.EAttr.MOVE_DIRECTION_X), this.attribute.Get(Attribute_1.EAttr.MOVE_DIRECTION_Y));
                }
                this._fsm.ChangeState(StateEnums_1.StateType.Move);
            }
            const ix = this.attribute.Get(Attribute_1.EAttr.INTERSET_VECTOR_X);
            const iy = this.attribute.Get(Attribute_1.EAttr.INTERSET_VECTOR_Y);
            const moveVector = new FVec2_1.FVec2(FMathUtils_1.FMathUtils.Add(mx, ix), FMathUtils_1.FMathUtils.Add(my, iy));
            const sqrtDis = moveVector.SqrMagnitude();
            if (sqrtDis < FMathUtils_1.FMathUtils.EPSILON) {
                this.attribute.Set(Attribute_1.EAttr.VELOCITY, 0);
                return;
            }
            this.attribute.Set(Attribute_1.EAttr.VELOCITY, FMathUtils_1.FMathUtils.Sqrt(sqrtDis));
            const moveDelta = FVec2_1.FVec2.MulN(moveVector, FMathUtils_1.FMathUtils.Mul(0.001, dt));
            const pos = FVec2_1.FVec2.Add(this.position, moveDelta);
            const radius = this.attribute.Get(Attribute_1.EAttr.RADIUS);
            pos.x = FMathUtils_1.FMathUtils.Max(FMathUtils_1.FMathUtils.Add(this._battle.bounds.xMin, radius), pos.x);
            pos.x = FMathUtils_1.FMathUtils.Min(FMathUtils_1.FMathUtils.Sub(this._battle.bounds.xMax, radius), pos.x);
            pos.y = FMathUtils_1.FMathUtils.Max(FMathUtils_1.FMathUtils.Add(this._battle.bounds.yMin, radius), pos.y);
            pos.y = FMathUtils_1.FMathUtils.Min(FMathUtils_1.FMathUtils.Sub(this._battle.bounds.yMax, radius), pos.y);
            this.position.CopyFrom(pos);
        }
        DetectIntersetions(others) {
            const intersectVector = FVec2_1.FVec2.zero;
            for (const other of others) {
                if (other == this ||
                    (this.attribute.Get(Attribute_1.EAttr.MOVE_VECTOR_X) == 0 && this.attribute.Get(Attribute_1.EAttr.MOVE_VECTOR_Y) == 0)) {
                    continue;
                }
                const d = FVec2_1.FVec2.Sub(this.position, other.position);
                const magnitude = d.Magnitude();
                const r = FMathUtils_1.FMathUtils.Add(this.attribute.Get(Attribute_1.EAttr.RADIUS), other.attribute.Get(Attribute_1.EAttr.RADIUS));
                if (magnitude >= r)
                    continue;
                const delta = r - magnitude;
                const deltaFactor = FMathUtils_1.FMathUtils.Mul(this.attribute.Get(Attribute_1.EAttr.VELOCITY), 0.15);
                const direction = d.DivN(magnitude);
                intersectVector.Add(FVec2_1.FVec2.MulN(direction, FMathUtils_1.FMathUtils.Mul(delta, deltaFactor)));
            }
            this.attribute.Set(Attribute_1.EAttr.INTERSET_VECTOR_X, intersectVector.x);
            this.attribute.Set(Attribute_1.EAttr.INTERSET_VECTOR_Y, intersectVector.y);
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
        Dump() {
            let str = super.Dump();
            str += `team:${this._team}\n`;
            str += `name:${this._name}\n`;
            str += `skill count${this._skills.length}\n`;
            str += this._fsm.Dump();
            return str;
        }
    }
    exports.Champion = Champion;
});
//# sourceMappingURL=Champion.js.map