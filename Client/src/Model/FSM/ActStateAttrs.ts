import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";

/**
 * 设置位移速度行为
 */
export class ActStateAttrs extends EntityStateAction {
	/**
	 * 状态属性
	 */
	private _stateAttr: number = 0;

	constructor(state: EntityState, def: { [k: string]: any; }) {
		super(state, def);
		const arr = Hashtable.GetNumberArray(def, "state_attrs");
		let stateType: number = 0;
		let stateTypeDef: number = 0;
		for (stateTypeDef of arr) {
			stateType |= 1 << stateTypeDef;
		}
		this._stateAttr = stateType;
	}
}