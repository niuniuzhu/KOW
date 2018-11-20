import { FSMState } from "../../../RC/FSM/FSMState";
import { Entity } from "../Entity";

enum Type {
	Idle,
	Move,
	Attack,
	Die
}

export class EntityState extends FSMState {
	public static readonly Type = Type;

	/**
	 * 所属实体
	 */
	public get owner(): Entity { return this._owner; }

	/**
	 * 状态的运行时间
	 */
	public time:number;

	private _owner: Entity;

	constructor(type: number, owner: Entity) {
		super(type);
		this._owner = owner;
	}
}