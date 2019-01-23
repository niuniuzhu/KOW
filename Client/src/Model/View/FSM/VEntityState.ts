import { FSMState } from "../../../RC/Framework/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { V_ID_TO_STATE_ACTION } from "../../StateEnums";
import { VChampion } from "../VChampion";
import { VEntity } from "../VEntity";

export class VEntityState extends FSMState {
	/**
	 * 所属实体
	 */
	public get owner(): VEntity { return this._owner; }
	/**
	 * 获取状态运行时间
	 */
	public get time(): number { return this._time; }
	/**
	 * 设置状态运行时间
	 */
	public set time(value: number) {
		if (this._time == value)
			return;
		this._time = value;
		this.OnStateTimeChanged();
	}

	/**
	 * 所属实体
	 */
	private _owner: VChampion;
	/**
	 * 状态的运行时间
	 */
	private _time: number;

	constructor(type: number, owner: VChampion) {
		super(type);
		this._owner = owner;
	}

	public Init(def: Hashtable): void {
		//初始化状态行为
		const actionsDef = Hashtable.GetMapArray(def, "actions");
		if (actionsDef != null) {
			for (const actionDef of actionsDef) {
				const type = Hashtable.GetNumber(actionDef, "id");
				const ctr = V_ID_TO_STATE_ACTION.get(type);
				const action = new ctr(this._owner, type);
				action.Init(actionDef);
				this.AddAction(action);
			}
		}
	}

	protected OnEnter(param: any): void {
		this._time = 0;
	}

	protected OnUpdate(dt: number): void {
		this._time += dt;
	}

	protected OnStateTimeChanged(): void {
		//can be overrided
	}
}