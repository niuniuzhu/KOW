import { ISnapshotable } from "../ISnapshotable";
import { Battle } from "./Battle";
import { Vec2 } from "../../RC/Math/Vec2";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { EntityState } from "../FSM/EntityState";
import { Attribute } from "../Attribute";

export class Entity implements ISnapshotable {
	public get id(): Long { return this._id; }
	public get battle(): Battle { return this._battle; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }

	public readonly attribute: Attribute = new Attribute();
	public position: Vec2 = Vec2.zero;
	public direction: Vec2 = Vec2.zero;

	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;
	private _battle: Battle;

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
}