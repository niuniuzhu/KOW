import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../../ISnapshotable";
import { EntityState } from "../EntityState";
import { EntityStateAction } from "../EntityStateAction";
import { StateType } from "../StateEnums";
import { IntrptBase } from "./IntrptBase";

/**
 * 指定时间到达时中断
 */
export class IntrptTimeup extends IntrptBase implements ISnapshotable {
	/**
	 * 状态持续时长
	 */
	private _duration: number;

	constructor(action: EntityStateAction, def: Hashtable) {
		super(action, def);
		this._duration = Hashtable.GetNumber(def, "duration", -1);
	}

	public Update(dt: number): void {
		const state = (<EntityState>this._action.state);
		if (this._connectState != StateType.None &&
			this._duration >= 0 &&
			state.time >= this._duration) {
			this.ChangeState(this._connectState, null, true, true);
		}
	}
}