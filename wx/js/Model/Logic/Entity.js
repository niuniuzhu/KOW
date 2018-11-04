import { Vec2 } from "../../RC/Math/Vec2";
import { FSM } from "../../RC/FSM/FSM";
import { EntityState } from "../FSM/EntityState";
import { Attribute } from "../Attribute";
export class Entity {
    constructor() {
        this.attribute = new Attribute();
        this.position = Vec2.zero;
        this.direction = Vec2.zero;
        this._fsm = new FSM();
        this._fsm.AddState(new EntityState(EntityState.Type.Idle, this));
        this._fsm.AddState(new EntityState(EntityState.Type.Move, this));
        this._fsm.AddState(new EntityState(EntityState.Type.Attack, this));
        this._fsm.AddState(new EntityState(EntityState.Type.Die, this));
    }
    get id() { return this._id; }
    get battle() { return this._battle; }
    get actorID() { return this._actorID; }
    get team() { return this._team; }
    get name() { return this._name; }
    Init(id, battle) {
        this._id = id;
        this._battle = battle;
        this._fsm.ChangeState(EntityState.Type.Idle);
    }
    Dispose() {
    }
    DecodeSnapshot(reader) {
        this._actorID = reader.int32();
        this._team = reader.int32();
        this._name = reader.string();
        this.position = new Vec2(reader.float(), reader.float());
        this.direction = new Vec2(reader.float(), reader.float());
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
