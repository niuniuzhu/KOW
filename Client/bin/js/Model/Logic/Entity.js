define(["require", "exports", "../../Libs/decimal", "../../RC/FSM/FSM", "../../RC/FVec2", "../../RC/Math/MathUtils", "../../RC/Utils/Hashtable", "../Attribute", "../Defs", "../EntityType", "./FSM/EntityState"], function (require, exports, decimal_1, FSM_1, FVec2_1, MathUtils_1, Hashtable_1, Attribute_1, Defs_1, EntityType_1, EntityState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entity {
        constructor() {
            this.attribute = new Attribute_1.Attribute();
            this.position = FVec2_1.FVec2.zero;
            this.direction = FVec2_1.FVec2.zero;
            this._moveDirection = FVec2_1.FVec2.zero;
            this._fsm = new FSM_1.FSM();
            this._fsm.AddState(new EntityState_1.EntityState(EntityState_1.EntityState.Type.Idle, this));
            this._fsm.AddState(new EntityState_1.EntityState(EntityState_1.EntityState.Type.Move, this));
            this._fsm.AddState(new EntityState_1.EntityState(EntityState_1.EntityState.Type.Attack, this));
            this._fsm.AddState(new EntityState_1.EntityState(EntityState_1.EntityState.Type.Die, this));
        }
        get type() { return EntityType_1.EntityType.Undefined; }
        get id() { return this._id; }
        get battle() { return this._battle; }
        get actorID() { return this._actorID; }
        get team() { return this._team; }
        get name() { return this._name; }
        Init(battle, id, actorID, team, name) {
            this._battle = battle;
            this._id = id;
            this._actorID = actorID;
            this._team = team;
            this._name = name;
            this.LoadDef();
            this._fsm.ChangeState(EntityState_1.EntityState.Type.Idle);
        }
        Dispose() {
        }
        LoadDef() {
            this._def = Defs_1.Defs.GetEntity(this.actorID);
            this.attribute.Set(Attribute_1.Attribute.Attr.MHP, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "mhp")));
            this.attribute.Set(Attribute_1.Attribute.Attr.HP, this.attribute.Get(Attribute_1.Attribute.Attr.MHP));
            this.attribute.Set(Attribute_1.Attribute.Attr.MMP, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "mmp")));
            this.attribute.Set(Attribute_1.Attribute.Attr.MP, this.attribute.Get(Attribute_1.Attribute.Attr.MMP));
            this.attribute.Set(Attribute_1.Attribute.Attr.MOVE_SPEED, new decimal_1.default(Hashtable_1.Hashtable.GetNumber(this._def, "move_speed")));
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
            writer.int32(this._fsm.currentState.time);
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
            this._fsm.currentState.time = reader.int32();
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
                this._fsm.ChangeState(EntityState_1.EntityState.Type.Idle);
            else
                this._fsm.ChangeState(EntityState_1.EntityState.Type.Move);
        }
        MoveStep(direction, dt) {
            if (direction.SqrMagnitude().lessThan(MathUtils_1.MathUtils.D_SMALL))
                return;
            const speed = this.attribute.Get(Attribute_1.Attribute.Attr.MOVE_SPEED);
            const moveDelta = FVec2_1.FVec2.MulN(FVec2_1.FVec2.MulN(direction, speed), MathUtils_1.MathUtils.D_SMALL1.mul(dt));
            this.position = FVec2_1.FVec2.Add(this.position, moveDelta);
            this.direction = direction;
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map