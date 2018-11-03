define(["require", "exports", "../../RC/Math/Vec2", "../../RC/FSM/FSM", "../FSM/EntityState", "../Attribute"], function (require, exports, Vec2_1, FSM_1, EntityState_1, Attribute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entity {
        constructor() {
            this.attribute = new Attribute_1.Attribute();
            this.position = Vec2_1.Vec2.zero;
            this.direction = Vec2_1.Vec2.zero;
            this._fsm = new FSM_1.FSM();
            this._fsm.AddState(new EntityState_1.EntityState(EntityState_1.EntityState.Type.Idle, this));
            this._fsm.AddState(new EntityState_1.EntityState(EntityState_1.EntityState.Type.Move, this));
            this._fsm.AddState(new EntityState_1.EntityState(EntityState_1.EntityState.Type.Attack, this));
            this._fsm.AddState(new EntityState_1.EntityState(EntityState_1.EntityState.Type.Die, this));
        }
        get id() { return this._id; }
        get battle() { return this._battle; }
        get actorID() { return this._actorID; }
        get team() { return this._team; }
        get name() { return this._name; }
        Init(id, battle) {
            this._id = id;
            this._battle = battle;
            this._fsm.ChangeState(EntityState_1.EntityState.Type.Idle);
        }
        Dispose() {
        }
        DecodeSnapshot(reader) {
            this._actorID = reader.int32();
            this._team = reader.int32();
            this._name = reader.string();
            this.position = new Vec2_1.Vec2(reader.float(), reader.float());
            this.direction = new Vec2_1.Vec2(reader.float(), reader.float());
            this._fsm.ChangeState(reader.int32(), null, true);
            this._fsm.currentState.time = reader.int32();
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), reader.float());
            }
        }
        Update(dt) {
            this._fsm.Update(dt);
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=Entity.js.map