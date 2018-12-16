import Decimal from "../../Libs/decimal";
import { MathUtils } from "../../RC/Math/MathUtils";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";
import { StateType } from "./StateEnums";
import { Hashtable } from "../../RC/Utils/Hashtable";

/**
 * 自动切换状态
 */
export class ActAutoState extends EntityStateAction {
	/**
	 * 默认连接状态
	 */
	private _defaultConnectState: StateType = StateType.None;
	/**
	 * 状态持续时长
	 */
	private _duration: Decimal = new Decimal(-1);

	constructor(state: EntityState, id: number, def: Hashtable) {
		super(state, id, def);
		this._defaultConnectState = Hashtable.GetNumber(def, "default_state");
		this._duration = new Decimal(Hashtable.GetNumber(def, "duration", -1));
	}

	protected OnUpdate(dt: Decimal): void {
		if (this._duration.greaterThanOrEqualTo(MathUtils.D_ZERO) &&
			(<EntityState>this.state).time.greaterThanOrEqualTo(this._duration)) {
			if (this._defaultConnectState != StateType.None) {
				(<EntityState>this.state).owner.fsm.ChangeState(this._defaultConnectState, null, true);
			}
		}
	}
}