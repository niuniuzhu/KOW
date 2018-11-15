import * as $protobuf from "../../Libs/protobufjs";
import { VBattle } from "./VBattle";
import { FSM } from "../../RC/FSM/FSM";
import { VEntityState } from "../FSM/VEntityState";

export class VEntity {
	public get id(): Long { return this._id; }
	public get actorID(): number { return this._actorID; }
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }

	private _battle: VBattle;
	private _id: Long;
	private _actorID: number;
	private _team: number;
	private _name: string;

	private _fsm: FSM = new FSM();

	constructor() {
		this._fsm.AddState(new VEntityState(VEntityState.Type.Idle, this));
		this._fsm.AddState(new VEntityState(VEntityState.Type.Move, this));
		this._fsm.AddState(new VEntityState(VEntityState.Type.Attack, this));
		this._fsm.AddState(new VEntityState(VEntityState.Type.Die, this));
	}

	public Init(id: Long, battle: VBattle): void {
		this._id = id;
		this._battle = battle;
		this._fsm.ChangeState(VEntityState.Type.Idle);
	}

	public Dispose(): void {

	}

	public InitSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}
}