import Decimal from "../../Libs/decimal";
import { FSM } from "../../RC/FSM/FSM";
import { FVec2 } from "../../RC/FMath/FVec2";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Attribute, EAttr } from "../Attribute";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { EntityState } from "./FSM/EntityState";
export class Entity {
    constructor() {
        this.attribute = new Attribute();
        this.position = FVec2.zero;
        this.direction = FVec2.zero;
        this._moveDirection = FVec2.zero;
        this._fsm = new FSM();
        this._fsm.AddState(new EntityState(EntityState.Type.Idle, this));
        this._fsm.AddState(new EntityState(EntityState.Type.Move, this));
        this._fsm.AddState(new EntityState(EntityState.Type.Attack, this));
        this._fsm.AddState(new EntityState(EntityState.Type.Die, this));
    }
    get type() { return EntityType.Undefined; }
    get id() { return this._id; }
    get battle() { return this._battle; }
    get actorID() { return this._actorID; }
    get team() { return this._team; }
    get name() { return this._name; }
    get def() { return this._def; }
    get fsm() { return this._fsm; }
    Init(battle, id, actorID, team, name) {
        this._battle = battle;
        this._id = id;
        this._actorID = actorID;
        this._team = team;
        this._name = name;
        this.LoadDef();
        this._fsm.ChangeState(EntityState.Type.Idle);
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
        this.attribute.Set(EAttr.MOVE_SPEED_FACTOR, new Decimal(Hashtable.GetNumber(this._def, "move_speed_factor")));
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
        writer.int32(this._fsm.currentState.type);
        writer.float(this._fsm.currentState.time.toNumber());
        const count = this.attribute.count;
        writer.int32(count);
        this.attribute.Foreach((v, k, map) => {
            writer.int32(k).float(v.toNumber());
        });
    }
    DecodeSnapshot(reader) {
        this._actorID = reader.int32();
        this._team = reader.int32();
        this._name = reader.string();
        this.position = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this.direction = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._fsm.ChangeState(reader.int32(), null, true);
        this._fsm.currentState.time = new Decimal(reader.float());
        const count = reader.int32();
        for (let i = 0; i < count; i++) {
            this.attribute.Set(reader.int32(), new Decimal(reader.float()));
        }
    }
    Update(dt) {
        this._fsm.Update(dt);
        this.MoveStep(this._moveDirection, dt);
    }
    BeginMove(dx, dy) {
        this._moveDirection = new FVec2(new Decimal(dx), new Decimal(dy));
        if (this._moveDirection.SqrMagnitude().lessThan(MathUtils.D_SMALL))
            this._fsm.ChangeState(EntityState.Type.Idle);
        else
            this._fsm.ChangeState(EntityState.Type.Move);
    }
    MoveStep(direction, dt) {
        if (direction.SqrMagnitude().lessThan(MathUtils.D_SMALL))
            return;
        const speed = this.attribute.Get(EAttr.MOVE_SPEED);
        const moveDelta = FVec2.MulN(FVec2.MulN(direction, speed), MathUtils.D_SMALL1.mul(dt));
        const pos = FVec2.Add(this.position, moveDelta);
        const radius = this.attribute.Get(EAttr.RADIUS);
        pos.x = Decimal.max(Decimal.add(this._battle.bounds.xMin, radius), pos.x);
        pos.x = Decimal.min(Decimal.sub(this._battle.bounds.xMax, radius), pos.x);
        pos.y = Decimal.max(Decimal.add(this._battle.bounds.yMin, radius), pos.y);
        pos.y = Decimal.min(Decimal.sub(this._battle.bounds.yMax, radius), pos.y);
        this.position = pos;
        this.direction = direction;
    }
}
