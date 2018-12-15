define(["require", "exports", "../../Libs/decimal", "../../RC/FMath/FVec2", "../../RC/Math/MathUtils", "../../RC/Utils/Hashtable", "../Attribute", "../Defs", "../EntityType", "../FSM/EntityFSM", "../FSM/EntityState", "../FSM/StateEnums"], function (require, exports, decimal_1, FVec2_1, MathUtils_1, Hashtable_1, Attribute_1, Defs_1, EntityType_1, EntityFSM_1, EntityState_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entity {
        constructor() {
            this.attribute = new Attribute_1.Attribute();
            this.position = FVec2_1.FVec2.zero;
            this.direction = FVec2_1.FVec2.zero;
            this._moveDirection = FVec2_1.FVec2.zero;
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
            this.attribute.Set(Attribute_1.EAttr.MOVE_SPEED_FACTOR, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "move_speed_factor")));
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
            this.position = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this.direction = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this._moveDirection = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this._fsm.ChangeState(reader.int32(), null, true);
            this._fsm.currentState.time = new decimal_1.default(reader.float());
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), new decimal_1.default(reader.float()));
            }
        }
        Update(dt) {
            this._fsm.Update(dt);
            this.MoveStep(this._moveDirection, dt);
        }
        BeginMove(dx, dy) {
            this._moveDirection = new FVec2_1.FVec2(new decimal_1.default(dx), new decimal_1.default(dy));
            if (this._moveDirection.SqrMagnitude().lessThan(MathUtils_1.MathUtils.D_SMALL))
                this._fsm.ChangeState(StateEnums_1.StateType.Idle);
            else
                this._fsm.ChangeState(StateEnums_1.StateType.Move);
        }
        MoveStep(direction, dt) {
            if (direction.SqrMagnitude().lessThan(MathUtils_1.MathUtils.D_SMALL))
                return;
            const speed = this.attribute.Get(Attribute_1.EAttr.MOVE_SPEED);
            const moveDelta = FVec2_1.FVec2.MulN(FVec2_1.FVec2.MulN(direction, speed), MathUtils_1.MathUtils.D_SMALL1.mul(dt));
            const pos = FVec2_1.FVec2.Add(this.position, moveDelta);
            const radius = this.attribute.Get(Attribute_1.EAttr.RADIUS);
            pos.x = decimal_1.default.max(decimal_1.default.add(this._battle.bounds.xMin, radius), pos.x);
            pos.x = decimal_1.default.min(decimal_1.default.sub(this._battle.bounds.xMax, radius), pos.x);
            pos.y = decimal_1.default.max(decimal_1.default.add(this._battle.bounds.yMin, radius), pos.y);
            pos.y = decimal_1.default.min(decimal_1.default.sub(this._battle.bounds.yMax, radius), pos.y);
            this.position = pos;
            this.direction = direction;
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map