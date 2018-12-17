import Decimal from "../../Libs/decimal";
import Set from "../../RC/Collections/Set";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Entity } from "../Logic/Entity";
import { EntityStateBase } from "./EntityStateBase";
import { StateType } from "./StateEnums";

export class EntityState extends EntityStateBase {
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

	private _statesAvailable: Set<StateType>;
	private _owner: Entity;
	private _time: Decimal = new Decimal(0);

	constructor(type: number, owner: Entity) {
		super(type);
		this._owner = owner;
	}

	public Init(): void {
		const def = Hashtable.GetMap(Hashtable.GetMap(this._owner.def, "states"), this.type.toString());
		super.Init(def);

		//能被中断的状态列表
		const sa = Hashtable.GetNumberArray(def, "states_available");
		if (sa != null) {
			this._statesAvailable = new Set<StateType>();
			for (const type of sa) {
				this._statesAvailable.add(type);
			}
		}
	}

	protected OnEnter(param: any): void {
		this._time = new Decimal(0);
	}

	protected OnUpdate(dt: Decimal): void {
		this._time = this._time.add(dt);
	}

	protected OnStateTimeChanged(): void {
		//can be overrided
	}

	/**
	 * 查询该状态下是否能转换到指定状态
	 * @param type 状态类型
	 */
	public IsStateAvailable(type: StateType): boolean {
		return this._statesAvailable == null || this._statesAvailable.contains(type);
	}
}