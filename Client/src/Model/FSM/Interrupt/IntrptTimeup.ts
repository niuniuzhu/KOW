import Decimal from "../../../Libs/decimal";
import { MathUtils } from "../../../RC/Math/MathUtils";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EntityState } from "../EntityState";
import { EntityStateAction } from "../EntityStateAction";
import { StateType } from "../StateEnums";
import { IntrptBase } from "./IntrptBase";

/**
 * 指定时间到达时中断
 */
export class IntrptTimeup extends IntrptBase {
	/**
	 * 默认连接状态
	 */
	private _connectState: StateType = StateType.None;
	/**
	 * 状态持续时长
	 */
	private _duration: Decimal = new Decimal(-1);

	constructor(action: EntityStateAction, def: Hashtable) {
		super(action, def);
		this._connectState = Hashtable.GetNumber(def, "connect_state");
		this._duration = new Decimal(Hashtable.GetNumber(def, "duration", -1));
	}

	public Update(dt: Decimal): void {
		const state = (<EntityState>this._action.state);
		if (this._connectState != StateType.None &&
			this._duration.greaterThanOrEqualTo(MathUtils.D_ZERO) &&
			state.time.greaterThanOrEqualTo(this._duration)) {
			this.ChangeState(this._connectState, null, true, true);
		}
	}
}