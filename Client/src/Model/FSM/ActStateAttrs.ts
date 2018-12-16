import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";
import { StateAttr } from "./StateEnums";

/**
 * 设置状态属性
 */
export class ActStateAttrs extends EntityStateAction {
	/**
	 * 状态属性
	 */
	private _stateAttr: number = 0;
	/**
	 * 是否可移动
	 */
	public get canMove(): boolean { return (this._stateAttr & StateAttr.DisableMove) == 0; }
	/**
	 * 是否可转身
	 */
	public get canTurn(): boolean { return (this._stateAttr & StateAttr.DisableTurn) == 0; }
	/**
	 * 是否霸体
	 */
	public get isSuperArmor(): boolean { return (this._stateAttr & StateAttr.SuperArmor) > 0 }
	/**
	 * 是否无敌
	 */
	public get isInvulnerability(): boolean { return (this._stateAttr & StateAttr.Invulnerability) > 0 }
	/**
	 * 是否可使用技能
	 */
	public get canUseSkill(): boolean { return (this._stateAttr & StateAttr.DisableUseSkill) == 0; }

	constructor(state: EntityState, id: number, def: Hashtable) {
		super(state, id, def);
		const arr = Hashtable.GetNumberArray(def, "state_attrs");
		let stateType: number = 0;
		let stateTypeDef: number = 0;
		for (stateTypeDef of arr) {
			stateType |= 1 << stateTypeDef;
		}
		this._stateAttr = stateType;

		//todo StateAttr.ClearLastBullets
	}
}