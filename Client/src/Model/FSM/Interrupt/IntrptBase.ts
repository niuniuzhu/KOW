import Decimal from "../../../Libs/decimal";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EntityState } from "../EntityState";
import { EntityStateAction } from "../EntityStateAction";
import { StateType } from "../StateEnums";

export abstract class IntrptBase {
	public readonly id: number;
	protected _action: EntityStateAction;

	constructor(action: EntityStateAction, def: Hashtable) {
		this._action = action;
		this.id = Hashtable.GetNumber(def, "id");
	}

	public Update(dt: Decimal): void {
	}

	/**
	 * 转换状态
	 * @param type 转换类型
	 * @param param 携带参数
	 * @param igroneIntrptList 是否忽略中断列表
	 * @param force 是否强制转换
	 */
	protected ChangeState(type: StateType, param: any = null, igroneIntrptList: boolean = false, force: boolean = false): void {
		const state = (<EntityState>this._action.state);
		state.owner.fsm.ChangeState(type, param, igroneIntrptList, force);
	}
}