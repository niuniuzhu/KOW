define(["require", "exports", "../../RC/FMath/FMathUtils", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../Defs", "../EntityType", "./IntersectInfo", "../Skill", "../StateEnums", "./Attribute", "./Entity", "./FSM/EntityFSM", "./FSM/EntityState", "./InputAagent"], function (require, exports, FMathUtils_1, FVec2_1, Hashtable_1, Defs_1, EntityType_1, IntersectInfo_1, Skill_1, StateEnums_1, Attribute_1, Entity_1, EntityFSM_1, EntityState_1, InputAagent_1) {
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
            this.disableCollision = 0;
            this.supperArmor = 0;
            this.invulnerAbility = 0;
            this.moveDirection = FVec2_1.FVec2.zero;
            this.intersectVector = FVec2_1.FVec2.zero;
            this.phyxSpeed = FVec2_1.FVec2.zero;
            this.gladiatorTime = -1;
            this.t_hp_add = 0;
            this.t_mp_add = 0;
            this.t_atk_add = 0;
            this.t_def_add = 0;
            this.t_speed_add = 0;
            this._intersectionCache = [];
            this._inputAgent.handler = this.HandleInput.bind(this);
        }
        get type() { return EntityType_1.EntityType.Champion; }
        get fsm() { return this._fsm; }
        get inputAgent() { return this._inputAgent; }
        get radius() { return this._radius; }
        get moveSpeed() { return this._moveSpeed; }
        get numSkills() { return this._skills.length; }
        get isInGladiator() { return FVec2_1.FVec2.DistanceSquared(this.position, this._battle.gladiatorPos) <= FMathUtils_1.FMathUtils.Mul(this._battle.gladiatorRadius, this._battle.gladiatorRadius); }
        get intersectionCache() { return this._intersectionCache; }
        Init(params) {
            super.Init(params);
            this.team = params.team;
            this.name = params.name;
        }
        LoadDefs() {
            const defs = Defs_1.Defs.GetEntity(this._id);
            this._radius = Hashtable_1.Hashtable.GetNumber(defs, "radius");
            this._moveSpeed = Hashtable_1.Hashtable.GetNumber(defs, "move_speed");
            const skillsDef = Hashtable_1.Hashtable.GetNumberArray(defs, "skills");
            if (skillsDef != null) { }
            for (const sid of skillsDef) {
                const skill = new Skill_1.Skill();
                skill.Init(sid);
                this._skills.push(skill);
            }
            const statesDef = Hashtable_1.Hashtable.GetMap(defs, "states");
            if (statesDef != null) {
                for (const type in statesDef) {
                    const state = new EntityState_1.EntityState(Number.parseInt(type), this);
                    state.Init(statesDef[type]);
                    this._fsm.AddState(state);
                }
                this._fsm.ChangeState(Hashtable_1.Hashtable.GetNumber(defs, "default_state"));
            }
            this.hp = this.mhp = Hashtable_1.Hashtable.GetNumber(defs, "mhp");
            this.mmp = Hashtable_1.Hashtable.GetNumber(defs, "mmp");
            this.mp = 0;
            this.mpRecover = Hashtable_1.Hashtable.GetNumber(defs, "mp_recover");
            this.atk = Hashtable_1.Hashtable.GetNumber(defs, "atk");
            this.def = Hashtable_1.Hashtable.GetNumber(defs, "def");
        }
        EncodeSnapshot(writer) {
            super.EncodeSnapshot(writer);
            writer.int32(this.team);
            writer.string(this.name);
            writer.int32(this.hp);
            writer.int32(this.mhp);
            writer.double(this.mp);
            writer.int32(this.mmp);
            writer.int32(this.mpRecover);
            writer.int32(this.atk);
            writer.int32(this.def);
            writer.int32(this.disableMove);
            writer.int32(this.disableTurn);
            writer.int32(this.disableSkill);
            writer.int32(this.disableCollision);
            writer.int32(this.supperArmor);
            writer.int32(this.invulnerAbility);
            writer.double(this.moveDirection.x).double(this.moveDirection.y);
            writer.double(this.intersectVector.x).double(this.intersectVector.y);
            writer.double(this.phyxSpeed.x).double(this.phyxSpeed.y);
            writer.double(this.velocity);
            writer.bool(this.isDead);
            writer.int32(this.gladiatorTime);
            writer.int32(this.t_hp_add);
            writer.int32(this.t_mp_add);
            writer.int32(this.t_atk_add);
            writer.int32(this.t_def_add);
            writer.int32(this.t_speed_add);
            this._fsm.EncodeSnapshot(writer);
            writer.fork();
            this._inputAgent.EncodeSnapshot(writer);
            writer.ldelim();
        }
        DecodeSnapshot(reader) {
            super.DecodeSnapshot(reader);
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
            this.moveDirection.Set(reader.double(), reader.double());
            this.intersectVector.Set(reader.double(), reader.double());
            this.phyxSpeed.Set(reader.double(), reader.double());
            this.velocity = reader.double();
            this.isDead = reader.bool();
            this.gladiatorTime = reader.int32();
            this.t_hp_add = reader.int32();
            this.t_mp_add = reader.int32();
            this.t_atk_add = reader.int32();
            this.t_def_add = reader.int32();
            this.t_speed_add = reader.int32();
            this._fsm.DecodeSnapshot(reader);
            reader.int32();
            this._inputAgent.DecodeSnapshot(reader);
        }
        EncodeSync(writer) {
            super.EncodeSync(writer);
            writer.int32(this.team);
            writer.string(this.name);
            writer.int32(this.hp);
            writer.int32(this.mhp);
            writer.double(this.mp);
            writer.int32(this.mmp);
            writer.int32(this.mpRecover);
            writer.int32(this.atk);
            writer.int32(this.def);
            writer.int32(this.disableMove);
            writer.int32(this.disableTurn);
            writer.int32(this.disableSkill);
            writer.int32(this.disableCollision);
            writer.int32(this.supperArmor);
            writer.int32(this.invulnerAbility);
            writer.double(this.moveDirection.x).double(this.moveDirection.y);
            writer.int32(this.gladiatorTime);
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
        Update(dt) {
            super.Update(dt);
            let v = FMathUtils_1.FMathUtils.Add(this.mp, FMathUtils_1.FMathUtils.Mul(this.mpRecover, FMathUtils_1.FMathUtils.Mul(0.001, dt)));
            v = FMathUtils_1.FMathUtils.Min(v, this.mmp);
            this.SetAttr(Attribute_1.EAttr.MP, v);
            this._intersectionCache.splice(0);
            this._fsm.Update(dt);
        }
        IntersectionTest(others, from) {
            if (this.disableCollision > 0)
                return;
            for (let i = from; i < others.length; ++i) {
                const other = others[i];
                if (other.disableCollision > 0)
                    continue;
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
                intersectInfo0.magnitude = sqrtM == 0 ? FMathUtils_1.FMathUtils.EPSILON : sqrtM;
                this._intersectionCache.push(intersectInfo0);
                const intersectInfo1 = new IntersectInfo_1.IntersectInfo();
                intersectInfo1.rid = this.rid;
                intersectInfo1.distanceVector = FVec2_1.FVec2.Negate(d);
                intersectInfo1.tRadius = r;
                intersectInfo1.magnitude = sqrtM == 0 ? FMathUtils_1.FMathUtils.EPSILON : sqrtM;
                other._intersectionCache.push(intersectInfo1);
            }
        }
        UpdatePhysic(dt) {
            this._fsm.UpdatePhysic(dt);
            this.intersectVector.Set(0, 0);
            for (const intersectInfo of this._intersectionCache) {
                const delta = FMathUtils_1.FMathUtils.Div(intersectInfo.tRadius, intersectInfo.magnitude);
                const direction = intersectInfo.distanceVector.DivN(intersectInfo.magnitude);
                this.intersectVector.Add(FVec2_1.FVec2.MulN(direction, delta));
            }
            const sqrMagnitude = this.intersectVector.SqrMagnitude();
            if (sqrMagnitude > FMathUtils_1.FMathUtils.Mul(this._moveSpeed, this._moveSpeed)) {
                this.intersectVector.DivN(FMathUtils_1.FMathUtils.Sqrt(sqrMagnitude));
                this.intersectVector.MulN(this._moveSpeed);
            }
        }
        AfterUpdate(dt) {
            this.MoveStep(dt);
        }
        MoveStep(dt) {
            const moveVector = FVec2_1.FVec2.zero;
            if (this.disableMove <= 0) {
                moveVector.CopyFrom(this.moveDirection);
            }
            let sqrtDis = moveVector.SqrMagnitude();
            if (sqrtDis >= FMathUtils_1.FMathUtils.EPSILON) {
                if (this.disableTurn <= 0) {
                    this.direction.CopyFrom(this.moveDirection);
                }
                moveVector.MulN(this._moveSpeed);
            }
            moveVector.Add(this.intersectVector);
            moveVector.Add(this.phyxSpeed);
            sqrtDis = moveVector.SqrMagnitude();
            if (sqrtDis < FMathUtils_1.FMathUtils.EPSILON) {
                this.velocity = 0;
                return;
            }
            this.velocity = FMathUtils_1.FMathUtils.Sqrt(sqrtDis);
            const moveDelta = FVec2_1.FVec2.MulN(moveVector, FMathUtils_1.FMathUtils.Mul(0.001, dt));
            const pos = FVec2_1.FVec2.Add(this.position, moveDelta);
            pos.x = FMathUtils_1.FMathUtils.Max(this._battle.bounds.xMin, pos.x);
            pos.x = FMathUtils_1.FMathUtils.Min(this._battle.bounds.xMax, pos.x);
            pos.y = FMathUtils_1.FMathUtils.Max(this._battle.bounds.yMin, pos.y);
            pos.y = FMathUtils_1.FMathUtils.Min(this._battle.bounds.yMax, pos.y);
            this.position.CopyFrom(pos);
        }
        UpdateGladiator(dt) {
            this.gladiatorTime += dt;
            if (this.gladiatorTime > this._battle.gladiatorTimeout)
                this.gladiatorTime = this._battle.gladiatorTimeout;
        }
        UpdateAfterHit() {
            if (this.hp <= 0) {
                this.Die();
            }
        }
        Die() {
            this.isDead = true;
            this._fsm.ChangeState(StateEnums_1.StateType.Die, null, true, true);
        }
        UseSkill(sid) {
            if (this.disableSkill > 0)
                return false;
            const skill = this.GetSkill(sid);
            if (skill == null || this.mp < skill.mpCost)
                return false;
            if (!this.fsm.HasState(skill.connectState))
                return false;
            this.fsm.ChangeState(skill.connectState);
            return true;
        }
        FrameAction(frameAction) {
            this._inputAgent.SetFromFrameAction(frameAction);
        }
        HandleInput(type, press) {
            this._fsm.HandleInput(type, press);
        }
        SetAttr(attr, value) {
            switch (attr) {
                case Attribute_1.EAttr.HP:
                    value = FMathUtils_1.FMathUtils.Clamp(value, 0, this.mhp);
                    this.hp = value;
                    break;
                case Attribute_1.EAttr.MHP:
                    value = value < 0 ? 0 : value;
                    this.mhp = value;
                    break;
                case Attribute_1.EAttr.MP:
                    value = FMathUtils_1.FMathUtils.Clamp(value, 0, this.mmp);
                    this.mp = value;
                    break;
                case Attribute_1.EAttr.MMP:
                    value = value < 0 ? 0 : value;
                    this.mmp = value;
                    break;
                case Attribute_1.EAttr.ATK:
                    value = value < 0 ? 0 : value;
                    this.atk = value;
                    break;
                case Attribute_1.EAttr.DEF:
                    value = value < 0 ? 0 : value;
                    this.def = value;
                    break;
                case Attribute_1.EAttr.S_DISABLE_MOVE:
                    this.disableMove = value;
                    break;
                case Attribute_1.EAttr.S_DISABLE_TURN:
                    this.disableTurn = value;
                    break;
                case Attribute_1.EAttr.S_DISABLE_SKILL:
                    this.disableSkill = value;
                    break;
                case Attribute_1.EAttr.S_DISABLE_COLLISION:
                    this.disableCollision = value;
                    break;
                case Attribute_1.EAttr.S_SUPPER_ARMOR:
                    this.supperArmor = value;
                    break;
                case Attribute_1.EAttr.S_INVULNER_ABILITY:
                    this.invulnerAbility = value;
                    break;
                case Attribute_1.EAttr.GLADIATOR_TIME:
                    this.gladiatorTime = value;
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
                case Attribute_1.EAttr.HP:
                    return this.hp;
                case Attribute_1.EAttr.MHP:
                    return this.mhp;
                case Attribute_1.EAttr.MP:
                    return this.mp;
                case Attribute_1.EAttr.MMP:
                    return this.mmp;
                case Attribute_1.EAttr.ATK:
                    return this.atk;
                case Attribute_1.EAttr.DEF:
                    return this.def;
                case Attribute_1.EAttr.S_DISABLE_MOVE:
                    return this.disableMove;
                case Attribute_1.EAttr.S_DISABLE_TURN:
                    return this.disableTurn;
                case Attribute_1.EAttr.S_DISABLE_SKILL:
                    return this.disableSkill;
                case Attribute_1.EAttr.S_DISABLE_COLLISION:
                    return this.disableCollision;
                case Attribute_1.EAttr.S_SUPPER_ARMOR:
                    return this.supperArmor;
                case Attribute_1.EAttr.S_INVULNER_ABILITY:
                    return this.invulnerAbility;
                case Attribute_1.EAttr.GLADIATOR_TIME:
                    return this.gladiatorTime;
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
        Dump() {
            let str = super.Dump();
            str += `team:${this.team}\n`;
            str += `name:${this.name}\n`;
            str += `position:${this.position.ToString()}\n`;
            str += `moveDirection:${this.moveDirection.ToString()}\n`;
            str += `phyxSpeed:${this.phyxSpeed.ToString()}\n`;
            str += `velocity:${this.velocity}\n`;
            str += `skill count:${this._skills.length}\n`;
            str += `gladiatorTime:${this.gladiatorTime}\n`;
            str += this._fsm.Dump();
            return str;
        }
    }
    exports.Champion = Champion;
});
//# sourceMappingURL=Champion.js.map