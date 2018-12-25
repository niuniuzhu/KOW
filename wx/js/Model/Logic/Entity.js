import Decimal from "../../Libs/decimal";
import { FVec2 } from "../../RC/FMath/FVec2";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Attribute, EAttr } from "../Attribute";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { EntityFSM } from "../FSM/EntityFSM";
import { EntityState } from "../FSM/EntityState";
import { StateType } from "../FSM/StateEnums";
import { Skill } from "../Skill";
export class Entity {
    constructor() {
        this.attribute = new Attribute();
        this.position = FVec2.zero;
        this.direction = FVec2.zero;
        this._skills = [];
        this._moveDirection = FVec2.zero;
        this._fsm = new EntityFSM();
        this._fsm.AddState(new EntityState(StateType.Idle, this));
        this._fsm.AddState(new EntityState(StateType.Move, this));
        this._fsm.AddState(new EntityState(StateType.Attack, this));
        this._fsm.AddState(new EntityState(StateType.Die, this));
    }
    get type() { return EntityType.Undefined; }
    get id() { return this._id; }
    get battle() { return this._battle; }
    get actorID() { return this._actorID; }
    get team() { return this._team; }
    get name() { return this._name; }
    get def() { return this._def; }
    get fsm() { return this._fsm; }
    get canMove() { return this.attribute.Get(EAttr.S_DISABLE_MOVE).lessThanOrEqualTo(MathUtils.D_ZERO); }
    get canTurn() { return this.attribute.Get(EAttr.S_DISABLE_TURN).lessThanOrEqualTo(MathUtils.D_ZERO); }
    get canUseSkill() { return this.attribute.Get(EAttr.S_DISABLE_SKILL).lessThanOrEqualTo(MathUtils.D_ZERO); }
    get isSuperArmor() { return this.attribute.Get(EAttr.S_SUPPER_ARMOR).greaterThan(MathUtils.D_ZERO); }
    get isInvulnerability() { return this.attribute.Get(EAttr.S_INVULNER_ABILITY).greaterThan(MathUtils.D_ZERO); }
    Init(battle, id, actorID, team, name) {
        this._battle = battle;
        this._id = id;
        this._actorID = actorID;
        this._team = team;
        this._name = name;
        this.LoadDef();
        this._fsm.Init();
        this._fsm.ChangeState(StateType.Idle);
    }
    Dispose() {
    }
    LoadDef() {
        this._def = Defs.GetEntity(this.actorID);
        this.attribute.Set(EAttr.RADIUS, new Decimal(Hashtable.GetNumber(this._def, "radius")));
        this.attribute.Set(EAttr.MHP, new Decimal(Hashtable.GetNumber(this._def, "mhp")));
        this.attribute.Set(EAttr.HP, this.attribute.Get(EAttr.MHP));
        this.attribute.Set(EAttr.MMP, new Decimal(Hashtable.GetNumber(this._def, "mmp")));
        this.attribute.Set(EAttr.MP, this.attribute.Get(EAttr.MMP));
        this.attribute.Set(EAttr.MOVE_SPEED, new Decimal(Hashtable.GetNumber(this._def, "move_speed")));
        const skillsDef = Hashtable.GetNumberArray(this._def, "skills");
        for (const sid of skillsDef) {
            const skill = new Skill();
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
        writer.float(this._moveDirection.x.toNumber()).float(this._moveDirection.y.toNumber());
        const count = this.attribute.count;
        writer.int32(count);
        this.attribute.Foreach((v, k, map) => {
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
        this.position = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this.direction = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        let count = reader.int32();
        for (let i = 0; i < count; i++) {
            this.attribute.Set(reader.int32(), new Decimal(reader.float()));
        }
        count = reader.int32();
        for (let i = 0; i < count; ++i) {
            const skill = new Skill();
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
        writer.float(this._moveDirection.x.toNumber()).float(this._moveDirection.y.toNumber());
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
        this.MoveStep(this._moveDirection, dt);
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
        this._moveDirection = new FVec2(new Decimal(dx), new Decimal(dy));
    }
    MoveStep(direction, dt) {
        if (direction.SqrMagnitude().lessThan(MathUtils.D_SMALL)) {
            this._fsm.ChangeState(StateType.Idle);
            return;
        }
        if (this.canMove) {
            const speed = this.attribute.Get(EAttr.MOVE_SPEED);
            const moveDelta = FVec2.MulN(FVec2.MulN(direction, speed), MathUtils.D_SMALL1.mul(dt));
            const pos = FVec2.Add(this.position, moveDelta);
            const radius = this.attribute.Get(EAttr.RADIUS);
            pos.x = Decimal.max(Decimal.add(this._battle.bounds.xMin, radius), pos.x);
            pos.x = Decimal.min(Decimal.sub(this._battle.bounds.xMax, radius), pos.x);
            pos.y = Decimal.max(Decimal.add(this._battle.bounds.yMin, radius), pos.y);
            pos.y = Decimal.min(Decimal.sub(this._battle.bounds.yMax, radius), pos.y);
            this.position = pos;
            this._fsm.ChangeState(StateType.Move);
        }
        if (this.canTurn) {
            this.direction = direction;
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
