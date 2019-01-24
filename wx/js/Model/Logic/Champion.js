import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { IntersectInfo } from "./IntersectInfo";
import { Skill } from "../Skill";
import { StateType } from "../Defines";
import { EAttr } from "./Attribute";
import { Entity } from "./Entity";
import { EntityFSM } from "./FSM/EntityFSM";
import { EntityState } from "./FSM/EntityState";
import { InputAgent } from "./InputAagent";
export class Champion extends Entity {
    constructor(battle) {
        super(battle);
        this._skills = [];
        this._fsm = new EntityFSM();
        this._inputAgent = new InputAgent();
        this.disableMove = 0;
        this.disableTurn = 0;
        this.disableSkill = 0;
        this.disableCollision = 0;
        this.supperArmor = 0;
        this.invulnerAbility = 0;
        this.moveDirection = FVec2.zero;
        this.intersectVector = FVec2.zero;
        this.phyxSpeed = FVec2.zero;
        this.gladiatorTime = -1;
        this.t_hp_add = 0;
        this.t_mp_add = 0;
        this.t_atk_add = 0;
        this.t_def_add = 0;
        this.t_speed_add = 0;
        this._intersectionCache = [];
        this._inputAgent.handler = this.HandleInput.bind(this);
    }
    get type() { return EntityType.Champion; }
    get fsm() { return this._fsm; }
    get inputAgent() { return this._inputAgent; }
    get radius() { return this._radius; }
    get moveSpeed() { return this._moveSpeed; }
    get numSkills() { return this._skills.length; }
    get isInGladiator() { return FVec2.DistanceSquared(this.position, this._battle.gladiatorPos) <= FMathUtils.Mul(this._battle.gladiatorRadius, this._battle.gladiatorRadius); }
    get intersectionCache() { return this._intersectionCache; }
    Init(params) {
        super.Init(params);
        this.team = params.team;
        this.name = params.name;
    }
    LoadDefs() {
        const defs = Defs.GetEntity(this._id);
        this._radius = Hashtable.GetNumber(defs, "radius");
        this._moveSpeed = Hashtable.GetNumber(defs, "move_speed");
        const skillsDef = Hashtable.GetNumberArray(defs, "skills");
        if (skillsDef != null) { }
        for (const sid of skillsDef) {
            const skill = new Skill();
            skill.Init(sid);
            this._skills.push(skill);
        }
        const statesDef = Hashtable.GetMap(defs, "states");
        if (statesDef != null) {
            for (const type in statesDef) {
                const state = new EntityState(Number.parseInt(type), this);
                state.Init(statesDef[type]);
                this._fsm.AddState(state);
            }
            this._fsm.ChangeState(Hashtable.GetNumber(defs, "default_state"));
        }
        this.hp = this.mhp = Hashtable.GetNumber(defs, "mhp");
        this.mmp = Hashtable.GetNumber(defs, "mmp");
        this.mp = 0;
        this.mpRecover = Hashtable.GetNumber(defs, "mp_recover");
        this.atk = Hashtable.GetNumber(defs, "atk");
        this.def = Hashtable.GetNumber(defs, "def");
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
        let v = FMathUtils.Add(this.mp, FMathUtils.Mul(this.mpRecover, FMathUtils.Mul(0.001, dt)));
        v = FMathUtils.Min(v, this.mmp);
        this.SetAttr(EAttr.MP, v);
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
            const d = FVec2.Sub(this.position, other.position);
            const m = d.SqrMagnitude();
            const r = FMathUtils.Add(this._radius, other._radius);
            if (m >= r * r)
                continue;
            const sqrtM = FMathUtils.Sqrt(m);
            const intersectInfo0 = new IntersectInfo();
            intersectInfo0.rid = other.rid;
            intersectInfo0.distanceVector = d;
            intersectInfo0.tRadius = r;
            intersectInfo0.magnitude = sqrtM == 0 ? FMathUtils.EPSILON : sqrtM;
            this._intersectionCache.push(intersectInfo0);
            const intersectInfo1 = new IntersectInfo();
            intersectInfo1.rid = this.rid;
            intersectInfo1.distanceVector = FVec2.Negate(d);
            intersectInfo1.tRadius = r;
            intersectInfo1.magnitude = sqrtM == 0 ? FMathUtils.EPSILON : sqrtM;
            other._intersectionCache.push(intersectInfo1);
        }
    }
    UpdatePhysic(dt) {
        this._fsm.UpdatePhysic(dt);
        this.intersectVector.Set(0, 0);
        for (const intersectInfo of this._intersectionCache) {
            const delta = FMathUtils.Div(intersectInfo.tRadius, intersectInfo.magnitude);
            const direction = intersectInfo.distanceVector.DivN(intersectInfo.magnitude);
            this.intersectVector.Add(FVec2.MulN(direction, delta));
        }
        const sqrMagnitude = this.intersectVector.SqrMagnitude();
        if (sqrMagnitude > FMathUtils.Mul(this._moveSpeed, this._moveSpeed)) {
            this.intersectVector.DivN(FMathUtils.Sqrt(sqrMagnitude));
            this.intersectVector.MulN(this._moveSpeed);
        }
    }
    AfterUpdate(dt) {
        this.MoveStep(dt);
    }
    MoveStep(dt) {
        const moveVector = FVec2.zero;
        if (this.disableMove <= 0) {
            moveVector.CopyFrom(this.moveDirection);
        }
        let sqrtDis = moveVector.SqrMagnitude();
        if (sqrtDis >= FMathUtils.EPSILON) {
            if (this.disableTurn <= 0) {
                this.direction.CopyFrom(this.moveDirection);
            }
            moveVector.MulN(this._moveSpeed);
        }
        moveVector.Add(this.intersectVector);
        moveVector.Add(this.phyxSpeed);
        sqrtDis = moveVector.SqrMagnitude();
        if (sqrtDis < FMathUtils.EPSILON) {
            this.velocity = 0;
            return;
        }
        this.velocity = FMathUtils.Sqrt(sqrtDis);
        const moveDelta = FVec2.MulN(moveVector, FMathUtils.Mul(0.001, dt));
        const pos = FVec2.Add(this.position, moveDelta);
        pos.x = FMathUtils.Max(this._battle.bounds.xMin, pos.x);
        pos.x = FMathUtils.Min(this._battle.bounds.xMax, pos.x);
        pos.y = FMathUtils.Max(this._battle.bounds.yMin, pos.y);
        pos.y = FMathUtils.Min(this._battle.bounds.yMax, pos.y);
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
        this._fsm.ChangeState(StateType.Die, null, true, true);
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
            case EAttr.HP:
                value = FMathUtils.Clamp(value, 0, this.mhp);
                this.hp = value;
                break;
            case EAttr.MHP:
                value = value < 0 ? 0 : value;
                this.mhp = value;
                break;
            case EAttr.MP:
                value = FMathUtils.Clamp(value, 0, this.mmp);
                this.mp = value;
                break;
            case EAttr.MMP:
                value = value < 0 ? 0 : value;
                this.mmp = value;
                break;
            case EAttr.ATK:
                value = value < 0 ? 0 : value;
                this.atk = value;
                break;
            case EAttr.DEF:
                value = value < 0 ? 0 : value;
                this.def = value;
                break;
            case EAttr.S_DISABLE_MOVE:
                this.disableMove = value;
                break;
            case EAttr.S_DISABLE_TURN:
                this.disableTurn = value;
                break;
            case EAttr.S_DISABLE_SKILL:
                this.disableSkill = value;
                break;
            case EAttr.S_DISABLE_COLLISION:
                this.disableCollision = value;
                break;
            case EAttr.S_SUPPER_ARMOR:
                this.supperArmor = value;
                break;
            case EAttr.S_INVULNER_ABILITY:
                this.invulnerAbility = value;
                break;
            case EAttr.GLADIATOR_TIME:
                this.gladiatorTime = value;
                break;
            case EAttr.S_HP_ADD:
                this.t_hp_add = value;
                break;
            case EAttr.S_MP_ADD:
                this.t_mp_add = value;
                break;
            case EAttr.S_ATK_ADD:
                this.t_atk_add = value;
                break;
            case EAttr.S_DEF_ADD:
                this.t_def_add = value;
                break;
            case EAttr.S_SPEED_ADD:
                this.t_speed_add = value;
                break;
        }
    }
    GetAttr(attr) {
        switch (attr) {
            case EAttr.HP:
                return this.hp;
            case EAttr.MHP:
                return this.mhp;
            case EAttr.MP:
                return this.mp;
            case EAttr.MMP:
                return this.mmp;
            case EAttr.ATK:
                return this.atk;
            case EAttr.DEF:
                return this.def;
            case EAttr.S_DISABLE_MOVE:
                return this.disableMove;
            case EAttr.S_DISABLE_TURN:
                return this.disableTurn;
            case EAttr.S_DISABLE_SKILL:
                return this.disableSkill;
            case EAttr.S_DISABLE_COLLISION:
                return this.disableCollision;
            case EAttr.S_SUPPER_ARMOR:
                return this.supperArmor;
            case EAttr.S_INVULNER_ABILITY:
                return this.invulnerAbility;
            case EAttr.GLADIATOR_TIME:
                return this.gladiatorTime;
            case EAttr.S_HP_ADD:
                return this.t_hp_add;
            case EAttr.S_MP_ADD:
                return this.t_mp_add;
            case EAttr.S_ATK_ADD:
                return this.t_atk_add;
            case EAttr.S_DEF_ADD:
                return this.t_def_add;
            case EAttr.S_SPEED_ADD:
                return this.t_speed_add;
        }
    }
    Dump() {
        let str = super.Dump();
        str += `team:${this.team}\n`;
        str += `name:${this.name}\n`;
        str += `moveDirection:${this.moveDirection.ToString()}\n`;
        str += `phyxSpeed:${this.phyxSpeed.ToString()}\n`;
        str += `velocity:${this.velocity}\n`;
        str += `skill count:${this._skills.length}\n`;
        str += `gladiatorTime:${this.gladiatorTime}\n`;
        str += this._fsm.Dump();
        return str;
    }
}
