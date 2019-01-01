define(["require", "exports", "../../RC/FMath/FMathUtils", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../Defs", "../FSM/EntityFSM", "../FSM/EntityState", "../IntersectInfo", "../Skill", "./Attribute", "./Entity", "./InputAagent"], function (require, exports, FMathUtils_1, FVec2_1, Hashtable_1, Defs_1, EntityFSM_1, EntityState_1, IntersectInfo_1, Skill_1, Attribute_1, Entity_1, InputAagent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Champion extends Entity_1.Entity {
        constructor(battle) {
            super(battle);
            this._skills = [];
            this._fsm = new EntityFSM_1.EntityFSM();
            this._inputAgent = new InputAagent_1.InputAgent();
            this.disableMove = 0;
            this.disableTurn = 0;
            this.disableSkill = 0;
            this.supperArmor = 0;
            this.invulnerAbility = 0;
            this.moveDirection = FVec2_1.FVec2.zero;
            this.intersectVector = FVec2_1.FVec2.zero;
            this.phyxSpeed = FVec2_1.FVec2.zero;
            this.t_hp_add = 0;
            this.t_mp_add = 0;
            this.t_atk_add = 0;
            this.t_def_add = 0;
            this.t_speed_add = 0;
            this._intersections = [];
            this._inputAgent.handler = this.HandleInput.bind(this);
        }
        get fsm() { return this._fsm; }
        get inputAgent() { return this._inputAgent; }
        get radius() { return this._radius; }
        get moveSpeed() { return this._moveSpeed; }
        get numSkills() { return this._skills.length; }
        get intersections() { return this._intersections; }
        Init(params) {
            super.Init(params);
            this.team = params.team;
            this.name = params.name;
        }
        LoadDefs() {
            this._defs = Defs_1.Defs.GetEntity(this._id);
        }
        OnInit() {
            super.OnInit();
            this._radius = Hashtable_1.Hashtable.GetNumber(this._defs, "radius");
            this._moveSpeed = Hashtable_1.Hashtable.GetNumber(this._defs, "move_speed");
            const skillsDef = Hashtable_1.Hashtable.GetNumberArray(this._defs, "skills");
            if (skillsDef != null) { }
            for (const sid of skillsDef) {
                const skill = new Skill_1.Skill();
                skill.Init(sid);
                this._skills.push(skill);
            }
            const statesDef = Hashtable_1.Hashtable.GetMap(this._defs, "states");
            if (statesDef != null) {
                for (const type in statesDef) {
                    this._fsm.AddState(new EntityState_1.EntityState(Number.parseInt(type), this));
                }
                this._fsm.Init();
                this._fsm.ChangeState(Hashtable_1.Hashtable.GetNumber(this._defs, "default_state"));
            }
            this.hp = this.mhp = Hashtable_1.Hashtable.GetNumber(this._defs, "mhp");
            this.mp = this.mmp = Hashtable_1.Hashtable.GetNumber(this._defs, "mmp");
        }
        EncodeSnapshot(writer) {
            super.EncodeSnapshot(writer);
            writer.int32(this.team);
            writer.string(this.name);
            writer.int32(this.hp);
            writer.int32(this.mhp);
            writer.int32(this.mp);
            writer.int32(this.mmp);
            writer.int32(this.atk);
            writer.int32(this.def);
            writer.int32(this.disableMove);
            writer.int32(this.disableTurn);
            writer.int32(this.disableSkill);
            writer.int32(this.supperArmor);
            writer.int32(this.invulnerAbility);
            writer.double(this.moveDirection.x).double(this.moveDirection.y);
            writer.double(this.intersectVector.x).double(this.intersectVector.y);
            writer.double(this.phyxSpeed.x).double(this.phyxSpeed.y);
            writer.double(this.velocity);
            writer.int32(this.t_hp_add);
            writer.int32(this.t_mp_add);
            writer.int32(this.t_atk_add);
            writer.int32(this.t_def_add);
            writer.int32(this.t_speed_add);
            this._fsm.EncodeSnapshot(writer);
            this._inputAgent.EncodeSnapshot(writer);
        }
        DecodeSnapshot(reader) {
            super.DecodeSnapshot(reader);
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
            this.intersectVector.Set(reader.double(), reader.double());
            this.phyxSpeed.Set(reader.double(), reader.double());
            this.velocity = reader.double();
            this.t_hp_add = reader.int32();
            this.t_mp_add = reader.int32();
            this.t_atk_add = reader.int32();
            this.t_def_add = reader.int32();
            this.t_speed_add = reader.int32();
            this._fsm.DecodeSnapshot(reader);
            this._inputAgent.DecodeSnapshot(reader);
        }
        EncodeSync(writer) {
            super.EncodeSync(writer);
            writer.int32(this.team);
            writer.string(this.name);
            writer.int32(this.hp);
            writer.int32(this.mhp);
            writer.int32(this.mp);
            writer.int32(this.mmp);
            writer.int32(this.atk);
            writer.int32(this.def);
            writer.int32(this.disableMove);
            writer.int32(this.disableTurn);
            writer.int32(this.disableSkill);
            writer.int32(this.supperArmor);
            writer.int32(this.invulnerAbility);
            writer.double(this.moveDirection.x).double(this.moveDirection.y);
            writer.int32(this.t_hp_add);
            writer.int32(this.t_mp_add);
            writer.int32(this.t_atk_add);
            writer.int32(this.t_def_add);
            writer.int32(this.t_speed_add);
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
            this._intersections.splice(0);
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
        SetAttr(attr, value) {
            switch (attr) {
                case Attribute_1.EAttr.S_DISABLE_MOVE:
                    this.disableMove = value;
                    break;
                case Attribute_1.EAttr.S_DISABLE_TURN:
                    this.disableTurn = value;
                    break;
                case Attribute_1.EAttr.S_DISABLE_SKILL:
                    this.disableSkill = value;
                    break;
                case Attribute_1.EAttr.S_SUPPER_ARMOR:
                    this.supperArmor = value;
                    break;
                case Attribute_1.EAttr.S_INVULNER_ABILITY:
                    this.invulnerAbility = value;
                    break;
                case Attribute_1.EAttr.S_HP_ADD:
                    this.t_hp_add = value;
                    break;
                case Attribute_1.EAttr.S_MP_ADD:
                    this.t_mp_add = value;
                    break;
                case Attribute_1.EAttr.S_ATK_ADD:
                    this.t_atk_add = value;
                    break;
                case Attribute_1.EAttr.S_DEF_ADD:
                    this.t_def_add = value;
                    break;
                case Attribute_1.EAttr.S_SPEED_ADD:
                    this.t_speed_add = value;
                    break;
            }
        }
        GetAttr(attr) {
            switch (attr) {
                case Attribute_1.EAttr.S_DISABLE_MOVE:
                    return this.disableMove;
                case Attribute_1.EAttr.S_DISABLE_TURN:
                    return this.disableTurn;
                case Attribute_1.EAttr.S_DISABLE_SKILL:
                    return this.disableSkill;
                case Attribute_1.EAttr.S_SUPPER_ARMOR:
                    return this.supperArmor;
                case Attribute_1.EAttr.S_INVULNER_ABILITY:
                    return this.invulnerAbility;
                case Attribute_1.EAttr.S_HP_ADD:
                    return this.t_hp_add;
                case Attribute_1.EAttr.S_MP_ADD:
                    return this.t_mp_add;
                case Attribute_1.EAttr.S_ATK_ADD:
                    return this.t_atk_add;
                case Attribute_1.EAttr.S_DEF_ADD:
                    return this.t_def_add;
                case Attribute_1.EAttr.S_SPEED_ADD:
                    return this.t_speed_add;
            }
        }
        MoveStep(dt) {
            const moveVector = FVec2_1.FVec2.zero;
            if (this.disableMove <= 0) {
                moveVector.CopyFrom(this.moveDirection);
            }
            if (moveVector.SqrMagnitude() >= FMathUtils_1.FMathUtils.EPSILON) {
                if (this.disableTurn <= 0) {
                    this.direction.CopyFrom(this.moveDirection);
                }
                moveVector.MulN(this._moveSpeed);
            }
            moveVector.Add(this.intersectVector);
            moveVector.Add(this.phyxSpeed);
            const sqrtDis = moveVector.SqrMagnitude();
            if (sqrtDis < FMathUtils_1.FMathUtils.EPSILON) {
                this.velocity = 0;
                return;
            }
            this.velocity = FMathUtils_1.FMathUtils.Sqrt(sqrtDis);
            const moveDelta = FVec2_1.FVec2.MulN(moveVector, FMathUtils_1.FMathUtils.Mul(0.001, dt));
            const pos = FVec2_1.FVec2.Add(this.position, moveDelta);
            pos.x = FMathUtils_1.FMathUtils.Max(FMathUtils_1.FMathUtils.Add(this._battle.bounds.xMin, this._radius), pos.x);
            pos.x = FMathUtils_1.FMathUtils.Min(FMathUtils_1.FMathUtils.Sub(this._battle.bounds.xMax, this._radius), pos.x);
            pos.y = FMathUtils_1.FMathUtils.Max(FMathUtils_1.FMathUtils.Add(this._battle.bounds.yMin, this._radius), pos.y);
            pos.y = FMathUtils_1.FMathUtils.Min(FMathUtils_1.FMathUtils.Sub(this._battle.bounds.yMax, this._radius), pos.y);
            this.position.CopyFrom(pos);
        }
        IntersectionTest(others, from) {
            for (let i = from; i < others.length; ++i) {
                const other = others[i];
                const d = FVec2_1.FVec2.Sub(this.position, other.position);
                const m = d.SqrMagnitude();
                const r = FMathUtils_1.FMathUtils.Add(this._radius, other._radius);
                if (m >= r * r)
                    continue;
                const sqrtM = FMathUtils_1.FMathUtils.Sqrt(m);
                const intersectInfo0 = new IntersectInfo_1.IntersectInfo();
                intersectInfo0.rid = other.rid;
                intersectInfo0.distanceVector = d;
                intersectInfo0.tRadius = r;
                intersectInfo0.magnitude = sqrtM;
                this._intersections.push(intersectInfo0);
                const intersectInfo1 = new IntersectInfo_1.IntersectInfo();
                intersectInfo1.rid = this.rid;
                intersectInfo1.distanceVector = FVec2_1.FVec2.Negate(d);
                intersectInfo1.tRadius = r;
                intersectInfo1.magnitude = sqrtM;
                other._intersections.push(intersectInfo1);
            }
        }
        UpdatePhysic(dt) {
            this.intersectVector.Set(0, 0);
            for (const intersectInfo of this._intersections) {
                const delta = intersectInfo.tRadius - intersectInfo.magnitude;
                const deltaFactor = FMathUtils_1.FMathUtils.Mul(this.velocity, 10);
                const direction = intersectInfo.distanceVector.DivN(intersectInfo.magnitude);
                this.intersectVector.Add(FVec2_1.FVec2.MulN(direction, FMathUtils_1.FMathUtils.Mul(delta, deltaFactor)));
            }
            this._fsm.UpdatePhysic(dt);
        }
        UseSkill(sid) {
            if (this.disableSkill > 0)
                return false;
            const skill = this.GetSkill(sid);
            if (skill == null)
                return false;
            if (!this.fsm.HasState(skill.connectedState))
                return false;
            this.fsm.ChangeState(skill.connectedState);
            return true;
        }
        FrameAction(frameAction) {
            this._inputAgent.SetFromFrameAction(frameAction);
        }
        HandleInput(type, press) {
            this._fsm.HandleInput(type, press);
        }
        Dump() {
            let str = super.Dump();
            str += `team:${this.team}\n`;
            str += `name:${this.name}\n`;
            str += `skill count${this._skills.length}\n`;
            str += this._fsm.Dump();
            return str;
        }
    }
    exports.Champion = Champion;
});
//# sourceMappingURL=Champion.js.map