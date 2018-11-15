import { FSMState } from "../../RC/FSM/FSMState";
import { VEntity } from "../View/VEntity";

enum Type {
	Idle,
	Move,
	Attack,
	Die
}

export class VEntityState extends FSMState {
	public static readonly Type = Type;
	/**
	 * 所属实体
	 */
	public get owner(): VEntity { return this._owner; }

	/**
	 * 状态的运行时间
	 */
	public time: number;

	private _owner: VEntity;

	constructor(type: number, owner: VEntity) {
		super(type);
		this._owner = owner;
	}
}