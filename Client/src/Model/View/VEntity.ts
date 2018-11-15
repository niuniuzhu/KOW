import { VBattle } from "./VBattle";
import { FSM } from "../../RC/FSM/FSM";
import { VEntityState } from "../FSM/VEntityState";

export class VEntity {
	public get id(): Long { return this._id; }

	private _battle: VBattle;
	private _id: Long;

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
}