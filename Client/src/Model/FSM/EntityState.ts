import Decimal from "../../Libs/decimal";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { EAttr } from "../Attribute";
import { Entity } from "../Logic/Entity";
import { ID_TO_STATE_ACTION, StateOp } from "./StateEnums";

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

	private CreateActions(actionsDef: any[]): void {
		let actionDef: { [k: string]: any; };
		for (actionDef of actionsDef) {
			const type = Hashtable.GetNumber(actionDef, "type");
			const ctr = ID_TO_STATE_ACTION.get(type);
			const action = new ctr(this, actionDef);
			this.AddAction(action);
		}
	}
}