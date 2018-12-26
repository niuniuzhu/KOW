import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { EntityFSM } from "../FSM/EntityFSM";
import { EntityState } from "../FSM/EntityState";
import { StateType } from "../FSM/StateEnums";
import { Skill } from "../Skill";
import { EAttr } from "./Attribute";
import { Entity } from "./Entity";
export class Champion extends Entity {
    constructor() {
        super(...arguments);
        this._fsm = new EntityFSM();
        this.disableMove = 0;
        this.disableTurn = 0;
        this.disableSkill = 0;
        this.supperArmor = 0;
        this.invulnerAbility = 0;
        this.moveDirection = FVec2.zero;
        this.intersectVector = FVec2.zero;
        this.t_hp_add = 0;
        this.t_mp_add = 0;
        this.t_atk_add = 0;
        this.t_def_add = 0;
        this.t_speed_add = 0;
    }
    get fsm() { return this._fsm; }
    get radius() { return this._radius; }
    get moveSpeed() { return this._moveSpeed; }
    Init(params) {
        super.Init(params);
        this.team = params.team;
        this.name = params.name;
    }
    LoadDefs() {
        this._defs = Defs.GetEntity(this._id);
    }
    OnInit() {
        super.OnInit();
        this._radius = Hashtable.GetNumber(this._defs, "radius");
        this._moveSpeed = Hashtable.GetNumber(this._defs, "move_speed");
        this._skills = [];
        const skillsDef = Hashtable.GetNumberArray(this._defs, "skills");
        if (skillsDef != null) { }
        for (const sid of skillsDef) {
            const skill = new Skill();
            skill.Init(sid);
            this._skills.push(skill);
        }
        const statesDef = Hashtable.GetMap(this._defs, "states");
        if (statesDef != null) {
            for (const type in statesDef) {
                this._fsm.AddState(new EntityState(Number.parseInt(type), this));
            }
            this._fsm.Init();
            this._fsm.ChangeState(Hashtable.GetNumber(this._defs, "default_state"));
        }
        this.hp = this.mhp = Hashtable.GetNumber(this._defs, "mhp");
        this.mp = this.mmp = Hashtable.GetNumber(this._defs, "mmp");
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
        writer.int32(this.t_hp_add);
        writer.int32(this.t_mp_add);
        writer.int32(this.t_atk_add);
        writer.int32(this.t_def_add);
        writer.int32(this.t_speed_add);
        this._fsm.EncodeSnapshot(writer);
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
        this.t_hp_add = reader.int32();
        this.t_mp_add = reader.int32();
        this.t_atk_add = reader.int32();
        this.t_def_add = reader.int32();
        this.t_speed_add = reader.int32();
        this._fsm.DecodeSnapshot(reader);
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
            case EAttr.S_DISABLE_MOVE:
                this.disableMove = value;
                break;
            case EAttr.S_DISABLE_TURN:
                this.disableTurn = value;
                break;
            case EAttr.S_DISABLE_SKILL:
                this.disableSkill = value;
                break;
            case EAttr.S_SUPPER_ARMOR:
                this.supperArmor = value;
                break;
            case EAttr.S_INVULNER_ABILITY:
                this.invulnerAbility = value;
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
            case EAttr.S_DISABLE_MOVE:
                return this.disableMove;
            case EAttr.S_DISABLE_TURN:
                return this.disableTurn;
            case EAttr.S_DISABLE_SKILL:
                return this.disableSkill;
            case EAttr.S_SUPPER_ARMOR:
                return this.supperArmor;
            case EAttr.S_INVULNER_ABILITY:
                return this.invulnerAbility;
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
    BeginMove(dx, dy) {
        const direction = new FVec2(FMathUtils.ToFixed(dx), FMathUtils.ToFixed(dy));
        if (direction.SqrMagnitude() < FMathUtils.EPSILON) {
            this.moveDirection.Set(0, 0);
        }
        else {
            this.moveDirection.CopyFrom(direction);
        }
    }
    MoveStep(dt) {
        const moveVector = FVec2.zero;
        if (this.disableMove <= 0) {
            moveVector.CopyFrom(this.moveDirection);
        }
        if (moveVector.x == 0 && moveVector.y == 0) {
            this._fsm.ChangeState(StateType.Idle);
        }
        else {
            if (this.disableTurn <= 0) {
                this.direction.CopyFrom(this.moveDirection);
            }
            moveVector.MulN(this._moveSpeed);
            this._fsm.ChangeState(StateType.Move);
        }
        moveVector.Add(this.intersectVector);
        const sqrtDis = moveVector.SqrMagnitude();
        if (sqrtDis < FMathUtils.EPSILON) {
            this.velocity = 0;
            return;
        }
        this.velocity = FMathUtils.Sqrt(sqrtDis);
        const moveDelta = FVec2.MulN(moveVector, FMathUtils.Mul(0.001, dt));
        const pos = FVec2.Add(this.position, moveDelta);
        pos.x = FMathUtils.Max(FMathUtils.Add(this._battle.bounds.xMin, this._radius), pos.x);
        pos.x = FMathUtils.Min(FMathUtils.Sub(this._battle.bounds.xMax, this._radius), pos.x);
        pos.y = FMathUtils.Max(FMathUtils.Add(this._battle.bounds.yMin, this._radius), pos.y);
        pos.y = FMathUtils.Min(FMathUtils.Sub(this._battle.bounds.yMax, this._radius), pos.y);
        this.position.CopyFrom(pos);
    }
    Intersect(others) {
        this.intersectVector.Set(0, 0);
        for (const other of others) {
            if (other == this) {
                continue;
            }
            const d = FVec2.Sub(this.position, other.position);
            const magnitude = d.Magnitude();
            const r = FMathUtils.Add(this._radius, other._radius);
            if (magnitude >= r)
                continue;
            const delta = r - magnitude;
            const deltaFactor = FMathUtils.Mul(this.velocity, 0.1);
            const direction = d.DivN(magnitude);
            this.intersectVector.Add(FVec2.MulN(direction, FMathUtils.Mul(delta, deltaFactor)));
        }
    }
    UseSkill(sid) {
        if (this.disableSkill > 0)
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
        str += `team:${this.team}\n`;
        str += `name:${this.name}\n`;
        str += `skill count${this._skills.length}\n`;
        str += this._fsm.Dump();
        return str;
    }
}
