import Decimal from "../../Libs/decimal";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Entity } from "../Logic/Entity";
import { EntityStateAction } from "./EntityStateAction";
import { ID_TO_STATE_ACTION } from "./StateEnums";

export class EntityState extends FSMState {
	/**
	 * 所属实体
	 */
	public get owner(): Entity { return this._owner; }
	/**
	 * 获取状态运行时间
	 */
	public get time(): Decimal { return this._time; }
	/**
	 * 设置状态运行时间
	 */
	public set time(value: Decimal) {
		if (this._time.equals(value))
			return;
		this._time = value;
		this.OnStateTimeChanged();
	}

	private readonly _idToActions: Map<number, EntityStateAction> = new Map<number, EntityStateAction>();
	/**
	 * 所属实体
	 */
	private _owner: Entity;
	/**
	 * 状态的运行时间
	 */
	private _time: Decimal = new Decimal(0);

	constructor(type: number, owner: Entity) {
		super(type);
		this._owner = owner;
	}

	public AddAction(action: EntityStateAction): void {
		super.AddAction(action);
		this._idToActions.set(action.id, action);
	}

	public RemoveAction(action: EntityStateAction): void {
		super.RemoveAction(action);
		this._idToActions.delete(action.id);
	}

	public GetAction(id: number): EntityStateAction {
		return this._idToActions.get(id);
	}

	public Init(): void {
		const def = Hashtable.GetMap(Hashtable.GetMap(this._owner.def, "states"), this.type.toString());
		//初始化状态行为
		const actionsDef = Hashtable.GetArray(def, "actions");
		this.CreateActions(actionsDef);
	}

	protected OnExit(): void {
		this._time = new Decimal(0);
	}

	protected OnUpdate(dt: Decimal): void {
		this._time = this._time.add(dt);
	}

	protected OnStateTimeChanged(): void {
		//can be overrided
	}

	private CreateActions(actionsDef: Hashtable[]): void {
		let actionDef: Hashtable;
		for (actionDef of actionsDef) {
			const id = Hashtable.GetNumber(actionDef, "id");
			const ctr = ID_TO_STATE_ACTION.get(id);
			const action = new ctr(this, id, actionDef);
			this.AddAction(action);
		}
	}
}