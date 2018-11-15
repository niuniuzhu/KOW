import { ISnapshotable } from "../ISnapshotable";
import { Battle } from "./Battle";
import { Vec2 } from "../../RC/Math/Vec2";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { EntityState } from "../FSM/EntityState";
import { Attribute } from "../Attribute";
import { EntityType } from "../EntityType";

export class Entity implements ISnapshotable {
	public get type(): EntityType { return EntityType.Undefined; }
	public get id(): Long { return this._id; }
	public get battle(): Battle { return this._battle; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }

	public readonly attribute: Attribute = new Attribute();
	public position: Vec2 = Vec2.zero;
	public direction: Vec2 = Vec2.zero;

	private _battle: Battle;
	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;

	private _fsm: FSM = new FSM();

	constructor() {
		this._fsm.AddState(new EntityState(EntityState.Type.Idle, this));
		this._fsm.AddState(new EntityState(EntityState.Type.Move, this));
		this._fsm.AddState(new EntityState(EntityState.Type.Attack, this));
		this._fsm.AddState(new EntityState(EntityState.Type.Die, this));
	}

	public Init(id: Long, battle: Battle): void {
		this._id = id;
		this._battle = battle;
		this._fsm.ChangeState(EntityState.Type.Idle);
	}

	public Dispose(): void {

	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this.type);
		writer.uint64(this._id);
		writer.int32(this._actorID);
		writer.string(this._name);
		writer.float(this.position.x).float(this.position.y)
		writer.float(this.direction.x).float(this.direction.y)
		writer.int32(this._fsm.currentState.type);
		writer.int32((<EntityState>this._fsm.currentState).time);
		const count = this.attribute.count;
		writer.int32(count);
		this.attribute.Foreach((v, k, map) => {
			writer.int32(k).float(v);
		})
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._actorID = reader.int32();
		this._team = reader.int32();
		this._name = reader.string();
		this.position = new Vec2(reader.float(), reader.float());
		this.direction = new Vec2(reader.float(), reader.float());
		this._fsm.ChangeState(reader.int32(), null, true);
		(<EntityState>this._fsm.currentState).time = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.float());
		}
	}

	public Update(dt: number): void {
		this._fsm.Update(dt);
	}
}